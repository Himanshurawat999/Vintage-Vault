import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import type { ShippingFormInput } from "../../types/shipping.schema";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "../../types/registration.schema";

const addShipping = async (data: ShippingFormInput): Promise<any> => {
    const res = await apiClient.post('/shipping-addresses', data);
    return res.data;
}

export const useAddShipping = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addShipping,
        onSuccess: (data) => {
            console.log('Address Successful : ', data);
            toast.success(data.message, {
                position: 'top-center',
                duration: 2000,
            });
            navigate("/shipping")
            queryClient.invalidateQueries({queryKey: ['shippingAddresses']})
        },
        onError: (error:AxiosError) => {
            console.error('Registration failed : ', (error?.response?.data as ErrorResponse)?.error?.message)
            const errorMsg = (error?.response?.data as ErrorResponse)?.error?.message;
            toast.error(errorMsg, {
                position: "top-right"
            })
        }
    });
}