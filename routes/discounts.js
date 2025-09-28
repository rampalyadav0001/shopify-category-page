import express from "express";
import { shopify, session } from "../config/shopify.js";

const router = express.Router();

// get price-rule
router.get("/price-rule", async (req, res) => {
  try {
    const priceRule = await shopify.rest.PriceRule.all({ session });
    res.status(200).json({ priceRule: priceRule.data });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ error: "Failed to fetch Price-Rule", Message: error });
  }
});

// get discounts by price_rule_id
router.get("/discounts/:price_rule_id", async (req, res) => {
  try {
    const Discounts = await shopify.rest.DiscountCode.all({
      session,
      price_rule_id: req.params.price_rule_id,
    });
    res.status(200).json({ Discountscode: Discounts.data });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ error: "Failed to fetch Discounts", Message: error });
  }
});
// get discounts by discount_id
router.get("/discounts/:price_rule_id/:discount_id", async (req, res) => {
  try {
    const Discounts = await shopify.rest.DiscountCode.find({
      session,
      price_rule_id: req.params.price_rule_id,
      id:req.params.discount_id
    });
    // console.log(Discounts)
    res.status(200).json({ Discountscode: Discounts });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ error: "Failed to fetch Discounts", Message: error });
  }
});

// create discount
router.post("/discounts/:price_rule_id", async (req, res) => {
  try {
    const discount_code = new shopify.rest.DiscountCode({ session: session });
    discount_code.price_rule_id = req.params.price_rule_id;
    discount_code.code = req.body.code;
    await discount_code.save({
      update: true,
    });
    res.status(200).json({ Discountscode: discount_code });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Failed to Add Discounts", Message: error });
  }
});

// update discount
router.put("/discounts/:price_rule_id/:discount_id", async (req, res) => {
  try {
    const discount_code = new shopify.rest.DiscountCode({ session: session });
    discount_code.price_rule_id = req.params.price_rule_id;
    discount_code.id = req.params.discount_id;
    discount_code.code = req.body.code;
    await discount_code.save({
      update: true,
    });
    // console.log(discount_code);
    res.status(200).json({ Discountscode: discount_code });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ error: "Failed to Update Discounts", Message: error });
  }
});

// delete discount
router.delete("/discounts/:price_rule_id/:discount_id", async (req, res) => {
  try {
    await shopify.rest.DiscountCode.delete({
      session: session,
      price_rule_id: req.params.price_rule_id,
      id: req.params.discount_id,
    });
    res.status(200).json({ Message: "Discount Coupon deleted Successfully" });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ error: "Failed to Delete Discounts", Message: error });
  }
});

export default router;
