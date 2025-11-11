import { DashboardStats } from '@/types';

interface DashboardChartsProps {
  stats: DashboardStats;
}

export default function DashboardCharts({ stats }: DashboardChartsProps) {
  const topProvinces = Object.entries(stats.byProvince)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10);

  const topPositions = Object.entries(stats.byPosition)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10);

  const maxProvinceCount = topProvinces[0]?.[1].count || 1;
  const maxPositionCount = topPositions[0]?.[1].count || 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Top Provinces Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Top 10 Provinsi</h2>
        <div className="space-y-3">
          {topProvinces.map(([province, data]) => (
            <div key={province} className="flex items-center gap-3">
              <div className="w-32 text-sm text-gray-600 text-right truncate">
                {province}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                <div
                  className="bg-gradient-primary h-full flex items-center justify-end px-3 text-white text-sm font-semibold transition-all duration-500"
                  style={{ width: `${(data.count / maxProvinceCount) * 100}%` }}
                >
                  {data.count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Positions Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Top 10 Posisi</h2>
        <div className="space-y-3">
          {topPositions.map(([position, data]) => (
            <div key={position} className="flex items-center gap-3">
              <div className="w-32 text-sm text-gray-600 text-right truncate">
                {position}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                <div
                  className="bg-gradient-primary h-full flex items-center justify-end px-3 text-white text-sm font-semibold transition-all duration-500"
                  style={{ width: `${(data.count / maxPositionCount) * 100}%` }}
                >
                  {data.count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Distribusi Jenjang Pendidikan</h2>
        <div className="flex flex-wrap gap-3">
          {Object.entries(stats.byEducation)
            .sort((a, b) => b[1] - a[1])
            .map(([education, count]) => (
              <div
                key={education}
                className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium"
              >
                {education}: {count}
              </div>
            ))}
        </div>
      </div>

      {/* Quota Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Status Pengisian Kuota</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <span className="font-medium text-red-700">Penuh (100%)</span>
            <span className="font-bold text-red-900">{stats.quotaStatus.full}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
            <span className="font-medium text-orange-700">Hampir Penuh (75-99%)</span>
            <span className="font-bold text-orange-900">{stats.quotaStatus.nearFull}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-medium text-green-700">Tersedia (&lt;75%)</span>
            <span className="font-bold text-green-900">{stats.quotaStatus.available}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="font-medium text-blue-700">Belum Ada Pendaftar</span>
            <span className="font-bold text-blue-900">{stats.quotaStatus.empty}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
