import { Menu, Search, SquareUser, X } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useSearch } from "../../hooks/userHooks/useSearch";
import { useUserProfile } from "../../hooks/userHooks/useUserProfile";
import { motion, AnimatePresence } from "motion/react";
import { useGetCart } from "../../hooks/userHooks/useGetCart";
import { useAuthStore } from "../../store/authStore";
import { useCategories } from "../../hooks/userHooks/useCategories";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [_, setShowSuggestions] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  // const profileRef = useRef<HTMLDivElement>(null);

  // instantiate outside click hooks
  // useClickOutside(profileRef, setShowProfile(false));

  // const profileRef = useRef<HTMLElement>(null);

  const { data: searchResult } = useSearch(searchTerm);
  const { data: userProfile } = useUserProfile();
  const { data: fetchCart } = useGetCart();
  const cartLen = fetchCart?.data?.cart?.items?.length;
  const [searchLen, setSearchLen] = useState<number|null>(null);
  console.log(searchLen)

  useEffect(() => setSearchLen(searchResult?.data?.products?.length),[searchResult])

  const { data: categoriesData } = useCategories();

  const searchMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(searchLen)
    const handleOutsideClick = (e: MouseEvent) => {
      console.log('Mouse Clicked', e.target);
      if (searchMenuRef.current && !searchMenuRef.current.contains(e.target as Node)) {
        setSearchLen(null)
      }
    };
    if (searchLen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [searchLen]);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log("pathname : ", pathname);
  const { clearAuth } = useAuthStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowSuggestions(Boolean(term));
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const term = (e.target as HTMLInputElement).value.trim();
    console.log("term : ",term)
    if(e.key === 'Enter' && term != "") {
      // setSearchParams({search:term})
      console.log("term : ",term)
      navigate(`/products`, {state: {search: term}})
    }
  }

  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearchClick = () => {
    const term = searchInputRef.current?.value.trim();
    if (term) {
      navigate(`/products`, { state: { search: term } });
    }
  };

  const handleSelect = (id: string) => {
    // console.log("Selected product id : ", id);
    setShowSuggestions(false);
    navigate(`/products/${id}`);
  };

  const handleProfile = () => {
    // console.log("showProfile : ", showProfile);
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    clearAuth();
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleCategory = (categoryId: string, index: number) => {
    console.log(categoryId);
    navigate(`/products`, {
      state: { categoryIdFromNav: categoryId, categoryIdxFromNav: index },
    });
  };

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
              <Link to="/" onClick={toggleMenu} className="py-2">
                Home
              </Link>
              <Link to="/products" onClick={toggleMenu} className="py-2">
                Product
              </Link>
              <Link to="/cart" onClick={toggleMenu} className="py-2">
                Cart
              </Link>
              <Link to="/login" onClick={toggleMenu} className="py-2">
                Logout
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div ref={searchMenuRef} className="w-[70%] md:w-[30%] relative">
        <input
          type="text"
          placeholder="What are you searching for ?"
          className="border-b px-2 outline-none w-full"
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleEnter(e)}
          ref={searchInputRef}
        />
        <Search onClick={handleSearchClick} className="absolute top-0 right-2 w-4 text-zinc-600 cursor-pointer" />
        <ul className="absolute top-full left-0 right-0 bg-white border border-t-0 border-zinc-100 shadow-md text-zinc-600 text-sm max-h-60 overflow-auto z-10">
          {searchLen === 0 ? (
            <li>no such product</li>
          ) : (
            searchResult?.data?.products.map((p: any) => (
              <li
                key={p.id}
                className={`px-2 py-1 hover:bg-gray-100 hover:text-orange-500 cursor-pointer ${searchLen === null ? "hidden" : "block"}`}
                onClick={() => handleSelect(p.id)}
              >
                {p.name}
              </li>
            ))
          )}
        </ul>
      </div>
      <ul className="md:flex gap-4 hidden relative">
        <Link
          to={"/"}
          className={`hover:text-orange-500 ${
            pathname === "/"
              ? "text-orange-500 underline underline-offset-4"
              : ""
          }`}
        >
          Home
        </Link>
        <Link
          to={"/products"}
          onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}
          className={`hover:text-orange-500 ${
            pathname === "/products"
              ? "text-orange-500 underline underline-offset-4"
              : ""
          }`}
        >
          Product
        </Link>
        {showCategories && (
          <div
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
            className="w-full h-80 px-4 py-2 absolute top-6 -right-6 bg-white shadow-sm z-10 text-zinc-600 overflow-y-auto"
          >
            <h4 className="text-zinc-800 mb-2">Category</h4>
            <ul className="grid grid-cols-1">
              {categoriesData?.data?.categories.map(
                (category: any, index: number) => (
                  <li
                    key={category.id}
                    onClick={() => handleCategory(category.id, index)}
                    className="py-1 px-1 text-sm hover:bg-zinc-100 hover:text-orange-500 cursor-pointer"
                  >
                    {category.name}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
        <Link
          to={"/cart"}
          className={`hover:text-orange-500 relative ${
            pathname === "/cart"
              ? "text-orange-500 underline underline-offset-4"
              : ""
          }`}
        >
          Cart
          <span className="absolute -top-1.5 text-[10px] text-white rounded-full px-1 bg-orange-500">
            {cartLen}
          </span>
        </Link>
        <li className="relative hidden md:block ml-1">
          <SquareUser
            // onClick={() => setShowProfile(() => !showProfile)}
            onMouseEnter={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
            className={`hover:text-orange-500 ${
              pathname === "/user-profile"
                ? "text-orange-500 underline"
                : "text-zinc-600"
            }`}
          />
          {showProfile && (
            <div
              onMouseEnter={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
              className="absolute w-36 p-2 top-[23px] -right-6 bg-white shadow-sm max-h-60 z-10 text-zinc-600"
            >
              <p className="hover:bg-zinc-100 p-1">
                {userProfile.data.user.firstName}{" "}
                {userProfile.data.user.lastName}
              </p>
              <Link
                to={"/user-profile"}
                className="hover:bg-zinc-100 cursor-pointer p-1 block"
              >
                Setting
              </Link>
              <div
                onClick={handleLogout}
                className="hover:bg-zinc-100 text-red-400 cursor-pointer p-1"
              >
                Logout
              </div>
            </div>
          )}
        </li>
      </ul>

      <div className="relative block md:hidden">
        <SquareUser
          // onClick={handleProfile}
          onTouchStart={handleProfile}
          className="text-zinc-600 hover:text-orange-500 w-4"
        />
        {showProfile && (
          <div className="absolute w-28 top-5 -right-1.5 bg-white max-h-60 z-10 text-zinc-600 text-sm shadow-sm">
            <p className="hover:bg-zinc-100 p-1">
              {userProfile.data.user.firstName} {userProfile.data.user.lastName}
            </p>
            <Link
              to={"/user-profile"}
              className="hover:bg-zinc-100 cursor-pointer p-1 block"
            >
              Setting
            </Link>
            <div
              onClick={handleLogout}
              className="hover:bg-zinc-100 text-red-400 cursor-pointer p-1"
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
