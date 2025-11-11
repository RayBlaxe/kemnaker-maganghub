export interface Vacancy {
  id_posisi: string;
  posisi: string;
  deskripsi_posisi: string | null;
  jumlah_kuota: number;
  jumlah_terdaftar: number;
  program_studi: string;
  jenjang: string;
  created_at: string;
  perusahaan: {
    id_perusahaan: string;
    nama_perusahaan: string;
    alamat: string;
    logo: string;
    kode_provinsi: string;
    nama_provinsi: string;
    kode_kabupaten: string;
    nama_kabupaten: string;
  };
  jadwal: {
    tanggal_pendaftaran_awal: string;
    tanggal_pendaftaran_akhir: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
  };
  ref_status_posisi: {
    id_status_posisi: number;
    nama_status_posisi: string;
  };
  government_agency: {
    government_agency_name: string;
  };
}

export interface VacancyFilters {
  kode_provinsi?: string;
  keyword?: string;
  order_by?: string;
  order_direction?: 'ASC' | 'DESC';
  limit?: number;
  opportunityRatio?: string;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface ApiResponse {
  data: Vacancy[];
  meta: {
    pagination: PaginationMeta;
  };
}

export interface OpportunityLevel {
  percentage: number;
  label: string;
  className: string;
  icon: string;
}

export interface DashboardStats {
  totalVacancies: number;
  totalKuota: number;
  totalRegistered: number;
  availableSpots: number;
  byProvince: Record<string, ProvinceStats>;
  byPosition: Record<string, PositionStats>;
  byEducation: Record<string, number>;
  byCompany: Record<string, CompanyStats>;
  quotaStatus: QuotaStatus;
}

export interface ProvinceStats {
  count: number;
  kuota: number;
  registered: number;
}

export interface PositionStats {
  count: number;
  kuota: number;
  registered: number;
}

export interface CompanyStats {
  location: string;
  positions: number;
  kuota: number;
}

export interface QuotaStatus {
  full: number;
  nearFull: number;
  available: number;
  empty: number;
}

export interface Province {
  code: string;
  name: string;
}
