import { useMutation } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";
import type { ErrorResponse, RegisterResponse, loginInput } from "../../types/registration.schema";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router";
import type { AxiosError } from "axios";



const loginUser = async (data: loginInput): Promise<RegisterResponse> => {
    const res = await apiClient.post('/auth/login', data);
    return res.data;
}

export const useLoginUser = () => {
    const { setAuth } = useAuthStore()
    const navigate = useNavigate();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            console.log('Login Successful : ', data);
            console.log(data.data.accessToken)
            console.log(data.data.user)
            const { user, accessToken } = data.data;
            if (user && accessToken) {
                setAuth(user, accessToken);
                user.role === "customer" ? navigate('/', {replace: true}) : navigate('/admin', {replace: true})
            }
            toast.success(data.message || 'Login Successfull', {
                position: 'top-center',
                duration: 2000,
            });

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