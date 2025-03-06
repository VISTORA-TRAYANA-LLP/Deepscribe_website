import React, { useState } from 'react';
import { Doctor } from '../types';
import { loginDoctor } from '../api';

interface LoginFormProps {
  onLogin: (doctor: Doctor) => void;
  onSwitchToRegister: () => void;
}

export function LoginForm({ onLogin, onSwitchToRegister }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const doctor = await loginDoctor(email);
      onLogin(doctor);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 handwritten">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400"
          placeholder="Enter your registered email"
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
        {isLoading ? <span className="loading-dots">Logging in</span> : 'Login'}
      </button>

      <div className="text-center mt-4">
        <p className="text-gray-600 text-sm">
          New to DeepScribe?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-gray-900 hover:text-gray-700 font-medium transition-colors"
          >
            Register here
          </button>
        </p>
      </div>
    </form>
  );
}