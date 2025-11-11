import Image from 'next/image';
import { Vacancy } from '@/types';
import { formatDate, parseJSON, calculateOpportunityLevel } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Users, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';

interface VacancyCardProps {
  vacancy: Vacancy;
}

export default function VacancyCard({ vacancy }: VacancyCardProps) {
  const perusahaan = vacancy.perusahaan || {};
  const jadwal = vacancy.jadwal || {};
  const programStudi = parseJSON<{ title: string }[]>(vacancy.program_studi) || [];
  const jenjang = parseJSON<string[]>(vacancy.jenjang) || [];
  
  const opportunityLevel = calculateOpportunityLevel(vacancy);
  const availableSpots = vacancy.jumlah_kuota - vacancy.jumlah_terdaftar;

  // Local placeholder SVG to avoid network requests
  const placeholderLogo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='14' fill='%239ca3af'%3ELogo%3C/text%3E%3C/svg%3E";

  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardHeader>
        {/* Header */}
        <div className="flex gap-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={perusahaan.logo || placeholderLogo}
              alt={perusahaan.nama_perusahaan || 'Company'}
              fill
              className="object-contain rounded-lg bg-gray-50 p-2"
              onError={(e) => {
                e.currentTarget.src = placeholderLogo;
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-1 truncate">
              {vacancy.posisi || 'Posisi tidak tersedia'}
            </h2>
            <p className="text-lg text-primary-600 font-medium truncate">
              {perusahaan.nama_perusahaan || 'Tidak tersedia'}
            </p>
            <p className="text-gray-600 flex items-center gap-1 text-sm">
              <MapPin className="h-4 w-4" />
              {perusahaan.nama_kabupaten}, {perusahaan.nama_provinsi}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Opportunity Indicator */}
        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary-600" />
              <span className="font-semibold text-gray-900">Peluang Diterima</span>
            </div>
            <Badge 
              variant={
                opportunityLevel.percentage >= 75 ? "success" : 
                opportunityLevel.percentage >= 50 ? "info" : 
                opportunityLevel.percentage >= 25 ? "warning" : 
                "destructive"
              }
              className="text-sm px-3 py-1"
            >
              {opportunityLevel.label}
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                opportunityLevel.percentage >= 75 ? 'bg-green-500' :
                opportunityLevel.percentage >= 50 ? 'bg-blue-500' :
                opportunityLevel.percentage >= 25 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${opportunityLevel.percentage}%` }}
            />
          </div>
          <p className="text-right text-sm font-bold text-gray-700 mt-1">
            {opportunityLevel.percentage.toFixed(1)}% Kuota Tersedia
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-blue-600" />
              <p className="text-xs text-blue-600 font-medium">Kuota</p>
            </div>
            <p className="font-bold text-blue-900 text-lg">{vacancy.jumlah_kuota}</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="h-4 w-4 text-purple-600" />
              <p className="text-xs text-purple-600 font-medium">Terdaftar</p>
            </div>
            <p className="font-bold text-purple-900 text-lg">{vacancy.jumlah_terdaftar}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <p className="text-xs text-green-600 font-medium">Sisa</p>
            </div>
            <p className="font-bold text-green-900 text-lg">{availableSpots}</p>
          </div>
        </div>

        {/* Date Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-gray-600" />
              <p className="text-xs font-medium text-gray-600">Pendaftaran</p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {formatDate(jadwal.tanggal_pendaftaran_awal)}
            </p>
            <p className="text-xs text-gray-500">s/d {formatDate(jadwal.tanggal_pendaftaran_akhir)}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-gray-600" />
              <p className="text-xs font-medium text-gray-600">Periode Magang</p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {formatDate(jadwal.tanggal_mulai)}
            </p>
            <p className="text-xs text-gray-500">s/d {formatDate(jadwal.tanggal_selesai)}</p>
          </div>
        </div>

        {/* Description */}
        {vacancy.deskripsi_posisi && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-4 w-4 text-gray-600" />
              <h3 className="font-semibold text-gray-900 text-sm">Deskripsi Posisi</h3>
            </div>
            <p className="text-gray-700 text-sm whitespace-pre-line line-clamp-3">
              {vacancy.deskripsi_posisi}
            </p>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {jenjang.map((j, idx) => (
            <Badge key={idx} variant="default" className="gap-1">
              <GraduationCap className="h-3 w-3" />
              {j}
            </Badge>
          ))}
          {programStudi.slice(0, 3).map((ps, idx) => (
            <Badge key={idx} variant="secondary">
              {typeof ps === 'object' ? ps.title : ps}
            </Badge>
          ))}
          {programStudi.length > 3 && (
            <Badge variant="outline">
              +{programStudi.length - 3} lainnya
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
