import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { showToast } from '@/utils/toast';

// Interface cho company application với thông tin chi tiết
export interface CompanyApplication {
  id: number;
  idJob: number;
  idUser: number;
  name: string;
  email: string;
  phone: string;
  letter?: string;
  cv?: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  // Thông tin job
  job: {
    id: number;
    nameJob: string;
    salaryMin?: number;
    salaryMax?: number;
    typeWork: string;
    idCompany: number;
  };
  // Thông tin user
  user: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
}

// Response interface cho pagination
export interface CompanyApplicationsResponse {
  data: CompanyApplication[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Query parameters cho API
export interface CompanyApplicationQueryParams {
  page?: number;
  limit?: number;
  idJob?: number;
  status?: number;
  search?: string;
  sort?: 'newest' | 'oldest' | 'status';
}

/**
 * Hook để lấy danh sách ứng tuyển của công ty
 * Sử dụng API GET /apply/company
 */
export const useCompanyApplications = (params: CompanyApplicationQueryParams = {}) => {
  return useQuery({
    queryKey: ['company-applications', params],
    queryFn: async (): Promise<CompanyApplicationsResponse> => {
      const queryString = new URLSearchParams();
      
      if (params.page) queryString.append('page', params.page.toString());
      if (params.limit) queryString.append('limit', params.limit.toString());
      if (params.idJob) queryString.append('idJob', params.idJob.toString());
      if (params.status) queryString.append('status', params.status.toString());
      if (params.search) queryString.append('search', params.search);
      if (params.sort) queryString.append('sort', params.sort);
      
      const url = `/apply/company${queryString.toString() ? `?${queryString.toString()}` : ''}`;
      const response = await apiClient.get(url);
      
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook để cập nhật trạng thái ứng tuyển
 * Sử dụng API PUT /apply/:id/status
 */
export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      applicationId, 
      status 
    }: { 
      applicationId: number; 
      status: number;
    }) => {
      const response = await apiClient.put(`/apply/${applicationId}/status`, { status });
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate và refetch company applications queries
      queryClient.invalidateQueries({ queryKey: ['company-applications'] });
      queryClient.invalidateQueries({ queryKey: ['application-detail'] });
      
      showToast.success('Cập nhật trạng thái thành công!');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật trạng thái';
      showToast.error(message);
    },
  });
};

/**
 * Hook để ẩn/hiện đơn ứng tuyển  
 * Sử dụng API PUT /apply/hidden và PUT /apply/unHidden
 */
export const useToggleApplicationVisibility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      applicationIds, 
      hidden 
    }: { 
      applicationIds: number[]; 
      hidden: boolean;
    }) => {
      const endpoint = hidden ? '/apply/hidden' : '/apply/unHidden';
      const response = await apiClient.put(endpoint, { applicationIds });
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate và refetch company applications queries
      queryClient.invalidateQueries({ queryKey: ['company-applications'] });
      
      const action = variables.hidden ? 'ẩn' : 'hiện';
      showToast.success(`Đã ${action} các đơn ứng tuyển được chọn!`);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Có lỗi xảy ra khi thay đổi trạng thái hiển thị';
      showToast.error(message);
    },
  });
};

// Status mapping cho display
export const ApplicationStatusMap = {
  1: { label: 'Chưa xem', color: 'bg-gray-100 text-gray-700' },
  2: { label: 'Đã xem', color: 'bg-blue-100 text-blue-700' },
  3: { label: 'Phỏng vấn', color: 'bg-yellow-100 text-yellow-700' },
  4: { label: 'Từ chối', color: 'bg-red-100 text-red-700' },
  5: { label: 'Chấp nhận', color: 'bg-green-100 text-green-700' },
} as const;

export type ApplicationStatus = keyof typeof ApplicationStatusMap;
