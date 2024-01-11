const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product= require('./model/Product')

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/Techjet').then((resp)=>{
    console.log(resp+"connected to MongoDB");
}).catch((err)=>{
    console.log("error while connecting to mongoDB");
})
app.use(bodyParser.json());

// TO Get a product
app.get('/api/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const products = await Product.find()
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(products);
});

// to add a product
app.post('/api/products', async (req, res) => {
  const { name, description, price, discount, image } = req.body;

  const newProduct = new Product({ name, description, price, discount, image });
  await newProduct.save();

  res.json(newProduct);
});

//to update a product
app.put('/api/products/:id', async (req, res) => {
  const { name, description, price, discount, image } = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
    name,
    description,
    price,
    discount,
    image,
  }, { new: true });

  res.json(updatedProduct);
});

// To delete a product
app.delete('/api/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted successfully' });
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
