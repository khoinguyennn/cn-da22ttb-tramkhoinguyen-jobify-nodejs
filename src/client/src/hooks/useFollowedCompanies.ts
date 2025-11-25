import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';

export interface FollowedCompany {
  id: number;
  createdAt: string;
  company: {
    id: number;
    nameCompany: string;
    desc?: string;
    address?: string;
    avatarPic?: string;
    jobCount?: number;
  };
}

export const useFollowedCompanies = () => {
  return useQuery({
    queryKey: ['followedCompanies'],
    queryFn: async (): Promise<FollowedCompany[]> => {
      const response = await apiClient.get('/companies/followed');
      return response.data.data || [];
    },
  });
};
