import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../api/apiClient';
import { toast } from 'react-hot-toast';

type UpdateQuantityInput = {
  itemId: string;
  quantity: number;
};

const updateQuantity = async ({
  itemId,
  quantity,
}: UpdateQuantityInput): Promise<any> => {
  const res = await apiClient.patch(`/users/cart/items/${itemId}`, {
    "quantity": quantity,
  });
  return res.data;
};

export const useQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuantity,
    onMutate: async ({ itemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] })

      const prevCart = queryClient.getQueryData(['cart']);
      console.log(prevCart)

      if (prevCart && typeof prevCart === 'object') {
        const updatedCart = {
          ...prevCart, data: {
            ...prevCart?.data,
            cart: {
              ...prevCart?.data?.cart,
              items: prevCart?.data?.cart?.items?.map((item: any) =>
                item.product.id === itemId ? { ...item, quantity } : item
              )

            }
          }
        }
        console.log("hello")
        console.log("updatedCart", updatedCart)
        queryClient.setQueryData(['cart'], updatedCart)
      }

      return { prevCart };
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Quantity updated', {
        position: 'top-center',
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.error?.message ||
        error?.message ||
        'Failed to update quantity';
      toast.error(message, {
        position: 'top-center',
      });
    },
  });
};
