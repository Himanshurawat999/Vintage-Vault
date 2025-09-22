import { useMutation } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";
import type { ErrorResponse, RegisterResponse, RegistrationInput } from "../../types/registration.schema";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import type { AxiosError } from "axios";
// const navigate = useNavigate();

const registerUser = async (data: RegistrationInput): Promise<RegisterResponse> => {
    const res = await apiClient.post('/auth/register', data);
    return res.data;
}

export const useRegisterUser = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            console.log('Registration Successful : ', data);
            navigate("/login")
            toast.success(data.message || 'Registration Successfull', {
                position: 'top-center',
                duration: 2000,
            });
        },
        onError: (error:AxiosError) => {
            console.error('Registration failed : ', (error?.response?.data as ErrorResponse)?.error?.message)
            const errorMsg = (error?.response?.data as ErrorResponse)?.error?.message;
            toast.error(errorMsg, {
                position: "top-center",
                duration: 2000,
            })
        }
    });
}