import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import apiClient from '../../api/apiClient';

const deleteProduct = async ({ id }: { id: string }): Promise<any> => {
    const res = await apiClient.delete(`/products/${id}`);
    return res.data;
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,
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
                'Failed to delete to cart';
            toast.error(message, {
                position: 'top-center',
            });
        },
    });
};
