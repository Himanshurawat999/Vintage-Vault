import { useAddWishlist } from "./useAddWishlist";
import { useRemoveWishlist } from "./useRemoveWishlist";
import { useGetWishlist } from "./useGetWishlist";

interface UseWishlistToggleResult {
  isInWishlist: boolean;
  toggleWishlist: () => void;
  loading: boolean;
  error: any;
}

export function useWishlistToggle(productId: string | undefined): UseWishlistToggleResult {
  const { data: wishlistData, isSuccess: wishlistLoaded, isError: wishlistError } = useGetWishlist();
  const { mutate: addWishlist, isPending: adding, error: addError } = useAddWishlist();
  const { mutate: removeWishlist, isPending: removing, error: removeError } = useRemoveWishlist();

  // Derive whether this product is already in wishlist
  const isInWishlist = wishlistLoaded && wishlistData?.data?.wishlist.some((item: any) => item.product.id === productId);

  // Toggle function
  const toggleWishlist = () => {
    if (!productId) return;
    if (isInWishlist) {
      removeWishlist({ productId });
    } else {
      addWishlist({ payload: { productId } });
    }
  };

  // Combined loading / error states
  const loading = adding || removing;
  const error = addError || removeError || wishlistError;

  return {
    isInWishlist: !!isInWishlist,
    toggleWishlist,
    loading,
    error,
  };
}
