import express from "express"
import { shopify, session } from "../config/shopify.js";

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const collection = await shopify.rest.CustomCollection.all({
            session: session,
        });
        res.status(200).json({...collection.data,"type":"custom_collection"});
    } catch (error) {
        console.error("error", error);
        res
            .status(500)
            .json({ error: "Failed to fetch collection", Message: error });
    }
})

router.get("/smart_collection", async (req, res) => {
    try {
        const smart_collection = await shopify.rest.SmartCollection.all({
            session: session,
        });
        res.status(200).json({...smart_collection.data,"type":"smart_collection"})
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            error: "Failed to fetch smartCollection", Message: error
        })
    }
})

router.get("/products/:collection_id",async(req,res)=>{
     try{
         const products = await shopify.rest.Collection.products({
  session: session,
  id: req.params.collection_id,
});
        res.status(200).json(products)
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            error: "Failed to fetch products", Message: error
        })
    }
})


export default router;