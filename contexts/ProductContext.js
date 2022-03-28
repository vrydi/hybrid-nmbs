import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Constants from "expo-constants";
const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

const ProductContext = createContext();

export function ProductProvider(props) {
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [selectedProductID, setSelectedProductID] = useState();
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    async function fetchProducts() {
      console.log("fetching products");
      const data = await (await fetch(`${uri}/get-products`)).json();
      const data2 = await (await fetch(`${uri}/get-prices`)).json();
      console.log(data2.prices.data);
      setProducts(data.products.data);
      setPrices(data2.prices.data);
    }
    fetchProducts();
  }, []);

  const buyProduct = async () => {
    console.log(`buying ${selectedProductID}`);
    fetch(`${uri}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedProductID }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  };

  const api = useMemo(
    () => ({
      products,
      prices,
      selectedProductID,
      setSelectedProductID,
      buyProduct,
    }),
    [products, prices, selectedProductID, setSelectedProductID, buyProduct]
  );

  return (
    <ProductContext.Provider value={api}>
      {props.children}
    </ProductContext.Provider>
  );
}

export const useProductContext = () => useContext(ProductContext);
