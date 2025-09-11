import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import apiClient from '../../api/apiClient';
import type { AddProductFormValues } from '../../types/product.schema';

const editProduct = async ({ id, payload }: { id: string, payload: AddProductFormValues }): Promise<any> => {
    const res = await apiClient.patch(`/products/${id}`, payload);
    return res.data;
};

export const useEditProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editProduct,
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
                'Failed to edit to cart';
            toast.error(message, {
                position: 'top-center',
            });
        },
    });
};
