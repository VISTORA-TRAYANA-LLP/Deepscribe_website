import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Canvas } from '../components/Canvas';
import { DoctorForm } from '../components/DoctorForm';
import { LoginForm } from '../components/LoginForm';
import { Leaderboard } from '../components/Leaderboard';
import { DoctorLookup } from '../components/DoctorLookup';
import { MouseTrail } from '../components/MouseTrail';
import { Particles } from '../components/Particles';
import { Doctor, HandwritingSample } from '../types';
import { Activity, Sparkles, Award, Search, LogOut, User, X } from 'lucide-react';
import { submitHandwritingSample, getLeaderboard } from '../api';
import logo from '../images/logo1.png'
import './index.css';

export default function DashboardPage() {
  const [showAuth, setShowAuth] = React.useState(true);
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [currentDoctor, setCurrentDoctor] = React.useState<Doctor | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [leaderboardError, setLeaderboardError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    fetchLeaderboard();
    
    // Check for stored doctor in localStorage
    const storedDoctor = localStorage.getItem('currentDoctor');
    if (storedDoctor) {
      try {
        const doctor = JSON.parse(storedDoctor);
        setCurrentDoctor(doctor);
        setShowAuth(false);
      } catch (err) {
        console.error('Error parsing stored doctor:', err);
        localStorage.removeItem('currentDoctor');
      }
    }
  }, []);

  const fetchLeaderboard = async () => {
    setLeaderboardError(null);
    setIsLeaderboardLoading(true);
    try {
      const { doctors: leaderboardDoctors } = await getLeaderboard();
      setDoctors(leaderboardDoctors);
    } catch (err) {
      setLeaderboardError(err instanceof Error ? err.message : 'Failed to load leaderboard');
      console.error('Leaderboard error:', err);
    } finally {
      setIsLeaderboardLoading(false);
    }
  };

  const handleDoctorRegistration = (doctor: Doctor) => {
    setDoctors(prevDoctors => [...prevDoctors, doctor]);
    setCurrentDoctor(doctor);
    setShowAuth(false);
    
    // Store doctor in localStorage
    localStorage.setItem('currentDoctor', JSON.stringify(doctor));
  };

  const handleDoctorLogin = (doctor: Doctor) => {
    setCurrentDoctor(doctor);
    setShowAuth(false);
    
    // Store doctor in localStorage
    localStorage.setItem('currentDoctor', JSON.stringify(doctor));
  };

  const handleLogout = () => {
    setCurrentDoctor(null);
    setShowAuth(true);
    
    // Remove doctor from localStorage
    localStorage.removeItem('currentDoctor');
  };

  const handleSampleSubmission = async (strokes: number[][][], transcription: string) => {
    if (!currentDoctor) return;

    setError(null);
    setIsLoading(true);

    try {
      console.log('Submitting sample with strokes:', strokes.length, 'strokes');
      
      const { updatedDoctor } = await submitHandwritingSample(
        currentDoctor.id,
        currentDoctor.email,
        strokes,
        transcription
      );

      setCurrentDoctor(updatedDoctor);
      
      // Update stored doctor in localStorage
      localStorage.setItem('currentDoctor', JSON.stringify(updatedDoctor));
      
      await fetchLeaderboard();
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit sample');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen medical-background text-black">
      <MouseTrail />
      
      <div className="gradient-overlay">
        <header className="header-gradient sticky top-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4 mobile-center">
                <Link to="/" className="relative">
                  <img 
                    src={logo}
                    alt="DeepScribe"
                    className="h-8 w-auto"
                  />
                </Link>
                
              </div>
              {currentDoctor ? (
                <div className="flex items-center space-x-4">
                  <div className="text-center glass-card-highlight px-4 py-2 rounded-lg mobile-full hover-glow">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-600" />
                      <p className="text-sm text-gray-700">Dr. {currentDoctor.name}</p>
                    </div>
                    <div className="flex items-center justify-center space-x-1 text-xs text-gray-600">
                      <Sparkles className="w-3 h-3" />
                      <span>{currentDoctor.points} points</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-sm"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 main-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            <div className="space-y-8 fade-in-up">
              <div className="glass-card rounded-xl p-6 sm:p-8 shadow-glow hover-glow">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Activity className="w-6 sm:w-7 h-6 sm:h-7 mr-3 text-gray-600" />
                  <span className="handwritten text-3xl sm:text-4xl">Contribute </span> 
                  <span className="ml-1">Your Handwriting</span>
                </h2>
                {currentDoctor ? (
                  <>
                    <Canvas onSave={handleSampleSubmission} />
                    {error && (
                      <div className="mt-4 text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg p-3">
                        {error}
                      </div>
                    )}
                    {isLoading && (
                      <div className="mt-4 text-gray-600 text-sm">
                        <span className="loading-dots">Submitting sample</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 sm:py-16 bg-gray-50 rounded-lg border border-gray-100">
                    <Activity className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-lg sm:text-xl text-gray-600 handwritten mb-4">Please login or register to contribute</p>
                    <button
                      onClick={() => setShowAuth(true)}
                      className="px-6 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-sm mx-auto"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
              
              <DoctorLookup />
            </div>
            
            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              {isLeaderboardLoading ? (
                <div className="glass-effect rounded-lg p-6 text-center">
                  <p className="text-gray-600">
                    <span className="loading-dots">Loading leaderboard</span>
                  </p>
                </div>
              ) : leaderboardError ? (
                <div className="glass-effect rounded-lg p-6">
                  <div className="text-center space-y-4">
                    <p className="text-red-600">{leaderboardError}</p>
                    <button
                      onClick={fetchLeaderboard}
                      className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg font-medium transition-all duration-300"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              ) : (
                <Leaderboard doctors={doctors} />
              )}
            </div>
          </div>
        </main>

        <footer className="footer-gradient mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col items-center space-y-4">
              <Link to="/">
                <img 
                  src={logo}
                  alt="DeepScribe"
                  className="h-6 sm:h-8 w-auto"
                />
              </Link>
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                Made with <span className="text-red-500">♥</span> by{' '}
                <a 
                  href="https://medtrack.co.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-gray-900 transition-colors"
                >
                  MedTrack
                </a>
              </p>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs text-gray-500">
                <span>© 2025 DeepScribe</span>
                <span className="hidden sm:inline">•</span>
                <span>A product of VISTORA TRAYANA LLP</span>
              </div>
            </div>
          </div>
        </footer>

        {showAuth && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/20 backdrop-blur-sm">
            <div className="min-h-screen px-4 flex items-center justify-center">
              <div className="w-full max-w-lg relative">
                <div className="glass-card rounded-xl p-6 sm:p-8 shadow-glow">
                  <button
                    onClick={() => navigate('/')}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    title="Close"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4">
                      <span className="handwritten text-3xl sm:text-4xl">{isRegistering ? 'Join ' : 'Welcome to '}</span>
                      <span className="ml-1">DeepScribe</span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mt-2">
                      {isRegistering
                        ? 'Contribute to advancing medical handwriting analysis'
                        : 'Continue contributing to medical handwriting analysis'}
                    </p>
                  </div>
                  {isRegistering ? (
                    <DoctorForm onSubmit={handleDoctorRegistration} />
                  ) : (
                    <LoginForm
                      onLogin={handleDoctorLogin}
                      onSwitchToRegister={() => setIsRegistering(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}