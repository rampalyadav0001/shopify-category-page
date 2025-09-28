import express from "express";
import { shopify, session } from "../config/shopify.js";

const router = express.Router();

// get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await shopify.rest.Order.all({
      session,
      status: "any",
    });
    // console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Failed to fetch order", Message: error });
  }
});

// create order
router.post("/", async (req, res) => {
  try {
    const order = new shopify.rest.Order({ session });
    order.line_items = req.body.order_line_item;
    order.transactions = req.body.transactions;
    order.email = req.body.email;
    order.currency = req.body.currency;
    await order.save({
      update: true,
    });
    res.status(200).json(order);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "failed to create order", Message: error });
  }
});

// get order by id
router.get("/:id", async (req, res) => {
  try {
    const orders = await shopify.rest.Order.find({
      session,
      id: req.params.id,
      fields: "id,line_items,name,email,total_price",
    });
    res.status(200).json(orders);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "failed to fetch order", Message: error });
  }
});

// update order (only email here)
router.put("/:id", async (req, res) => {
  try {
    const order = new shopify.rest.Order({ session: session });
    order.id = req.params.id;
    order.email = req.body.email;
    await order.save({
      update: true,
    });
    res.status(200).json(order);
  } catch (err) {
    console.log("error", err);
    res
      .status(500)
      .json({ error: "failed to update order email", Message: err });
  }
});

// delete order
router.delete("/:id", async (req, res) => {
  try {
    await shopify.rest.Order.delete({
      session,
      id: req.params.id,
    });
    res
      .status(200)
      .json({ Message: "Order is  deleted Successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Failed to Delete Order", Message: error });
  }
});

export default router;
