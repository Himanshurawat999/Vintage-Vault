import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../api/apiClient"
import toast from "react-hot-toast";

const removeWishlist = async ({ productId }: { productId: string }) => {
    const res = await apiClient.delete(`/users/wishlist/${productId}`)
    return res.data;
}

export const useRemoveWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeWishlist,
        onSuccess: (data) => {
            toast.success(data.message || 'Item Deleted', {
                position: 'top-center',
                duration: 2000,
            })
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
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