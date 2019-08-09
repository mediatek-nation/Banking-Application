/*
 * Product insert
 * Matching id to id and update
 * Matching id to id and delete
 * Search product for name
 * Get product details by id
 */
const express = require("express");
const router = express.Router();

//Load models
const Product = require("../../../models/Product");
//@route  GET api/auth/product
//@dscn   Admin can test product route
//@access Private
router.get("/test", (req, res) => res.json({ msg: "Product work" }));

//@route  POST api/auth/product/regProduct
//@dscn   Admin can register product 
//@access Private
router.post("/regProduct", (req, res) => {
  // Create a new product
  const product = {
    productTitle: req.body.productTitle,
    productDescription: req.body.productDescription,
    productCreditPoint: req.body.productCreditPoint
  };
  const newProduct = new Product(product);
  newProduct
    .save()
    .then(product => res.json({ msg: "Product create successfully register" }));
});

//@route  POST api/auth/product/regProduct/:id
//@dscn   Admin can update register product
//@access Private
router.post("/regProduct/:id", (req, res) => {
  // Update product
  const product = {
    productTitle: req.body.productTitle,
    productDescription: req.body.productDescription,
    productCreditPoint: req.body.productCreditPoint
  };
  
  Product
    .findOneAndUpdate({ _id: req.params.id }, { $set: product }, { new: true })
    .then(product => res.json(product));
});

//@route  GET api/auth/product/delete/:id
//@dscn   Admin can delete product 
//@access Private
router.get('/delete/:id',(req, res) => {
  // Delete product modules
  Product.deleteOne({_id: req.params.id}).then(data => res.json({msg: 'Product successfully deleted..!'}));
});

//@route  GET api/auth/product/search/:productTitle
//@dscn   Admin can search product name
//@access Private
router.get('/search/:productTitle', (req, res) => {
  Product.find({ productTitle: new RegExp(req.params.search, "i") }).then(productName => res.json(productName));
});

//@route  GET api/auth/product/search/:id
//@dscn   Admin can search product details by id 
//@access Private
router.get('/search/:id', (req, res) => {
  Product.find({ productTitle: new RegExp(req.params.search, "i") }).then(productName => res.json(productName));
});

module.exports = router;



/*router.get("/allunit/:searchUnit", passport.authenticate("jwt", { session: false }), (req, res) => {
  const search = req.params.searchUnit;
  //console.log(search);
  AddUnit.find({
    unitName: new RegExp(search, "i"),
    $and: [{ $or: [{ companyId: req.user.companyId }, { companyId: "0" }] }]
  }).then(AddUnit => res.json(AddUnit));
});*/