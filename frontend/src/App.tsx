// src/App.tsx
import { fetchData } from "./services/api";
import { Product } from "./types/Product";
import { useQuery } from "@tanstack/react-query";
import "./App.css";

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
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <>
      <h1 className="font-bold text-3xl">Hi Mom.</h1>
      {products?.map((product) => (
        <div key={product.id}>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </>
  );
}

export default App;
