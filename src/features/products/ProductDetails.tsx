import { useParams } from "react-router";
import { useProductDetails } from "../../hooks/useProductDetails";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Minus, Plus, Star, Truck } from "lucide-react";
import { useState } from "react";
import { useAddCart } from "../../hooks/useAddCart";


const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState<number>(0);

  const { data: productDetails } = useProductDetails(id);
  const product = productDetails?.data?.product;
  console.log(productDetails);

  const { mutate, isPending } = useAddCart();

  const handleCart = () => {
    console.log("CArt");
    if (!product) return;

    const payload = {
      productId: product.id,
      quantity,
      productVariant: {
        size: "Large",
        color: "Blue",
        material: "Cotton",
        additionalProp1: {},
      },
    };

    mutate(payload);
  };

  return (
    <>
      <NavBar />
      <div className="w-full sm:px-12 md:px-20 pt-28 mb-20 flex flex-col sm:flex-row gap-x-10 lg:gap-x-24">
        <div id="left" className="w-[80%] mx-auto sm:w-1/2 h-[400px] sm:h-full lg:h-[500px]">
          <div className="w-full h-full">
            <img
              src={product?.images[0]}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div id="right" className="w-[80%] mx-auto sm:w-1/2 h-full py-6 text-zinc-800">
          <h2 className="text-3xl font-fraunces">{product?.name}</h2>
          <div className="mt-2 flex gap-4 items-center">
            <div className="flex gap-0.5">
              <Star className="text-orange-500 fill-orange-500 w-4" />
              <Star className="text-orange-500 fill-orange-500 w-4" />
              <Star className="text-orange-500 fill-orange-500 w-4" />
              <Star className="text-orange-500 fill-orange-500 w-4" />
            </div>
            <p className="text-sm text-zinc-600">(7 customer reviews)</p>
          </div>
          <p className="mt-4 text-zinc-600 w-4/5">{product?.description}</p>
          <p className="mt-4 text-lg font-medium">${product?.price}</p>
          <div className="flex gap-2 text-zinc-600 mt-4">
            <Truck />
            <p>Estimated delivery in 6-8 weeks.</p>
          </div>
          <div className="mt-5">
            <h3 className="text-xl">Additional information</h3>
            <p className="text-sm text-zinc-600 mt-2">
              Remaining items : {product?.inventoryQuantity}
            </p>
            <p className="text-sm text-zinc-600 mt-2">
              Weight : {product?.weight}
              {product?.weightUnit}
            </p>
          </div>

          <div className="mt-6 md:mt-12 flex gap-3">
            <div
              id="quantity"
              className="w-1/3 px-4 border border-zinc-300 bg-zinc-100 flex justify-between items-center gap-4"
            >
              <Minus
                className="text-zinc-600 w-5"
                onClick={() => setQuantity((q) => Math.max(q - 1, 0))}
              />
              <p className="text-xl">{quantity}</p>
              <Plus
                className="text-zinc-600 w-5"
                onClick={() => setQuantity((q) => q + 1)}
              />
            </div>
            <button
              onClick={handleCart}
              disabled={isPending}
              className={`w-2/3 px-4 py-1.5 text-zinc-50 cursor-pointer ${
                isPending ? "bg-zinc-700" : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              {isPending ? "Adding..." : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
