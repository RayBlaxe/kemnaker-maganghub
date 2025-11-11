import { ApiResponse, VacancyFilters, Province } from '@/types';

const API_BASE = 'https://maganghub.kemnaker.go.id/be/v1/api/list';
const API_VACANCIES = `${API_BASE}/vacancies-aktif`;
const API_PROVINCES = `${API_BASE}/provinces`;

export async function fetchVacancies(
  page: number = 1,
  filters: VacancyFilters = {}
): Promise<ApiResponse> {
  const params = new URLSearchParams();
  
  params.append('page', page.toString());
  params.append('limit', (filters.limit || 20).toString());
  
  if (filters.kode_provinsi) {
    params.append('kode_provinsi', filters.kode_provinsi);
  }
  
  if (filters.keyword && filters.keyword.trim()) {
    params.append('keyword', filters.keyword.trim());
  }
  
  if (filters.order_by) {
    params.append('order_by', filters.order_by);
    params.append('order_direction', filters.order_direction || 'DESC');
  }
  
  const response = await fetch(`${API_VACANCIES}?${params.toString()}`, {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch vacancies');
  }
  
  return response.json();
}

export async function fetchProvinces(): Promise<Province[]> {
  try {
    const params = new URLSearchParams({
      order_by: 'nama_propinsi',
      order_direction: 'ASC',
      page: '1',
      limit: '40'
    });
    
    const response = await fetch(`${API_PROVINCES}?${params.toString()}`, {
      cache: 'force-cache'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch provinces');
    }
    
    const data = await response.json();
    
    return (data.data || []).map((prov: any) => ({
      code: prov.kode_propinsi,
      name: prov.nama_propinsi
    }));
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return [];
  }
}
