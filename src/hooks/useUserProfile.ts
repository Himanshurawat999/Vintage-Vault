import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient"

const getUserProfile = async () => {
    const res = await apiClient.get(`/users/profile`, {
        withCredentials: true
    })
    return res.data;
}

export const useUserProfile = () => {
    return useQuery({ queryKey: ['userProfile'], queryFn: () => getUserProfile() })
}
