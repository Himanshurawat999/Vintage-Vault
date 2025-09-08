import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/apiClient"
import toast from "react-hot-toast";

const removeShipping = async ({ itemId }: { itemId: string }) => {
    const res = await apiClient.delete(`/shipping-addresses/${itemId}`)
    return res.data;
}

export const useRemoveShipping = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeShipping,
        onSuccess: (data) => {
            toast.success(data.message || 'Address Deleted', {
                position: 'top-center',
                duration: 2000,
            })
            queryClient.invalidateQueries({ queryKey: ['shippingAddresses'] });
        },
        onError: (error: any) => {
            const message = error?.response?.data?.error?.message ||
                error?.message ||
                'Failed to delete item';
            toast.error(message, {
                position: "top-center",
            })
        }
    })
}