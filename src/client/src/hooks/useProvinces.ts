import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';

export interface Province {
  id: number;
  name: string;
  nameWithType: string;
}

export interface ProvincesResponse {
  success: boolean;
  data: Province[];
  message: string;
}

export const useProvinces = () => {
  return useQuery<ProvincesResponse>({
    queryKey: ['provinces'],
    queryFn: async () => {
      const response = await apiClient.get('/provinces');
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 phút - dữ liệu tỉnh thành ít thay đổi
  });
};

