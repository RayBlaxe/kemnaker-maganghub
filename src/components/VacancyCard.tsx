import Image from 'next/image';
import { Vacancy } from '@/types';
import { formatDate, parseJSON } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Users, Building2, TrendingUp } from 'lucide-react';

interface VacancyCardProps {
  vacancy: Vacancy;
}

export default function VacancyCard({ vacancy }: VacancyCardProps) {
  const perusahaan = vacancy.perusahaan || {};
  const jadwal = vacancy.jadwal || {};
  const programStudi = parseJSON<{ title: string }[]>(vacancy.program_studi) || [];
  const jenjang = parseJSON<string[]>(vacancy.jenjang) || [];
  
  // Calculate chance: (kuota / pendaftar) * 100
  const kuota = vacancy.jumlah_kuota || 0;
  const pendaftar = vacancy.jumlah_terdaftar || 0;
  
  // If no pendaftar yet, chance is 100%
  // If pendaftar > kuota, chance is low
  const chancePercentage = pendaftar === 0 ? 100 : Math.min((kuota / pendaftar) * 100, 100);
  
  const availableSpots = kuota - pendaftar;

  // Determine color and label based on chance
  const getChanceColor = () => {
    if (chancePercentage >= 80) return { color: 'bg-green-500', variant: 'success' as const, label: 'Sangat Tinggi' };
    if (chancePercentage >= 50) return { color: 'bg-blue-500', variant: 'info' as const, label: 'Tinggi' };
    if (chancePercentage >= 25) return { color: 'bg-yellow-500', variant: 'warning' as const, label: 'Sedang' };
    return { color: 'bg-red-500', variant: 'destructive' as const, label: 'Rendah' };
  };

  const chanceInfo = getChanceColor();

  // Local placeholder SVG to avoid network requests
  const placeholderLogo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='10' fill='%239ca3af'%3ELogo%3C/text%3E%3C/svg%3E";

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        <div className="flex gap-4">
          {/* Logo - Compact */}
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src={perusahaan.logo || placeholderLogo}
              alt={perusahaan.nama_perusahaan || 'Company'}
              fill
              className="object-contain rounded bg-gray-50 p-1"
              onError={(e) => {
                e.currentTarget.src = placeholderLogo;
              }}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-2">
            {/* Title Row */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-base truncate">
                  {vacancy.posisi || 'Posisi tidak tersedia'}
                </h3>
                <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    {perusahaan.nama_perusahaan || 'Tidak tersedia'}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {perusahaan.nama_kabupaten}, {perusahaan.nama_provinsi}
                  </span>
                </div>
              </div>

              {/* Chance Badge */}
              <Badge variant={chanceInfo.variant} className="whitespace-nowrap">
                {chanceInfo.label} ({chancePercentage.toFixed(0)}%)
              </Badge>
            </div>

            {/* Stats Row - Compact Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
              {/* Quota Stats */}
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded bg-blue-50">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Kuota</p>
                  <p className="font-semibold text-gray-900">{kuota}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded bg-purple-50">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Pendaftar</p>
                  <p className="font-semibold text-gray-900">{pendaftar}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded bg-green-50">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Sisa</p>
                  <p className="font-semibold text-green-600">{availableSpots}</p>
                </div>
              </div>

              {/* Date Info */}
              <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Daftar s/d</p>
                  <p className="font-medium text-gray-900 text-xs">{formatDate(jadwal.tanggal_pendaftaran_akhir)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Magang s/d</p>
                  <p className="font-medium text-gray-900 text-xs">{formatDate(jadwal.tanggal_selesai)}</p>
                </div>
              </div>
            </div>

            {/* Tags Row - Compact */}
            <div className="flex flex-wrap gap-1.5">
              {jenjang.slice(0, 2).map((j, idx) => (
                <Badge key={idx} variant="default" className="text-xs px-2 py-0.5">
                  {j}
                </Badge>
              ))}
              {programStudi.slice(0, 2).map((ps, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs px-2 py-0.5">
                  {typeof ps === 'object' ? ps.title : ps}
                </Badge>
              ))}
              {(jenjang.length + programStudi.length > 4) && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  +{jenjang.length + programStudi.length - 4}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar Below */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-600 font-medium">Peluang Diterima</span>
            <span className="text-xs text-gray-600 font-semibold">
              {chancePercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full ${chanceInfo.color} rounded-full transition-all duration-500`}
              style={{ width: `${Math.min(chancePercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
