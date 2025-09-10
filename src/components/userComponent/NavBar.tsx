import { Menu, Search, SquareUser, X } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useSearch } from "../../hooks/userHooks/useSearch";
import { useUserProfile } from "../../hooks/userHooks/useUserProfile";
import { motion, AnimatePresence } from "motion/react";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: searchResult } = useSearch(searchTerm);
  const { data: userProfile } = useUserProfile();
  // console.log(userProfile);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowSuggestions(Boolean(term));

    console.log(searchTerm);
    console.log("Data : ", searchResult);
    console.log(Boolean(term));
  };

  const handleSelect = (id: string) => {
    console.log("Selected product id : ", id);
    setShowSuggestions(false);
    navigate(`/products/${id}`);
  };

  const handleProfile = () => {
    console.log("showProfile : ", showProfile);
    setShowProfile(!showProfile);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="fixed z-50 bg-white w-full h-16 flex justify-between items-center px-2 md:px-8 shadow-sm">
      <Link
        to={"/"}
        className="font-fraunces font-thin text-3xl hidden md:block"
      >
        Vintage Vault
      </Link>
      <button onClick={toggleMenu} className="z-50 md:hidden">
        {menuOpen ? (
          <X className="w-4 text-zinc-600" />
        ) : (
          <Menu className="w-4 text-zinc-600" />
        )}
      </button>
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/30 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              onClick={toggleMenu}
            />
            <motion.div
              key="mobile-menu"
              className="fixed top-0 left-0 w-2/3 h-full bg-white shadow-lg z-40 flex flex-col px-8 py-16"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            >
              <h1 className="font-fraunces font-thin text-3xl underline underline-offset-2 decoration-1 mb-3">
                Vintage Vault
              </h1>
              <Link to="/login" onClick={toggleMenu} className="py-2">
                Login
              </Link>
              <Link to="/" onClick={toggleMenu} className="py-2">
                Home
              </Link>
              <Link to="/products" onClick={toggleMenu} className="py-2">
                Product
              </Link>
              <Link to="/cart" onClick={toggleMenu} className="py-2">
                Cart
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="w-[70%] md:w-[30%] relative">
        <input
          type="text"
          placeholder="What are you searching for ?"
          className="border-b px-2 outline-none w-full"
          onChange={(e) => handleChange(e)}
        />
        <Search className="absolute top-0 right-2 w-4 text-zinc-600" />
        {showSuggestions && searchResult?.data?.products?.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-white border max-h-60 overflow-auto z-10">
            {searchResult.data.products.map((p: any) => (
              <li
                key={p.id}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(p.id)}
              >
                {p.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <ul className="md:flex gap-4 hidden">
        <Link
          to={"/"}
          className="hover:text-orange-500 hover:underline hover:underline-offset-4"
        >
          Home
        </Link>
        <Link
          to={"/products"}
          className="hover:text-orange-500 hover:underline hover:underline-offset-4"
        >
          Product
        </Link>
        <Link
          to={"/cart"}
          className="hover:text-orange-500 hover:underline hover:underline-offset-4"
        >
          Cart
        </Link>
        <li className="relative hidden md:block">
          <SquareUser
            onClick={handleProfile}
            className="text-zinc-600 hover:text-orange-500"
          />
          {showProfile && (
            <div className="absolute w-28 px-2 top-7 -right-6 bg-white border max-h-60 z-10">
              <p>
                {userProfile.data.user.firstName}{" "}
                {userProfile.data.user.lastName}
              </p>
            </div>
          )}
        </li>
      </ul>

      <div className="relative block md:hidden">
        <SquareUser
          onClick={handleProfile}
          className="text-zinc-600 hover:text-orange-500 w-4"
        />
        {showProfile && (
          <div className="absolute w-28 px-2 top-7 -right-6 bg-white border max-h-60 z-10">
            <p>
              {userProfile.data.user.firstName} {userProfile.data.user.lastName}
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
