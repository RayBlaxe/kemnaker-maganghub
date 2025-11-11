import { Vacancy, OpportunityLevel } from '@/types';

export function parseJSON<T>(str: string | null | undefined): T | null {
  if (!str) return null;
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return 'Tidak tersedia';
  
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function calculateOpportunityLevel(vacancy: Vacancy): OpportunityLevel {
  const kuota = vacancy.jumlah_kuota || 0;
  const registered = vacancy.jumlah_terdaftar || 0;
  const availableSpots = kuota - registered;
  const percentage = kuota > 0 ? (availableSpots / kuota) * 100 : 0;

  if (percentage >= 90) {
    return {
      percentage,
      label: '🎯 Peluang Sangat Tinggi',
      className: 'bg-green-100 text-green-800',
      icon: '🎯',
    };
  } else if (percentage >= 75) {
    return {
      percentage,
      label: '✨ Peluang Tinggi',
      className: 'bg-blue-100 text-blue-800',
      icon: '✨',
    };
  } else if (percentage >= 50) {
    return {
      percentage,
      label: '⭐ Peluang Sedang',
      className: 'bg-yellow-100 text-yellow-800',
      icon: '⭐',
    };
  } else if (percentage > 0) {
    return {
      percentage,
      label: '⚠️ Peluang Rendah',
      className: 'bg-orange-100 text-orange-800',
      icon: '⚠️',
    };
  } else {
    return {
      percentage,
      label: '❌ Kuota Penuh',
      className: 'bg-red-100 text-red-800',
      icon: '❌',
    };
  }
}

export function formatNumber(num: number): string {
  return num.toLocaleString('id-ID');
}
