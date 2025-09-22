import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="w-full px-4 pt-10 pb-4 lg:px-10 lg:pt-14 lg:mt-12 lg:pb-8 grid grid-rows-[2fr_1fr] bg-zinc-50">
      <div id="row-1" className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 px-4 py-2">
        <div>
          <h2 className="font-fraunces text-4xl mb-3">Made in India</h2>
          <p className="text-zinc-600">
            sector 17, Chandigarh, India
          </p>
          <div className="w-20 mt-8 hidden md:block">
            <img
              src="/Images/india.png"
              alt="india_Logo"
              className="w-full h-full"
            />
          </div>
        </div>

        <div>
          <h1 className="font-fraunces text-2xl">Collection</h1>
          <ul className="mt-4 flex flex-col gap-2 text-zinc-600">
            <Link to={'/products'} className="hover:text-orange-500 hover:underline cursor-pointer">Products</Link>
            <Link to={'/cart'} className="hover:text-orange-500 hover:underline cursor-pointer">Cart</Link>
            <Link to={'/wishlist'} className="hover:text-orange-500 hover:underline cursor-pointer">WishList</Link>
            <li>Gift Cards</li>
          </ul>
        </div>

        <div>
          <h1 className="font-fraunces text-2xl">About Us</h1>
          <ul className="mt-4 flex flex-col gap-2 text-zinc-600">
            <Link to={'/user-profile'} className="hover:text-orange-500 hover:underline cursor-pointer">Profile</Link>
            <Link to={'/orders-history'} className="hover:text-orange-500 hover:underline cursor-pointer">Order History</Link>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h1 className="font-fraunces text-2xl">Stay Connected</h1>
          <ul className="mt-4 flex flex-col gap-2 text-zinc-600">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>LinkedIn</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>
      <div id="row-2">
        <h1 className="font-fraunces text-6xl lg:text-8xl tracking-wide mt-4">
          Exclusivity in Every Stitch.
        </h1>
      </div>
    </div>
  );
};

export default Footer;