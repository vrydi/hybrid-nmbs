import express from "express";
import { STRIPE_PUBLISHABLE_KEY } from "@env";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
