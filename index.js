import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";
import customerRoutes from "./routes/customers.js";
import addressRoutes from "./routes/addresses.js";
import orderRoutes from "./routes/orders.js";
import discountRoutes from "./routes/discounts.js";
import collectionRoutes from './routes/collection.js';
import cors from "cors"

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.use("/products", productRoutes);
app.use("/customers", customerRoutes);
app.use("/customers", addressRoutes); // address routes are nested inside customers
app.use("/orders", orderRoutes);
app.use("/", discountRoutes); // price-rule and discounts
app.use("/collection",collectionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
