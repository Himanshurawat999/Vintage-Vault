import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "../../api/apiClient";
import toast from "react-hot-toast";

interface Props {
    productId: string
}

const addWishlist = async ({ payload }: { payload: Props }) => {
    const res = await apiClient.post(`/users/wishlist`, payload);
    return res.data;
}

export const useAddWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addWishlist,
        onSuccess: (data) => {
            toast.success(data.message, {
                position: 'top-center',
                duration: 2000,
            });
            queryClient.invalidateQueries({ queryKey: ['wishlist'] })
        },
        onError: (error: any) => {
            const errorMsg = error?.response?.data?.error?.message;
            toast.error(errorMsg, {
                position: 'top-center'
            })
        }
    })
}