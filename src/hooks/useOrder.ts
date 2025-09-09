import { keepPreviousData, useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

const fetchOrder = async (): Promise<any> => {
  const res = await apiClient.get('/orders');
  return res.data;
};

export const useGetOrder = () => {
  return useQuery<any>({
    queryKey: ['orders'],
    queryFn: fetchOrder,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes freshness
    retry: 2,                  // Retry twice on error
  });
};
