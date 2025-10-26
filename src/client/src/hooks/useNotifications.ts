import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Notification, PaginatedResponse, PaginationParams } from '@/types';
import { QUERY_KEYS } from '@/constants';

// Hook để lấy danh sách notifications
export const useNotifications = (params?: PaginationParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATIONS, params],
    queryFn: async (): Promise<PaginatedResponse<Notification>> => {
      const response = await apiClient.get('/notifications', { params });
      return response.data;
    },
    refetchInterval: 30000, // Tự động refresh mỗi 30 giây
  });
};

// Hook để lấy số lượng notifications chưa đọc
export const useUnreadNotificationsCount = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATIONS, 'unread-count'],
    queryFn: async (): Promise<{ count: number }> => {
      const response = await apiClient.get('/notifications/unread-count');
      return response.data;
    },
    refetchInterval: 30000, // Tự động refresh mỗi 30 giây
  });
};

// Hook để đánh dấu notification là đã đọc
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (notificationId: number) => {
      const response = await apiClient.patch(`/notifications/${notificationId}/read`);
      return response.data;
    },
    onSuccess: () => {
      // Refresh notifications và unread count
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
    },
  });
};

// Hook để đánh dấu tất cả notifications là đã đọc
export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.patch('/notifications/mark-all-read');
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
    },
  });
};
