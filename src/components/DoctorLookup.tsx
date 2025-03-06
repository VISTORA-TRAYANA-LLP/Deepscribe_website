import React, { useState } from 'react';
import { Doctor } from '../types';
import { lookupDoctor } from '../api';
import { Search, User, Building2, MapPin } from 'lucide-react';

export function DoctorLookup() {
  const [email, setEmail] = useState('');
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setDoctor(null);
    setIsLoading(true);

    try {
      const foundDoctor = await lookupDoctor(email);
      setDoctor(foundDoctor);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Doctor lookup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 sm:p-8 shadow-glow hover-glow">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Search className="w-6 h-6 mr-3 text-gray-600" />
        <span className="handwritten text-3xl">Doctor &nbsp;</span> Lookup
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="lookup-email" className="block text-sm font-medium text-gray-700 handwritten">
            Doctor's Email
          </label>
          <input
            type="email"
            id="lookup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter doctor's email address"
            className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400"
            required
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
          {isLoading ? <span className="loading-dots">Searching</span> : 'Search'}
        </button>
      </form>

      {doctor && (
        <div className="mt-8 space-y-4 fade-in-up">
          <div className="bg-white rounded-lg p-6 border border-gray-200 hover-scale">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span>{doctor.hospital} • {doctor.department}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{doctor.state}, {doctor.country}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{doctor.points}</div>
                <div className="text-sm text-gray-600">points</div>
                <div className="mt-2">
                  <div className="text-lg font-semibold text-gray-900">{doctor.contributions}</div>
                  <div className="text-sm text-gray-600">contributions</div>
                </div>
              </div>
            </div>
            {doctor.rank && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2">
                  <div className="text-sm text-gray-600">Current Rank</div>
                  <div className="text-xl font-bold text-gray-900">#{doctor.rank}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}