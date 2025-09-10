import { useMutation } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";
import type { ForgetResponse, forgetInput } from "../../types/registration.schema";
import { toast } from "react-hot-toast";

const forgetPassword = async (data: forgetInput): Promise<ForgetResponse> => {
    const res = await apiClient.post('/auth/forgot-password', data);
    return res.data;
}

export const useForgetPassword = () => {
    return useMutation({
        mutationFn: forgetPassword,
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