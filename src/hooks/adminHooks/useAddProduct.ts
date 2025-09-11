import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import apiClient from '../../api/apiClient';
import type { AddProductFormValues } from '../../types/product.schema';

const addProduct = async (payload: AddProductFormValues): Promise<any> => {
  const res = await apiClient.post('/products', payload);
  return res.data;
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      toast.success(data.message, {
        position: 'top-center',
        duration: 2000,
      });
      // Invalidate or refresh cart queries
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.error?.message ||
        error?.message ||
        'Failed to add to cart';
      toast.error(message, {
        position: 'top-center',
      });
    },
  });
};
