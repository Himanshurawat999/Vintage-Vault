import Footer from "../../components/userComponent/Footer";
import LoadingScreen from "../../components/userComponent/LoadingScreen";
import NavBar from "../../components/userComponent/NavBar";
import { useGetWishlist } from "../../hooks/userHooks/useGetWishlist";
import WishListCard from "../../components/userComponent/WishListCard";

const WishList = () => {
  const { data: getWishlist, isLoading: getWishlistLoading } = useGetWishlist();
  const wishlist = getWishlist?.data?.wishlist;

  return (
    <>
      <NavBar />
      {getWishlistLoading ? (
        <LoadingScreen />
      ) : (
        <div className="w-full min-h-screen px-4 pt-24 mb-10 sm:px-6 lg:px-8">
          <h3 className="font-fraunces text-3xl md:text-5xl text-gray-800 mb-2">
            WishList Summary
          </h3>
          <ul className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-10">
            {wishlist.map((item: any) => (
              <WishListCard key={item.id} item={item}/>
            ))}
          </ul>
        </div>
      )}
      <Footer />
    </>
  );
};

export default WishList;
