import express from "express";
import { shopify, session } from "../config/shopify.js";

const router = express.Router();

// get customers
router.get("/", async (req, res) => {
  try {
    const customers = await shopify.rest.Customer.all({ session });
    console.log(customers);
    res.status(200).json({ customers: customers });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ error: "Failed to fetch customers", Message: error });
  }
});

// create customer
router.post("/", async (req, res) => {
  try {
    const customer = new shopify.rest.Customer({ session: session });
    customer.first_name = req.body.first_name;
    customer.last_name = req.body.last_name;
    customer.email = req.body.email;
    customer.currency = req.body.currency;

    await customer.save({
      update: true,
    });

    res.status(200).json({ customers: customer });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      error: "Failed to create cusomer customers",
      Message: error,
    });
  }
});

// get customer by id
router.get("/:id", async (req, res) => {
  try {
    const customers = await shopify.rest.Customer.find({
      session,
      id: req.params.id,
    });
    console.log(customers);
    res.status(200).json({ customers: customers });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ error: "Failed to fetch customers", Message: error });
  }
});

// update customer
router.put("/:id", async (req, res) => {
  try {
    const customer = new shopify.rest.Customer({ session: session });
    customer.id = req.params.id;
    customer.email = req.body.email;
    customer.note = req.body.note;
    await customer.save({
      update: true,
    });
    // console.log(discount_code);
    res.status(200).json({ Customer: customer });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ error: "Failed to Update Customer", Message: error });
  }
});

// delete customer
router.delete("/:id", async (req, res) => {
  try {
    await shopify.rest.Customer.delete({
      session: session,
      id: req.params.id,
    });
    res.status(200).json({ Message: "Customer deleted Successfully" });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ error: "Failed to Delete Customer", Message: error });
  }
});

export default router;
