import express from "express";
import { Product } from "../models/product.js";
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const searchTerm = req.query.search;
    console.log(searchTerm);
    //sorting
    const sortParam = req.query.sortBy; 
    const filterParam=req.query.filerBy;

 // Pagination parameters
 const page = parseInt(req.query.page) || 1; // Current page number, default to 1
 const limit = parseInt(req.query.limit) || 10; // Number of items per page, default to 10

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

 // New: Apply filtering if filterParam is provided
 if (filterParam) {
    // Modify the query to include the filter criteria
    // Example: Filter by price less than or equal to the provided value
    query.price = { $lte: filterParam };
  }

   // Calculate skip value for pagination
   const skip = (page - 1) * limit;

   // Fetch products with pagination
   const products = await Product.find(query).sort(sort).skip(skip).limit(limit);

   res.json({
    products,
    currentPage: page,
    totalPages: Math.ceil(products.length / limit),
  });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});

export default productRouter;
