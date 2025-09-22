import { useMutation } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";
import type { ErrorResponse, ForgetResponse, forgetInput } from "../../types/registration.schema";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";

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
        onError: (error:AxiosError) => {
            console.error('Registration failed : ', (error?.response?.data as ErrorResponse)?.error?.message)
            const errorMsg = (error?.response?.data as ErrorResponse)?.error?.message;
            toast.error(errorMsg, {
                position: "top-center"
            })
        }
    });
}