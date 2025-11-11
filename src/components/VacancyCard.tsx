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
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-3 sm:p-4">
        {/* Header: Logo + Title + Badge - Always stacked on mobile */}
        <div className="flex gap-2 sm:gap-3 mb-3">
          {/* Logo */}
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

          {/* Title & Info - Flexible width */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">
              {vacancy.posisi || 'Posisi tidak tersedia'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 truncate flex items-center gap-1 mt-0.5">
              <Building2 className="h-3 w-3 flex-shrink-0" />
              {perusahaan.nama_perusahaan || 'Tidak tersedia'}
            </p>
            <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              {perusahaan.nama_kabupaten}, {perusahaan.nama_provinsi}
            </p>
          </div>

          {/* Chance Badge - Compact on mobile */}
          <div className="flex-shrink-0">
            <Badge variant={chanceInfo.variant} className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 whitespace-nowrap">
              {chancePercentage.toFixed(0)}%
            </Badge>
          </div>
        </div>

        {/* Stats Grid - Fully responsive, stacks on very small screens */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-3 text-xs">
          {/* Quota */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-600" />
            </div>
            <div className="min-w-0 w-full">
              <p className="text-[10px] text-gray-500 leading-tight">Kuota</p>
              <p className="font-semibold text-gray-900 text-xs sm:text-sm">{kuota}</p>
            </div>
          </div>

          {/* Pendaftar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-purple-50 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-600" />
            </div>
            <div className="min-w-0 w-full">
              <p className="text-[10px] text-gray-500 leading-tight">Daftar</p>
              <p className="font-semibold text-gray-900 text-xs sm:text-sm">{pendaftar}</p>
            </div>
          </div>

          {/* Sisa */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-green-50 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-600" />
            </div>
            <div className="min-w-0 w-full">
              <p className="text-[10px] text-gray-500 leading-tight">Sisa</p>
              <p className="font-semibold text-green-600 text-xs sm:text-sm">{availableSpots}</p>
            </div>
          </div>

          {/* Pendaftaran Date */}
          <div className="flex items-start gap-1 col-span-3 sm:col-span-3 lg:col-span-1">
            <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-gray-500 leading-tight">Daftar s/d</p>
              <p className="font-medium text-gray-900 text-xs truncate">
                {formatDate(jadwal.tanggal_pendaftaran_akhir)}
              </p>
            </div>
          </div>

          {/* Magang Date */}
          <div className="flex items-start gap-1 col-span-3 sm:col-span-3 lg:col-span-1">
            <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-gray-500 leading-tight">Magang s/d</p>
              <p className="font-medium text-gray-900 text-xs truncate">
                {formatDate(jadwal.tanggal_selesai)}
              </p>
            </div>
          </div>
        </div>

        {/* Tags - Horizontal scroll on mobile if needed */}
        <div className="flex gap-1 mb-3 overflow-x-auto pb-1 scrollbar-hide">
          {jenjang.slice(0, 2).map((j, idx) => (
            <Badge key={idx} variant="default" className="text-[10px] px-1.5 py-0.5 whitespace-nowrap flex-shrink-0">
              {j}
            </Badge>
          ))}
          {programStudi.slice(0, 2).map((ps, idx) => (
            <Badge key={idx} variant="secondary" className="text-[10px] px-1.5 py-0.5 whitespace-nowrap flex-shrink-0">
              {typeof ps === 'object' ? ps.title : ps}
            </Badge>
          ))}
          {(jenjang.length + programStudi.length > 4) && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 whitespace-nowrap flex-shrink-0">
              +{jenjang.length + programStudi.length - 4}
            </Badge>
          )}
        </div>

        {/* Progress Bar - Always full width */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] sm:text-xs text-gray-600 font-medium">Peluang</span>
            <span className="text-[10px] sm:text-xs text-gray-600 font-semibold">
              {chancePercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
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
