import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import apiClient from '../../api/apiClient';

const orderCancel = async ({ id, reason }: { id: string, reason: string }): Promise<any> => {
    const res = await apiClient.patch(`/orders/${id}/status`, reason);
    return res.data;
};

export const useOrderCancel = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: orderCancel,
        onSuccess: (data) => {
            toast.success(data.message, {
                position: 'top-center',
                duration: 2000,
            });
            // Invalidate or refresh cart queries
            queryClient.invalidateQueries({ queryKey: ['orders'] });
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
