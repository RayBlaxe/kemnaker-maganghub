'use client';

import { useState, useEffect } from 'react';
import VacancyCard from '@/components/VacancyCard';
import FilterPanel from '@/components/FilterPanel';
import Pagination from '@/components/Pagination';
import { Vacancy, VacancyFilters, PaginationMeta } from '@/types';
import { fetchVacancies } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [filteredVacancies, setFilteredVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  const [filters, setFilters] = useState<VacancyFilters>({
    kode_provinsi: '',
    keyword: '',
    order_by: '',
    order_direction: 'DESC',
    limit: 20,
    opportunityRatio: '',
  });

  useEffect(() => {
    loadVacancies();
  }, [currentPage, filters.kode_provinsi, filters.keyword, filters.order_by, filters.order_direction, filters.limit]);

  const loadVacancies = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchVacancies(currentPage, filters);
      setVacancies(data.data || []);
      setMeta(data.meta?.pagination || null);
      applyClientSideFilters(data.data || []);
    } catch (err) {
      setError('Gagal memuat data. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyClientSideFilters = (data: Vacancy[]) => {
    let filtered = [...data];

    // Apply opportunity filter (client-side only)
    if (filters.opportunityRatio) {
      filtered = filtered.filter((vacancy) => {
        const kuota = vacancy.jumlah_kuota || 0;
        const registered = vacancy.jumlah_terdaftar || 0;

        if (kuota === 0) return false;

        const availableSpots = kuota - registered;
        const availabilityRatio = (availableSpots / kuota) * 100;

        switch (filters.opportunityRatio) {
          case '90':
            return availabilityRatio >= 90;
          case '75':
            return availabilityRatio >= 75;
          case '50':
            return availabilityRatio >= 50;
          case '25':
            return availabilityRatio >= 25;
          case '0':
            return availableSpots > 0;
          case 'full':
            return availableSpots <= 0;
          default:
            return true;
        }
      });
    }

    setFilteredVacancies(filtered);
  };

  const handleFilterChange = (newFilters: VacancyFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 sm:py-8">
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        totalCount={filteredVacancies.length}
        totalInSystem={meta?.total || 0}
      />

      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary-500" />
          <p className="ml-4 text-gray-600">Memuat data lowongan...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
          <button
            onClick={loadVacancies}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredVacancies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-2">Tidak ada lowongan yang ditemukan.</p>
              {(filters.keyword || filters.kode_provinsi || filters.opportunityRatio) && (
                <p className="text-gray-400 text-sm">Coba ubah filter atau kata kunci pencarian Anda.</p>
              )}
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-5 lg:gap-6 mb-8">
              {filteredVacancies.map((vacancy) => (
                <VacancyCard key={vacancy.id_posisi} vacancy={vacancy} />
              ))}
            </div>
          )}

          {meta && meta.last_page > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={meta.last_page}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
