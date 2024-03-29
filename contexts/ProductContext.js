import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Constants from "expo-constants";
import { useConfirmPayment } from "@stripe/stripe-react-native";
const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

const ProductContext = createContext();

export function ProductProvider(props) {
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [selectedProductID, setSelectedProductID] = useState();
  const [clientSecret, setClientSecret] = useState();
  const [paymentProgress, setPaymentProgress] = useState({
    status: "",
    message: "",
  });

  const [tickets, setTickets] = useState([]);

  const { confirmPayment } = useConfirmPayment();

  useEffect(() => {
    async function fetchProducts() {
      console.log("fetching products");
      const data = await (await fetch(`${uri}/get-products`)).json();
      const data2 = await (await fetch(`${uri}/get-prices`)).json();
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

  const processPayment = async (data) => {
    console.log("processing payment");
    setPaymentProgress({ status: "started", message: "" });
    const billingdetails = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      type: "Card",
      billingDetails: billingdetails,
    });

    if (error) {
      setPaymentProgress({ status: "failed", message: error.message });
    } else if (paymentIntent) {
      setPaymentProgress({ status: "success", message: "Payment successful" });
      setTickets([
        ...tickets,
        {
          ...paymentIntent,
          product: products.filter(
            (product) => product.id == selectedProductID
          )[0],
        },
      ]);
      setSelectedProductID(undefined);
    } else {
      setPaymentProgress({
        status: "failed",
        message: "no payment intent response",
      });
    }
  };

  const api = useMemo(
    () => ({
      products,
      prices,
      selectedProductID,
      setSelectedProductID,
      buyProduct,
      paymentProgress,
      processPayment,
      tickets,
      setPaymentProgress,
    }),
    [
      products,
      prices,
      selectedProductID,
      setSelectedProductID,
      buyProduct,
      paymentProgress,
      processPayment,
      tickets,
      setPaymentProgress,
    ]
  );

  return (
    <ProductContext.Provider value={api}>
      {props.children}
    </ProductContext.Provider>
  );
}

export const useProductContext = () => useContext(ProductContext);
