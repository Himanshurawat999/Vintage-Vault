import { useMutation } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";
import type { ResetResponse, resetInput } from "../../types/registration.schema";
import { toast } from "react-hot-toast";

const resetPassword = async (data: resetInput): Promise<ResetResponse> => {
    const { confirmPassword, ...payload } = data; // we are doin destructing cause we don't want to pass confirmPassword to api
    const res = await apiClient.post('/auth/reset-password', payload);
    return res.data;
}

export const useResetPassword = () => {
    return useMutation({
        mutationFn: resetPassword,
        onSuccess: (data) => {
            console.log('Registration Successful : ', data);
            toast.success(data.message, {
                position: "top-center",
                removeDelay: 2000,
            })
        },
        onError: (error) => {
            console.error('Registration failed : ', error?.response?.data?.error?.message)
            const errorMsg = error?.response?.data?.error?.message;
            toast.error(errorMsg, {
                position: "top-center"
            })
        }
    });
}