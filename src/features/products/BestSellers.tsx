import Card from "../../components/userComponent/Card";
import { useProductsData } from "../../hooks/userHooks/useProductsData";

const BestSellers = () => {
  const { data, isLoading } = useProductsData();

  return (
    <div className="px-4 py-10 lg:px-10 lg:pt-28">
      <h1 className="font-fraunces font-light text-2xl md:text-3xl lg:text-5xl mb-8 md:mb-12">
        Best Sellers
      </h1>
      <div
        id="cards"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-14 gap-y-10"
      >
        {!isLoading &&
          data?.data?.products
            ?.slice(0, 8)
            .map((product: any) => <Card key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default BestSellers;
