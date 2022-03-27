import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Constants from "expo-constants";
const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

const ProductContext = createContext();

export function ProductProvider(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      console.log("fetching products");
      const data = await (await fetch(`${uri}/get-products`)).json();
      console.log(data.products.data);
      setProducts(data.products.data);
    }
    fetchProducts();
  }, []);

  const api = useMemo(() => ({ products }), [products]);

  return (
    <ProductContext.Provider value={api}>
      {props.children}
    </ProductContext.Provider>
  );
}

export const useProductContext = () => useContext(ProductContext);
