'use client';

import { useState, useEffect } from 'react';
import { VacancyFilters, Province } from '@/types';
import { fetchProvinces } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';

interface FilterPanelProps {
  filters: VacancyFilters;
  onFilterChange: (filters: VacancyFilters) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  totalCount: number;
  totalInSystem: number;
}

export default function FilterPanel({
  filters,
  onFilterChange,
  searchTerm,
  onSearchChange,
  totalCount,
  totalInSystem,
}: FilterPanelProps) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [localFilters, setLocalFilters] = useState(filters);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(true);

  useEffect(() => {
    fetchProvinces().then((data) => {
      setProvinces(data);
      setIsLoadingProvinces(false);
    });
  }, []);

  const handleApply = () => {
    onFilterChange(localFilters);
  };

  const handleReset = () => {
    const resetFilters: VacancyFilters = {
      kode_provinsi: '',
      keyword: '',
      order_by: '',
      order_direction: 'DESC' as const,
      limit: 20,
      opportunityRatio: '',
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
    onSearchChange('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 space-y-6">
      {/* Search Box */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Cari posisi, perusahaan, atau lokasi... (contoh: programmer)"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10 h-12 text-base"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Filter className="inline h-4 w-4 mr-1" />
            Provinsi
          </label>
          <select
            value={localFilters.kode_provinsi}
            onChange={(e) => setLocalFilters({ ...localFilters, kode_provinsi: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
            disabled={isLoadingProvinces}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
          <select
            value={localFilters.order_by}
            onChange={(e) => setLocalFilters({ ...localFilters, order_by: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
          >
            <option value="">Default</option>
            <option value="jumlah_kuota">Kuota Terbanyak</option>
            <option value="jumlah_terdaftar">Terdaftar Terbanyak</option>
            <option value="created_at">Terbaru</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Arah</label>
          <select
            value={localFilters.order_direction}
            onChange={(e) => setLocalFilters({ ...localFilters, order_direction: e.target.value as 'ASC' | 'DESC' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
          >
            <option value="DESC">Tertinggi ke Terendah</option>
            <option value="ASC">Terendah ke Tertinggi</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tampilkan</label>
          <select
            value={localFilters.limit}
            onChange={(e) => setLocalFilters({ ...localFilters, limit: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
          >
            <option value={20}>20 per halaman</option>
            <option value={50}>50 per halaman</option>
            <option value={100}>100 per halaman</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Peluang</label>
          <select
            value={localFilters.opportunityRatio}
            onChange={(e) => setLocalFilters({ ...localFilters, opportunityRatio: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
          >
            <option value="">Semua Peluang</option>
            <option value="90">≥90% Tersedia (Sangat Tinggi)</option>
            <option value="75">≥75% Tersedia (Tinggi)</option>
            <option value="50">≥50% Tersedia (Sedang)</option>
            <option value="25">≥25% Tersedia (Rendah)</option>
            <option value="0">Semua yang Tersedia</option>
            <option value="full">Kuota Penuh (0%)</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleApply}
          className="flex-1 sm:flex-none"
        >
          <Filter className="h-4 w-4 mr-2" />
          Terapkan Filter
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="flex-1 sm:flex-none"
        >
          <X className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Total Count */}
      <div className="text-gray-600 text-sm border-t pt-4">
        Menampilkan <span className="font-semibold text-primary-600">{totalCount.toLocaleString('id-ID')}</span> dari <span className="font-semibold">{totalInSystem.toLocaleString('id-ID')}</span> lowongan
      </div>
    </div>
  );
}
