import { useQuery } from "@tanstack/react-query";
import { Product } from "../../types/Product";
import { fetchData } from "../../services/api";
import placeholder from "../../assets/placeholder.jpg";
import { RiHeart3Line } from "@remixicon/react";

const ProductCard = () => {
  const { data: products, isError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await fetchData<Product[]>("products");
      return data;
    },
  });
  if (isError) {
    return <div>Soemething wrong</div>;
  }
  return (
    <div className="grid  md:grid-cols-2 lg:grid-cols-4 gap-5">
      {products?.map((product) => (
        <div
          key={product.id}
          className="w-full p-2 border border-slate-200 rounded"
        >
          <img className="w-full rounded-t" src={placeholder} alt="product" />
          <div className="">
            <h3 className="py-2 font-bold text-sm">{product.title}</h3>
            <div className="flex items-center justify-between py-2">
              <div className="">
                <p className="line-through text-sm font-semibold text-orange-500">
                  $399.99
                </p>
                <p className="font-bold">${product.price}</p>
              </div>
              <div className="flex gap-2">
                <button className="border rounded-full px-2">
                  <RiHeart3Line size={20} />
                </button>
                <button className="border rounded-full px-4 py-2 uppercase text-sm font-bold hover:bg-orange-500 hover:text-white transition duration-300">
                  Add to card
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
