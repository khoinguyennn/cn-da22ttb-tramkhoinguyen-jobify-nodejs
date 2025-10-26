import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Job, JobSearchParams, PaginatedResponse } from '@/types';
import { QUERY_KEYS } from '@/constants';

// Hook để lấy danh sách jobs với pagination và search
export const useJobs = (params?: JobSearchParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.JOBS, params],
    queryFn: async (): Promise<PaginatedResponse<Job>> => {
      const response = await apiClient.get('/jobs', { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

// Hook để lấy chi tiết một job
export const useJobDetail = (jobId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.JOB_DETAIL, jobId],
    queryFn: async (): Promise<Job> => {
      const response = await apiClient.get(`/jobs/${jobId}`);
      return response.data;
    },
    enabled: !!jobId,
  });
};

// Hook để tạo job mới (dành cho company)
export const useCreateJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (jobData: Omit<Job, 'id' | 'createdAt' | 'deletedAt'>) => {
      const response = await apiClient.post('/jobs', jobData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate jobs list để refresh data
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.JOBS] });
    },
  });
};

// Hook để cập nhật job
export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ jobId, jobData }: { jobId: number; jobData: Partial<Job> }) => {
      const response = await apiClient.put(`/jobs/${jobId}`, jobData);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate specific job và jobs list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.JOB_DETAIL, variables.jobId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.JOBS] });
    },
  });
};

// Hook để xóa job
export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (jobId: number) => {
      const response = await apiClient.delete(`/jobs/${jobId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.JOBS] });
    },
  });
};

// Hook để save/unsave job (cho user)
export const useSaveJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (jobId: number) => {
      const response = await apiClient.post('/saved-jobs', { idJob: jobId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SAVED_JOBS] });
    },
  });
};

// Hook để unsave job
export const useUnsaveJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (jobId: number) => {
      const response = await apiClient.delete(`/saved-jobs/${jobId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SAVED_JOBS] });
    },
  });
};
