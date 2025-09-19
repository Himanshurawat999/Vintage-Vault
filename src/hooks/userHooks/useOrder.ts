import { keepPreviousData, useQuery } from '@tanstack/react-query';
import apiClient from '../../api/apiClient';

const fetchOrder = async (status?:string): Promise<any> => {
  console.log(status)
  const url = status ? `/orders?status=${status}` : `/orders`
  const res = await apiClient.get(url);
  return res.data;
};

export const useGetOrder = (status?:string) => {
  return useQuery<any>({
    queryKey: ['orders', status],
    queryFn: () => fetchOrder(status),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes freshness
    retry: 2,                  // Retry twice on error
  });
};
