import { Vacancy, DashboardStats } from '@/types';

export function calculateStatistics(
  vacancies: Vacancy[],
  totalInSystem: number
): DashboardStats {
  const stats: DashboardStats = {
    totalVacancies: totalInSystem,
    totalKuota: 0,
    totalRegistered: 0,
    availableSpots: 0,
    byProvince: {},
    byPosition: {},
    byEducation: {},
    byCompany: {},
    quotaStatus: {
      full: 0,
      nearFull: 0,
      available: 0,
      empty: 0,
    },
  };

  vacancies.forEach((vacancy) => {
    const kuota = vacancy.jumlah_kuota || 0;
    const registered = vacancy.jumlah_terdaftar || 0;

    stats.totalKuota += kuota;
    stats.totalRegistered += registered;

    // By province
    const province = vacancy.perusahaan?.nama_provinsi || 'Tidak Diketahui';
    if (!stats.byProvince[province]) {
      stats.byProvince[province] = { count: 0, kuota: 0, registered: 0 };
    }
    stats.byProvince[province].count++;
    stats.byProvince[province].kuota += kuota;
    stats.byProvince[province].registered += registered;

    // By position
    const position = vacancy.posisi || 'Tidak Diketahui';
    if (!stats.byPosition[position]) {
      stats.byPosition[position] = { count: 0, kuota: 0, registered: 0 };
    }
    stats.byPosition[position].count++;
    stats.byPosition[position].kuota += kuota;
    stats.byPosition[position].registered += registered;

    // By education
    try {
      const educations = JSON.parse(vacancy.jenjang);
      educations.forEach((edu: string) => {
        stats.byEducation[edu] = (stats.byEducation[edu] || 0) + 1;
      });
    } catch (e) {
      // Handle parse error
    }

    // By company
    const company = vacancy.perusahaan?.nama_perusahaan || 'Tidak Diketahui';
    const location = `${vacancy.perusahaan?.nama_kabupaten || ''}, ${vacancy.perusahaan?.nama_provinsi || ''}`.trim();
    if (!stats.byCompany[company]) {
      stats.byCompany[company] = { location, positions: 0, kuota: 0 };
    }
    stats.byCompany[company].positions++;
    stats.byCompany[company].kuota += kuota;

    // Quota status
    const fillRate = kuota > 0 ? (registered / kuota) * 100 : 0;
    if (fillRate >= 100) {
      stats.quotaStatus.full++;
    } else if (fillRate >= 75) {
      stats.quotaStatus.nearFull++;
    } else if (fillRate > 0) {
      stats.quotaStatus.available++;
    } else {
      stats.quotaStatus.empty++;
    }
  });

  stats.availableSpots = stats.totalKuota - stats.totalRegistered;

  return stats;
}
