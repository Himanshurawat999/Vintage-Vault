import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import apiClient from '../../api/apiClient';
import type { OrderConfirmPaymentValues } from '../../types/orderStatus.schema';

const orderConfirmPayment = async ({ orderId, payload }: { orderId: string, payload: OrderConfirmPaymentValues}): Promise<any> => {
    const res = await apiClient.patch(`/orders/${orderId}/confirm-payment`, payload);
    return res.data;
};

export const useOrderConfirmPayment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: orderConfirmPayment,
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
