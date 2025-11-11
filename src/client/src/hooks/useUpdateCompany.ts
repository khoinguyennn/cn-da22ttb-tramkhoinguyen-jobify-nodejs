import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { CompanyProfile } from './useCompanyProfile';
import { useAuth } from '@/contexts/AuthContext';

export interface UpdateCompanyRequest {
  nameCompany?: string;
  nameAdmin?: string;
  email?: string;
  phone?: string;
  web?: string;
  intro?: string;
  idProvince?: number;
  scale?: string;
}

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  const { updateCompany } = useAuth();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateCompanyRequest }) => {
      const response = await apiClient.put(`/companies/${id}`, data);
      return response.data.data;
    },
    onSuccess: (updatedCompany: CompanyProfile) => {
      // Cập nhật cache của company profile
      queryClient.setQueryData(['company-profile'], updatedCompany);
      
      // Cập nhật AuthContext để navbar được cập nhật
      updateCompany(updatedCompany as any);
      
      // Invalidate để refetch data mới
      queryClient.invalidateQueries({ queryKey: ['company-profile'] });
    },
    onError: (error: any) => {
      console.error('Error updating company:', error);
    }
  });
};
