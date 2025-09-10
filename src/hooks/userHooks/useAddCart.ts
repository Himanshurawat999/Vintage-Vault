import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../api/apiClient';
import { toast } from 'react-hot-toast';
import type { AddCartInput, CartResponse } from '../../types/cart.schema';

const addCartItem = async (payload: AddCartInput): Promise<CartResponse> => {
  const res = await apiClient.post('/users/cart/items', payload);
  return res.data;
};

export const useAddCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCartItem,
    onSuccess: (data) => {
      toast.success(data.message, {
        position: 'top-center',
        duration: 2000,
      });
      // Invalidate or refresh cart queries
      queryClient.invalidateQueries({ queryKey: ['cart'] });
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
