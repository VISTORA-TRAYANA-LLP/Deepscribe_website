import { Doctor, HandwritingSample } from './types';

// API configuration
const API_BASE_URL = 'https://a9l540o5s0.execute-api.us-east-1.amazonaws.com/Prod';

// API endpoints
const ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/api/register`,
  LOGIN: `${API_BASE_URL}/api/doctor/login`,
  LOOKUP: `${API_BASE_URL}/api/doctor/lookup`,
  SUBMIT: `${API_BASE_URL}/api/submit`,
  LEADERBOARD: `${API_BASE_URL}/api/leaderboard`
};

// Helper function for API requests with improved error handling
async function apiRequest<T>(url: string, method: string, data?: any): Promise<T> {
  try {
    console.log('Making API request to:', url);
    
    // Don't log the entire payload, which might be large, but log its structure
    if (data) {
      const dataStructure = { ...data };
      if (dataStructure.strokes) {
        dataStructure.strokes = `[Array of ${dataStructure.strokes.length} strokes]`;
      }
      console.log('Request payload structure:', dataStructure);
    }
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : undefined
    });

    console.log('Response status:', response.status);
    
    let responseData;
    const responseText = await response.text();
    
    try {
      responseData = JSON.parse(responseText);
      console.log('Response data:', 
        responseData.error ? 
        { error: responseData.error } : 
        { success: true });
    } catch (e) {
      console.error('Failed to parse response as JSON:', responseText.substring(0, 200) + '...');
      throw new Error(`Server returned non-JSON response: ${responseText.substring(0, 200)}...`);
    }

    if (!response.ok) {
      throw new Error(responseData.error || `Server error: ${response.status}`);
    }

    return responseData;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export async function registerDoctor(doctorData: Omit<Doctor, 'id' | 'contributions' | 'points' | 'registrationDate' | 'lastLoginDate'>): Promise<Doctor> {
  const response = await apiRequest<{ message: string; doctor: Doctor }>(
    ENDPOINTS.REGISTER,
    'POST',
    doctorData
  );
  return response.doctor;
}

export async function loginDoctor(email: string): Promise<Doctor> {
  const response = await apiRequest<{ message: string; doctor: Doctor }>(
    ENDPOINTS.LOGIN,
    'POST',
    { email }
  );
  return response.doctor;
}

export async function lookupDoctor(email: string): Promise<Doctor> {
  const response = await apiRequest<Doctor>(
    ENDPOINTS.LOOKUP,
    'POST',
    { email }
  );
  return response;
}

export async function submitHandwritingSample(
  doctorId: string,
  email: string,
  strokes: number[][][],
  transcription: string
): Promise<{ submission: HandwritingSample; updatedDoctor: Doctor }> {
  try {
    // Sanitize the strokes data to ensure it's properly formatted
    const sanitizedStrokes = strokes
      .map(stroke => {
        // Ensure each stroke is an array of points
        if (!Array.isArray(stroke)) return null;
        
        // Filter and process points
        const validPoints = stroke
          .filter(point => 
            Array.isArray(point) && 
            typeof point[0] === 'number' && 
            typeof point[1] === 'number'
          )
          .map(point => {
            // Ensure each point has exactly 3 values: x, y, timestamp
            // And that all values are numbers
            const x = Math.round(Number(point[0]));
            const y = Math.round(Number(point[1]));
            const timestamp = typeof point[2] === 'number' ? 
              Math.round(point[2]) : 
              Date.now();
            
            // Ensure no NaN or Infinity values
            if (isNaN(x) || isNaN(y) || isNaN(timestamp) || 
                !isFinite(x) || !isFinite(y) || !isFinite(timestamp)) {
              return null;
            }
            
            return [x, y, timestamp];
          })
          .filter(point => point !== null);
          
        return validPoints.length > 0 ? validPoints : null;
      })
      .filter(stroke => stroke !== null);
    
    // Ensure we still have valid strokes after sanitization
    if (sanitizedStrokes.length === 0) {
      throw new Error('No valid stroke data after sanitization');
    }
    
    // Debug logging
    console.log(`Sanitized ${strokes.length} strokes to ${sanitizedStrokes.length} valid strokes`);
    
    // Additional data size check - DynamoDB has item size limits
    const dataSize = JSON.stringify(sanitizedStrokes).length;
    if (dataSize > 350000) { // DynamoDB has a 400KB item size limit, stay well under
      console.log(`Data too large (${dataSize} bytes), reducing...`);
      
      // Simplify further if needed
      const reducedStrokes = sanitizedStrokes.map(stroke => {
        // Keep only every Nth point based on data size
        const samplingRate = Math.max(2, Math.ceil(dataSize / 300000));
        const sampledPoints = [];
        for (let i = 0; i < stroke.length; i += samplingRate) {
          sampledPoints.push(stroke[i]);
        }
        return sampledPoints;
      });
      
      console.log(`Reduced to ${JSON.stringify(reducedStrokes).length} bytes`);
      
      const payload = {
        doctorId,
        email,
        strokes: reducedStrokes,
        transcription: transcription.slice(0, 1000) // Limit transcription length just in case
      };
      
      const response = await apiRequest<{
        message: string;
        submission: HandwritingSample;
        updatedDoctor: Doctor;
      }>(
        ENDPOINTS.SUBMIT,
        'POST',
        payload
      );
      
      return {
        submission: response.submission,
        updatedDoctor: response.updatedDoctor
      };
    } else {
      // Normal submission
      const payload = {
        doctorId,
        email,
        strokes: sanitizedStrokes,
        transcription: transcription.slice(0, 1000) // Limit transcription length just in case
      };
      
      const response = await apiRequest<{
        message: string;
        submission: HandwritingSample;
        updatedDoctor: Doctor;
      }>(
        ENDPOINTS.SUBMIT,
        'POST',
        payload
      );
      
      return {
        submission: response.submission,
        updatedDoctor: response.updatedDoctor
      };
    }
  } catch (error) {
    console.error('Submission error details:', error);
    throw error;
  }
}

export async function getLeaderboard(filters?: {
  country?: string;
  state?: string;
  hospital?: string;
  department?: string;
  email?: string;
}): Promise<{ total: number; doctors: Doctor[] }> {
  let url = ENDPOINTS.LEADERBOARD;
  
  if (filters) {
    const queryParams = new URLSearchParams();
    
    if (filters.country) queryParams.append('country', filters.country);
    if (filters.state) queryParams.append('state', filters.state);
    if (filters.hospital) queryParams.append('hospital', filters.hospital);
    if (filters.department) queryParams.append('department', filters.department);
    if (filters.email) queryParams.append('email', filters.email);
    
    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }
  
  return await apiRequest<{ total: number; doctors: Doctor[] }>(url, 'GET');
}