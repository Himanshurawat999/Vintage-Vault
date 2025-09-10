import { useQuery } from '@tanstack/react-query';
import apiClient from '../../api/apiClient';

const fetchSearchProduct = async (searchTerm: string): Promise<any> => {
  const res = await apiClient.get(`/products/search`, {
    params: { q: searchTerm },
  });
  return res.data;
};

export const useSearch = (searchTerm: string) => {
  return useQuery({
    queryKey: ['searchProduct', searchTerm],
    queryFn: () => fetchSearchProduct(searchTerm),
    enabled: Boolean(searchTerm),
  });
};
