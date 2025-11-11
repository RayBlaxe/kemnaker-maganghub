'use client';

import { useState, useEffect } from 'react';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import DashboardCharts from '@/components/dashboard/DashboardCharts';
import DashboardTables from '@/components/dashboard/DashboardTables';
import DashboardFilters from '@/components/dashboard/DashboardFilters';
import { Vacancy, DashboardStats } from '@/types';
import { fetchVacancies } from '@/lib/api';
import { calculateStatistics } from '@/lib/statistics';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [provinceFilter, setProvinceFilter] = useState('');
  const [pagesToFetch, setPageesToFetch] = useState(10);

  useEffect(() => {
    loadDashboardData();
  }, [provinceFilter, pagesToFetch]);

  const loadDashboardData = async () => {
    setLoading(true);

    try {
      const allVacancies: Vacancy[] = [];
      
      // Fetch first page
      const firstData = await fetchVacancies(1, {
        kode_provinsi: provinceFilter,
        limit: 20,
      });

      const totalPages = firstData.meta?.pagination?.last_page || 1;
      const totalItems = firstData.meta?.pagination?.total || 0;
      
      allVacancies.push(...(firstData.data || []));

      // Fetch remaining pages
      const pagesToGet = Math.min(totalPages, pagesToFetch);
      const batchSize = 10;

      for (let i = 2; i <= pagesToGet; i += batchSize) {
        const endPage = Math.min(i + batchSize - 1, pagesToGet);
        const promises = [];

        for (let page = i; page <= endPage; page++) {
          promises.push(
            fetchVacancies(page, {
              kode_provinsi: provinceFilter,
              limit: 20,
            })
          );
        }

        const results = await Promise.all(promises);
        results.forEach((data) => {
          if (data.data) {
            allVacancies.push(...data.data);
          }
        });
      }

      // Calculate statistics
      const calculatedStats = calculateStatistics(allVacancies, totalItems);
      setStats(calculatedStats);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          📊 Dashboard Lowongan Magang
        </h1>
        <p className="text-lg text-gray-600">
          Ringkasan dan Statistik Magang Hub Kemnaker
        </p>
      </header>

      <DashboardFilters
        provinceFilter={provinceFilter}
        pagesToFetch={pagesToFetch}
        onProvinceChange={setProvinceFilter}
        onPageCountChange={setPageesToFetch}
      />

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="ml-4 text-gray-600">Memuat data statistik...</p>
        </div>
      )}

      {!loading && stats && (
        <>
          <DashboardMetrics stats={stats} />
          <DashboardCharts stats={stats} />
          <DashboardTables stats={stats} />
        </>
      )}
    </div>
  );
}
