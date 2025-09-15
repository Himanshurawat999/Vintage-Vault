import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { reviewInput } from "../../types/review.schema";
import apiClient from "../../api/apiClient";
import toast from "react-hot-toast";

const addReview = async ({ productId, payload }: { productId: string, payload: reviewInput }) => {
    const res = await apiClient.post(`/products/${productId}/reviews`, payload);
    return res.data;
}

export const useAddReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addReview,
        onSuccess: (data) => {
            toast.success(data.message, {
                position: 'top-center',
                duration: 2000,
            });
            queryClient.invalidateQueries({ queryKey: ['review'] })
        },
        onError: (error: any) => {
            const errorMsg = error?.response?.data?.error?.message;
            toast.error(errorMsg, {
                position: 'top-center'
            })
        }
    })
}