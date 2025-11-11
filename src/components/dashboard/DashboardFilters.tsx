'use client';

import { useState, useEffect } from 'react';
import { fetchProvinces } from '@/lib/api';
import { Province } from '@/types';

interface DashboardFiltersProps {
  provinceFilter: string;
  pagesToFetch: number;
  onProvinceChange: (value: string) => void;
  onPageCountChange: (value: number) => void;
}

export default function DashboardFilters({
  provinceFilter,
  pagesToFetch,
  onProvinceChange,
  onPageCountChange,
}: DashboardFiltersProps) {
  const [provinces, setProvinces] = useState<Province[]>([]);

  useEffect(() => {
    fetchProvinces().then(setProvinces);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Filter Data untuk Analisis</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
          <select
            value={provinceFilter}
            onChange={(e) => onProvinceChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
          >
            <option value="">Semua Provinsi</option>
            {provinces.map((prov) => (
              <option key={prov.code} value={prov.code}>
                {prov.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Data</label>
          <select
            value={pagesToFetch}
            onChange={(e) => onPageCountChange(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
          >
            <option value={5}>5 Halaman (100 data)</option>
            <option value={10}>10 Halaman (200 data)</option>
            <option value={20}>20 Halaman (400 data)</option>
            <option value={50}>50 Halaman (1000 data)</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              onProvinceChange(provinceFilter);
              onPageCountChange(pagesToFetch);
            }}
            className="w-full px-6 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition font-medium"
          >
            Analisis Ulang
          </button>
        </div>
      </div>
    </div>
  );
}
