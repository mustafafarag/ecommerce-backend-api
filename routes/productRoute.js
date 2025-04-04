// Description: This file contains the routes for the product.
// It contains the routes for creating a product, fetching a product, fetching all products, updating a product, and deleting a product.
// The routes are exported and used in the index.js file.




//Import the necessary modules
const express = require("express");
const router = express.Router();
const {  createProduct,  getProduct, getAllProduct, updateProduct, deleteProduct,addToWishlist } = require("../controller/productCtrl");
const { authmiddleware , isAdmin } = require("../middlewares/authmiddleware");

// Define the routes for the product.
router.post("/", authmiddleware, isAdmin , createProduct); 
router.get("/:id", getProduct); 
router.put("/wishlist", authmiddleware, addToWishlist);
router.get("/", getAllProduct);
router.put("/:id",authmiddleware, isAdmin , updateProduct);
router.delete("/:id",authmiddleware, isAdmin , deleteProduct);


// Export the router object.
module.exports = router;