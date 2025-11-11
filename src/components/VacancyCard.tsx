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

  // Local placeholder SVG
  const placeholderLogo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='10' fill='%239ca3af'%3ELogo%3C/text%3E%3C/svg%3E";

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
      <div className="p-3 sm:p-4">
        {/* Mobile: Stacked Layout, Desktop: Horizontal Layout */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Logo & Title Section */}
          <div className="flex gap-3 items-start flex-1 min-w-0">
            {/* Logo - Smaller on mobile */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
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

            {/* Title & Company Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2">
                {vacancy.posisi || 'Posisi tidak tersedia'}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-gray-600 mt-1">
                <span className="flex items-center gap-1 truncate">
                  <Building2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                  <span className="truncate">{perusahaan.nama_perusahaan || 'Tidak tersedia'}</span>
                </span>
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                  <span className="truncate">{perusahaan.nama_kabupaten}, {perusahaan.nama_provinsi}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Chance Badge - Top right on desktop, below on mobile */}
          <div className="flex sm:block sm:flex-shrink-0">
            <Badge variant={chanceInfo.variant} className="whitespace-nowrap text-xs">
              {chanceInfo.label} ({chancePercentage.toFixed(0)}%)
            </Badge>
          </div>
        </div>

        {/* Stats Row - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mt-3 text-xs sm:text-sm">
          {/* Quota Stats */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded bg-blue-50 flex-shrink-0">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-gray-500">Kuota</p>
              <p className="font-semibold text-gray-900 truncate">{kuota}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded bg-purple-50 flex-shrink-0">
              <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-gray-500">Pendaftar</p>
              <p className="font-semibold text-gray-900 truncate">{pendaftar}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded bg-green-50 flex-shrink-0">
              <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-gray-500">Sisa</p>
              <p className="font-semibold text-green-600 truncate">{availableSpots}</p>
            </div>
          </div>

          {/* Date Info */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-gray-500 truncate">Daftar s/d</p>
              <p className="font-medium text-gray-900 text-[10px] sm:text-xs truncate">
                {formatDate(jadwal.tanggal_pendaftaran_akhir)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-gray-500 truncate">Magang s/d</p>
              <p className="font-medium text-gray-900 text-[10px] sm:text-xs truncate">
                {formatDate(jadwal.tanggal_selesai)}
              </p>
            </div>
          </div>
        </div>

        {/* Tags Row - Compact, scrollable on mobile */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-3">
          {jenjang.slice(0, 2).map((j, idx) => (
            <Badge key={idx} variant="default" className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
              {j}
            </Badge>
          ))}
          {programStudi.slice(0, 2).map((ps, idx) => (
            <Badge key={idx} variant="secondary" className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
              {typeof ps === 'object' ? ps.title : ps}
            </Badge>
          ))}
          {(jenjang.length + programStudi.length > 4) && (
            <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
              +{jenjang.length + programStudi.length - 4}
            </Badge>
          )}
        </div>

        {/* Progress Bar Below - Full width */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] sm:text-xs text-gray-600 font-medium">Peluang Diterima</span>
            <span className="text-[10px] sm:text-xs text-gray-600 font-semibold">
              {chancePercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
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
