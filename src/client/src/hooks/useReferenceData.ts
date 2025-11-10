import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Province, Field } from '@/types';
import { QUERY_KEYS } from '@/constants';

// Hook để lấy danh sách tỉnh thành
export const useProvinces = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROVINCES],
    queryFn: async (): Promise<Province[]> => {
      const response = await apiClient.get('/provinces');
      return response.data.data; // API trả về { success, data, message }
    },
    staleTime: 10 * 60 * 1000, // 10 phút - dữ liệu ít thay đổi
    gcTime: 30 * 60 * 1000, // 30 phút - giữ trong cache lâu hơn
  });
};

// Hook để lấy danh sách ngành nghề
export const useFields = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FIELDS],
    queryFn: async (): Promise<Field[]> => {
      const response = await apiClient.get('/fields');
      return response.data.data; // API trả về { success, data, message }
    },
    staleTime: 10 * 60 * 1000, // 10 phút - dữ liệu ít thay đổi
    gcTime: 30 * 60 * 1000, // 30 phút - giữ trong cache lâu hơn
  });
};

// Hook để lấy chi tiết province theo ID
export const useProvince = (provinceId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROVINCES, provinceId],
    queryFn: async (): Promise<Province> => {
      const response = await apiClient.get(`/provinces/${provinceId}`);
      return response.data.data; // API trả về { success, data, message }
    },
    enabled: !!provinceId,
    staleTime: 10 * 60 * 1000,
  });
};

// Hook để lấy chi tiết field theo ID
export const useField = (fieldId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FIELDS, fieldId],
    queryFn: async (): Promise<Field> => {
      const response = await apiClient.get(`/fields/${fieldId}`);
      return response.data.data; // API trả về { success, data, message }
    },
    enabled: !!fieldId,
    staleTime: 10 * 60 * 1000,
  });
};
