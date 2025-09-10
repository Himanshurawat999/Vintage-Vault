import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import apiClient from '../../api/apiClient';
import type { AddCategoryFormValues } from '../../types/categories.schema';

const editCategory = async ({ id, payload }: { id: string, payload: AddCategoryFormValues }): Promise<any> => {
    const res = await apiClient.patch(`/categories/${id}`, payload);
    return res.data;
};

export const useEditCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editCategory,
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
                'Failed to edit to cart';
            toast.error(message, {
                position: 'top-center',
            });
        },
    });
};
