import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';

export interface SavedJob {
  id: number;
  createdAt: string;
  job: {
    id: number;
    nameJob: string;
    salaryMin?: number;
    salaryMax?: number;
    company: {
      id: number;
      nameCompany: string;
      avatarPic?: string;
    };
    province: {
      id: number;
      nameWithType: string;
    };
  };
}

export const useSavedJobs = () => {
  return useQuery({
    queryKey: ['savedJobs'],
    queryFn: async (): Promise<SavedJob[]> => {
      const response = await apiClient.get('/jobs/saved');
      return response.data.data || [];
    },
  });
};
