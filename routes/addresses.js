import express from "express";
import { shopify, session } from "../config/shopify.js";

const router = express.Router();

// get addresses
router.get("/:customer_id/addresses", async (req, res) => {
  try {
    const addresses = await shopify.rest.CustomerAddress.all({
      session,
      customer_id: req.params.customer_id,
    });

    console.log(addresses);
    res.status(200).json(addresses);
  } catch (error) {
    console.error("error", error);
    res
      .status(500)
      .json({ error: "Failed to fetch addresses", Message: error });
  }
});

// create address
router.post("/:customer_id/addresses", async (req, res) => {
  try {
    const customer_address = new shopify.rest.CustomerAddress({
      session: session,
    });
    customer_address.customer_id = req.params.customer_id;
    customer_address.address1 = req.body.address1;
    customer_address.address2 = req.body.address2;
    customer_address.city = req.body.city;
    customer_address.company = req.body.company;
    customer_address.first_name = req.body.first_name;
    customer_address.last_name = req.body.last_name;
    customer_address.phone = req.body.phone;
    customer_address.province = req.body.province;
    customer_address.country = req.body.country;
    await customer_address.save({
      update: true,
    });

    res.status(200).json({ customer_address: customer_address });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      error: "Failed to create customers address",
      Message: error,
    });
  }
});

// update address
router.put("/:customer_id/addresses/:address_id", async (req, res) => {
  try {
    const customer_address = new shopify.rest.CustomerAddress({session: session});
customer_address.customer_id =req.params.customer_id;
customer_address.id =req.params.address_id;
customer_address.address1 = req.body.address1;
customer_address.address2 = req.body.address2;
await customer_address.save({
  update: true,
});
    console.log(customer_address);
    res.status(200).json({ customer_address: customer_address });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ error: "Failed to Update Customer address", Message: error });
  }
});

// delete address
router.delete("/:customer_id/addresses/:addresses_id", async (req, res) => {
  try {
    await shopify.rest.CustomerAddress.delete({
  session: session,
  customer_id: req.params.customer_id,
  id: req.params.addresses_id,
});
    res.status(200).json({ Message: "Customer Address deleted Successfully" });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ error: "Failed to Delete Customer Address", Message: error });
  }
});

export default router;
