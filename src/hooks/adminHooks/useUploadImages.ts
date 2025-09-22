import { useMutation } from "@tanstack/react-query";
import apiClient from "../../api/apiClient"
import toast from "react-hot-toast";

export const uploadImages = async (payload: any): Promise<any> => {
    console.log(payload)
    const res = await apiClient.post('/products/upload-images', payload, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data
}

export const useUploadImages = () => {
    return useMutation({
        mutationFn: uploadImages,
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