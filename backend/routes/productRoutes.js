import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  console.log('came here 1');
  const products = await Product.find();
  console.log('came here 2');
  res.send(products);
});

productRouter.post(
  '/',
  expressAsyncHandler(async (res, req) => {
    const newProduct = new Product({
      name: 'sample name ' + Date.now(),
      slug: 'sample-name-' + Date.now(),
      image: '/images/p3.jpg',
      price: 0,
      category: 'sample category',
      brand: 'sample brand',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });
    const product = await newProduct.save();
    req.send({
      message: 'Product Created',
      product,
    });
  })
);

export default productRouter;
