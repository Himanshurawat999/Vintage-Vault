import { keepPreviousData, useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

const fetchCart = async (): Promise<any> => {
  const res = await apiClient.get('/users/cart');
  return res.data;
};

export const useGetCart = () => {
  return useQuery<any>({
    queryKey: ['cart'],
    queryFn: fetchCart,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes freshness
    retry: 2,                  // Retry twice on error
  });
};
