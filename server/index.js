import bodyParser from "body-parser";
import express from "express";
import Stripe from "stripe";

const stripe = Stripe(
  "sk_test_51KfKzPDyw6addEXMPLzdd4nHIY45F2hrSmVjzOPw5xeo50KXJBsWqaEy5AyCw57UW2Y376hYakc5XxcBFF9DeunG00piKc3s6u"
);

const app = express();
const port = 3000;

app.con;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

app.get("/get-products", async (req, res) => {
  try {
    const products = await stripe.products.list({ limit: 5 });
    console.log(products);
    res.json({ products: products });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

app.get("/get-prices", async (req, res) => {
  try {
    const prices = await stripe.prices.list({ limit: 5 });
    console.log(prices);
    res.json({ prices: prices });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

const calculateOrderAmount = async (id) => {
  const prices = await stripe.prices.list({ limit: 5 });
  // console.log(prices);
  let total = 0;
  prices.data.map((price) => {
    if (price.product === id) total += price.unit_amount;
  });
  return total;
};

app.post("/create-payment-intent", async (req, res) => {
  console.log(req.body);
  const { id } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: await calculateOrderAmount(id),
    currency: "eur",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
