import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import apiClient from '../../api/apiClient';
import type { OrderStatusValues } from '../../types/orderStatus.schema';

const orderStatus = async ({ id, payload }: { id: string, payload: OrderStatusValues }): Promise<any> => {
    const res = await apiClient.patch(`/orders/${id}/status`, payload);
    return res.data;
};

export const useOrderStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: orderStatus,
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
