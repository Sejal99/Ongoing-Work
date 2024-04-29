import express from "express";
import { Product } from "../models/product.js";
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const searchTerm = req.query.search;
    console.log(searchTerm);
    //sorting
    const sortParam = req.query.sortBy; 
    // Define a base query to find products
    let query = {};

    // If a search term is provided, modify the query to search for products
    if (searchTerm) {
      query = {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
        ],
      };
    }


    let sort = {};
    if (sortParam) {
      sort[sortParam] = 1; // Sorting in ascending order, change to -1 for descending order
    }




    const products = await Product.find(query).sort(sort);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});

export default productRouter;
