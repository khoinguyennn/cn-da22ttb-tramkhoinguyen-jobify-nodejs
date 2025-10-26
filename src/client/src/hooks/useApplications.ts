import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { ApplyJob, ApplyJobFormData, PaginatedResponse, PaginationParams } from '@/types';
import { QUERY_KEYS } from '@/constants';

// Hook để lấy danh sách applications của user
export const useUserApplications = (params?: PaginationParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.APPLICATIONS, 'user', params],
    queryFn: async (): Promise<PaginatedResponse<ApplyJob>> => {
      const response = await apiClient.get('/applications/user', { params });
      return response.data;
    },
  });
};

// Hook để lấy danh sách applications cho một job (dành cho company)
export const useJobApplications = (jobId: number, params?: PaginationParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.APPLICATIONS, 'job', jobId, params],
    queryFn: async (): Promise<PaginatedResponse<ApplyJob>> => {
      const response = await apiClient.get(`/applications/job/${jobId}`, { params });
      return response.data;
    },
    enabled: !!jobId,
  });
};

// Hook để lấy tất cả applications của company
export const useCompanyApplications = (params?: PaginationParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.APPLICATIONS, 'company', params],
    queryFn: async (): Promise<PaginatedResponse<ApplyJob>> => {
      const response = await apiClient.get('/applications/company', { params });
      return response.data;
    },
  });
};

// Hook để apply job
export const useApplyJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (applicationData: ApplyJobFormData) => {
      const formData = new FormData();
      
      // Append tất cả fields vào FormData
      Object.entries(applicationData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'cv' && value instanceof File) {
            formData.append('cv', value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });
      
      const response = await apiClient.post('/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Refresh applications list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.APPLICATIONS] });
    },
  });
};

// Hook để update application status (dành cho company)
export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ applicationId, status }: { applicationId: number; status: number }) => {
      const response = await apiClient.patch(`/applications/${applicationId}/status`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.APPLICATIONS] });
    },
  });
};

// Hook để withdraw application (user rút lại đơn ứng tuyển)
export const useWithdrawApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (applicationId: number) => {
      const response = await apiClient.delete(`/applications/${applicationId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.APPLICATIONS] });
    },
  });
};
