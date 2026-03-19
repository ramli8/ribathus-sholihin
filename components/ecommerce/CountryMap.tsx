'use client';

import React from 'react';

interface CountryMapProps {
  mapColor?: string;
}

const CountryMap: React.FC<CountryMapProps> = ({ mapColor }) => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Peta tidak tersedia
      </p>
    </div>
  );
};

export default CountryMap;
