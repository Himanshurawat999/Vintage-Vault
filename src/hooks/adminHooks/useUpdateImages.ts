import { useMutation } from "@tanstack/react-query";
import apiClient from "../../api/apiClient"
import toast from "react-hot-toast";
import type { updateProductImageInput } from "../../types/product.schema";

export const updateImages = async ({id,payload}:{id:string,payload: updateProductImageInput}): Promise<any> => {
    console.log(payload)
    const res = await apiClient.patch(`/products/${id}/images`, payload);
    return res.data
}
    
export const useUpdateImages = () => {
    return useMutation({
        mutationFn: updateImages,
        onSuccess: (data) => {
            toast.success(data.message, {
                position: 'top-center',
                duration: 2000,
            });
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
    })
}