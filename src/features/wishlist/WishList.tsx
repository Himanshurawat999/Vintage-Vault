import { useGetWishlist } from "../../hooks/userHooks/useGetWishlist";

const WishList = () => {
  const { data: getWishlist } = useGetWishlist();
  console.log(getWishlist);

  return <div>WishList</div>;
};

export default WishList;
