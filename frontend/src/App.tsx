// src/App.tsx
import { fetchData } from "./services/api";
import { Product } from "./types/Product";
import { useQuery } from "@tanstack/react-query";
import "./App.css";
import ProductCard from "./components/products/ProductCard";

function App() {
  const {
    data: products,
    error,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await fetchData<Product[]>("products");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center -z-10">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-orange-600" />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div className="">
      <h1 className="font-bold text-3xl">Hi Mom.</h1>
      {products?.map((product) => (
        <div key={product.id}>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))}
      <div className="flex flex-col md:flex-row">
        <div className="w-48 bg-red-200">afas</div>
        <div className="w-[calc(100%-196px)] px-8">
          <ProductCard />
        </div>
      </div>
    </div>
  );
}

export default App;
