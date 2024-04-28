import express from 'express';
import {  User } from '../models/product.js';
const productRouter=express.Router();


productRouter.get('/', async (req, res) => {
    try {
        const products = await User.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
  });

  export default productRouter;