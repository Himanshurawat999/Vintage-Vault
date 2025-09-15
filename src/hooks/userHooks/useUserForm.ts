import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";
import type { userFormInput } from "../../types/user.schema";
import toast from "react-hot-toast";

export const userForm = async ({payload}:{payload: userFormInput}) => {
    const res = await apiClient.patch('/users/profile', payload)
    return res.data
};

export const useUserForm = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: userForm,
        onSuccess: (data) => {
            toast.success(data.message, {
                position: 'top-center',
                duration: 2000,
            });
            queryClient.invalidateQueries({ queryKey: ['userProfile'] })
        },
        onError: (error: any) => {
            const errorMsg = error?.response?.data?.error?.message;
            toast.error(errorMsg, {
                position: 'top-center'
            })
        }
    })
}