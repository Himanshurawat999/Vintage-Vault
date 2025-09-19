import { ArrowBigUpDash, ChevronDown, ChevronUp } from "lucide-react";
import Card from "../../components/userComponent/Card";
import Footer from "../../components/userComponent/Footer";
import NavBar from "../../components/userComponent/NavBar";
import { useCategories } from "../../hooks/userHooks/useCategories";
import { useProductsData } from "../../hooks/userHooks/useProductsData";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import LoadingScreen from "../../components/userComponent/LoadingScreen";

const Products = () => {
  const [catToggle, setCatToggle] = useState(true);
  const [categoryId, setcategoryId] = useState<string | null>(null);
  const [catIndex, setCatIndex] = useState<number | null>(null);
  console.log(categoryId);
  const { data: productData, isLoading: productDataLoading } = useProductsData(
    true,
    categoryId
  );
  const { data: categoriesData, isLoading: categoriesDataLoading } =
    useCategories();

  // console.log("productDataLoading : ", productDataLoading);
  // console.log(productData?.data?.products.length === 0);

  //   Books, Fitness, Women's Clothing, Men's Clothing, Audio, Laptops, Smartphones, Electronics

  const handleCategory = (
    catName: string,
    categoryId: string,
    categoryIndex: number
  ) => {
    console.log(catName);
    console.log(categoryId);
    setcategoryId(() => categoryId);
    setCatIndex(() => categoryIndex);
  };

  return (
    <>
      <NavBar />
      {productDataLoading || categoriesDataLoading ? (
        <LoadingScreen />
      ) : (
        <div id="product" className="flex pt-24">
          <div id="aside" className="w-[22%] ml-4 md:ml-12 mt-2">
            <h3
              className="font-fraunces font-light text-base sm:text-2xl hover:underline cursor-pointer mb-4"
              onClick={() => {
                setcategoryId(null);
                setCatIndex(null);
              }}
            >
              All Products
            </h3>

            <div
              className="flex justify-between items-center mb-4 cursor-pointer hover:underline"
              onClick={() => setCatToggle(!catToggle)}
            >
              <h3 className="font-fraunces font-light text-base sm:text-2xl">
                Categories
              </h3>
              {catToggle ? (
                <ChevronUp className="w-5 h-5 text-zinc-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-zinc-400" />
              )}
            </div>
            <AnimatePresence initial={false}>
              {catToggle && (
                <motion.ul
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden flex flex-col gap-2 text-zinc-600 text-xs md:text-base"
                >
                  {categoriesData?.data?.categories.map(
                    (category: any, index: number) => (
                      <li
                        key={index}
                        onClick={() =>
                          handleCategory(category.name, category.id, index)
                        }
                        className={`cursor-pointer px-4 py-1 rounded-sm ${
                          category.id == categoryId
                            ? "bg-orange-100"
                            : "hover:bg-zinc-100"
                        }`}
                      >
                        {category.name}
                      </li>
                    )
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <div id="main" className="px-4 pb-10 md:px-10 w-[75%] min-h-screen">
            <div className="mb-10 text-center">
              <h1 className="font-fraunces font-light text-2xl sm:text-5xl">
                {catIndex === null
                  ? "All Products"
                  : categoriesData?.data?.categories[catIndex]?.name}
              </h1>
              <p className="text-zinc-600 text-xs sm:text-sm mt-2">
                {catIndex === null
                  ? "Displaying all products"
                  : categoriesData?.data?.categories[catIndex]?.description}
              </p>
            </div>
            <div
              id="cards"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-10 relative"
            >
              {!productDataLoading &&
              productData?.data?.products.length === 0 ? (
                <div className="absolute left-10 top-4 md:left-20 md:top-24">
                  <h1 className="font-fraunces font-light italic text-3xl sm:text-8xl text-center">
                    We're launching soon...
                  </h1>
                  <h5 className="text-xs sm:text-base text-center mt-5 text-zinc-600">
                    Please checkout other products
                  </h5>
                </div>
              ) : (
                productData?.data?.products.map((product: any) => (
                  <Card key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
          <a
            href="#product"
            className="fixed z-50 left-2 bottom-5 w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center"
          >
            <ArrowBigUpDash />
          </a>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Products;
