import { DashboardStats } from '@/types';
import { formatNumber } from '@/lib/utils';

interface DashboardMetricsProps {
  stats: DashboardStats;
}

export default function DashboardMetrics({ stats }: DashboardMetricsProps) {
  const metrics = [
    {
      icon: '📋',
      label: 'Total Lowongan',
      value: formatNumber(stats.totalVacancies),
      color: 'text-primary-600',
    },
    {
      icon: '👥',
      label: 'Total Kuota',
      value: formatNumber(stats.totalKuota),
      color: 'text-purple-600',
    },
    {
      icon: '✅',
      label: 'Total Terdaftar',
      value: formatNumber(stats.totalRegistered),
      color: 'text-blue-600',
    },
    {
      icon: '🎯',
      label: 'Sisa Kuota',
      value: formatNumber(stats.availableSpots),
      color: 'text-green-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl">{metric.icon}</div>
            <div>
              <div className={`text-3xl font-bold ${metric.color}`}>
                {metric.value}
              </div>
              <div className="text-gray-600 text-sm mt-1">{metric.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
