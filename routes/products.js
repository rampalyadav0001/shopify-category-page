import express from "express";
import { shopify, session } from "../config/shopify.js";

const router = express.Router();

// get all products
router.get("/", async (req, res) => {
  try {
    const products = await shopify.rest.Product.all({ session });
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Failed to fetch products", Message: error });
  }
});

// get product by id
router.get("/:id", async (req, res) => {
   try {
    const product = await shopify.rest.Product.find({
      session,
      id: req.params.id,
    });
    res.status(200).json(product);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "failed to fetch product", Message: error });
  }
});

// create product
router.post("/", async (req, res) => {
  try {
    const product = new shopify.rest.Product({ session });
    product.title = req.body.title || "Burton Custom Freestyle 151";
    product.body_html =
      req.body.body_html || "<strong>Good snowboard!</strong>";
    product.vendor = req.body.vendor || "Burton";
    product.product_type = req.body.product_type || "Snowboard";
    product.status = req.body.status || "draft";
    await product.save({ update: true });
    res.status(200).json(product);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "failed to create product", Message: error });
  }
});

// update product
router.put("/:id", async (req, res) => {
  try {
    const product = await shopify.rest.Product.find({
      session,
      id: req.params.id,
    });
    product.title = req.body.title || product.title;
    product.body_html = req.body.body_html || product.body_html;
    product.vendor = req.body.vendor || product.vendor;
    product.product_type = req.body.product_type || product.product_type;
    product.status = req.body.status || product.status;
    await product.save({ update: true });
    res.status(200).json(product);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ error: "failed to update product data", Message: error });
  }
});

// delete product
router.delete("/:id", async (req, res) => {
  try {
    await shopify.rest.Product.delete({ session, id: req.params.id });
    res.status(204).send("Product deleted Scessfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "failed to delete product", Message: error });
  }
});

export default router;
