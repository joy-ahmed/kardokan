import { useEffect, useState } from "react";
import { fetchData } from "./services/api";
import { Product } from "./types/Product";
import "./App.css";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchData<Product[]>("products");
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    getProduct();
  }, []);

  return (
    <>
      <h1 className="font-bold text-3xl">Hi Mom.</h1>
      <pre>{JSON.stringify(products, null, 4)}</pre>
      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.title}</h1>
        </div>
      ))}
    </>
  );
}

export default App;
