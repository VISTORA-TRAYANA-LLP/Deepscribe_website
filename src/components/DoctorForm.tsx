import React, { useState } from 'react';
import { Doctor } from '../types';
import { registerDoctor } from '../api';

interface DoctorFormProps {
  onSubmit: (doctor: Doctor) => void;
}

export function DoctorForm({ onSubmit }: DoctorFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const doctorData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        hospital: formData.get('hospital') as string,
        department: formData.get('department') as string,
        state: formData.get('state') as string,
        country: formData.get('country') as string,
      };

      const registeredDoctor = await registerDoctor(doctorData);
      onSubmit(registeredDoctor);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 handwritten">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 handwritten">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400"
        />
      </div>
      <div>
        <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 handwritten">
          Hospital
        </label>
        <input
          type="text"
          name="hospital"
          id="hospital"
          required
          className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400"
        />
      </div>
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700 handwritten">
          Department
        </label>
        <input
          type="text"
          name="department"
          id="department"
          required
          className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400"
        />
      </div>
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700 handwritten">
          State
        </label>
        <input
          type="text"
          name="state"
          id="state"
          required
          className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400"
        />
      </div>
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 handwritten">
          Country
        </label>
        <input
          type="text"
          name="country"
          id="country"
          required
          className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg p-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? <span className="loading-dots">Registering</span> : 'Register'}
      </button>
    </form>
  );
}