import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../api/apiClient"
import toast from "react-hot-toast";

const removeCartItem = async ({ itemId }: { itemId: string }) => {
    const res = await apiClient.delete(`/users/cart/items/${itemId}`)
    return res.data;
}

export const useRemoveCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeCartItem,
        onSuccess: (data) => {
            toast.success(data.message || 'Item Deleted', {
                position: 'top-center',
                duration: 2000,
            })
            queryClient.invalidateQueries({ queryKey: ['cart'] });
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