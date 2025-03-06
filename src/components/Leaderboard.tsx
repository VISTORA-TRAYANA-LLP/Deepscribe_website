import React from 'react';
import { Doctor } from '../types';
import { Trophy, Award, Medal } from 'lucide-react';

interface LeaderboardProps {
  doctors: Doctor[];
}

export function Leaderboard({ doctors }: LeaderboardProps) {
  const sortedDoctors = [...doctors].sort((a, b) => b.points - a.points).slice(0, 7);

  return (
    <div className="glass-card rounded-xl p-6 sm:p-8 shadow-glow hover-glow">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Trophy className="w-6 h-6 mr-3 text-gray-600" />
        <span className="handwritten text-3xl">Top </span> 
        <span className="ml-1">Contributors</span>
      </h2>
      <div className="space-y-4">
        {sortedDoctors.map((doctor, index) => (
          <div
            key={doctor.id}
            className="flex items-center p-4 bg-white rounded-lg transition-transform hover:scale-102 border border-gray-200 hover-scale"
          >
            <div className="flex-shrink-0 mr-4">
              {index === 0 && <Trophy className="w-6 h-6 text-yellow-500" />}
              {index === 1 && <Award className="w-6 h-6 text-gray-400" />}
              {index === 2 && <Medal className="w-6 h-6 text-amber-700" />}
              {index > 2 && (
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-900">{index + 1}</span>
                </div>
              )}
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
              <p className="text-sm text-gray-600">
                {doctor.hospital} • {doctor.state}, {doctor.country}
              </p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-lg font-bold text-gray-900">{doctor.points} pts</p>
              <p className="text-sm text-gray-600">{doctor.contributions} samples</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}