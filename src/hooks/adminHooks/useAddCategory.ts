import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import apiClient from '../../api/apiClient';
import type { AddCategoryFormValues } from '../../types/categories.schema';

const addCategory = async (payload: AddCategoryFormValues): Promise<any> => {
  const res = await apiClient.post('/categories', payload);
  return res.data;
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCategory,
    onSuccess: (data) => {
      toast.success(data.message, {
        position: 'top-center',
        duration: 2000,
      });
      // Invalidate or refresh cart queries
      queryClient.invalidateQueries({ queryKey: ['categories'] });
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
