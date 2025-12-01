import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';

export interface Field {
  id: number;
  name: string;
  typeField: string;
}

export interface FieldsResponse {
  success: boolean;
  data: Field[];
  message: string;
}

export const useFields = () => {
  return useQuery<FieldsResponse>({
    queryKey: ['fields'],
    queryFn: async () => {
      const response = await apiClient.get('/fields');
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 phút - dữ liệu ngành nghề ít thay đổi
  });
};

