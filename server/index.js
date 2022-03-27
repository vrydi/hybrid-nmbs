import express from "express";
import Stripe from "stripe";

const stripe = Stripe(
  "sk_test_51KfKzPDyw6addEXMPLzdd4nHIY45F2hrSmVjzOPw5xeo50KXJBsWqaEy5AyCw57UW2Y376hYakc5XxcBFF9DeunG00piKc3s6u"
);

const app = express();
const port = 3000;

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
