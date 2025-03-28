// Description: This file contains the routes for the user.
// It contains the routes for creating a user, fetching a user, fetching all users, updating a user, and deleting a user.
// The routes are exported and used in the index.js file.


//Import the necessary modules
const express = require("express");
const router = express.Router();
const { createUser,loginUserControl , getalluser, getaUser, deleteaUser,updateduser, blockUser , unblockUser , handleRefreshToken , logout ,updatepassword , forgetPasswordToken, resetPassword} = require("../controller/userCtrl");
const { authmiddleware , isAdmin } = require("../middlewares/authmiddleware");



// Define the routes for the user.
router.post("/register", createUser);
router.post("/forget-password-token",forgetPasswordToken );
router.put("/reset-password/:token",resetPassword);
router.put("/password",authmiddleware, updatepassword)
router.post("/login", loginUserControl);
router.get("/all-users" , getalluser)
router.get("/refresh" , handleRefreshToken) 
router.get("/logout" , logout)
router.get("/:id" , authmiddleware, isAdmin, getaUser)
router.delete("/:id" , deleteaUser)
router.put("/edit-user" , updateduser)
router.put("/block-user/:id" ,authmiddleware, isAdmin, blockUser)
router.put("/unblock-user/:id" ,authmiddleware, isAdmin, unblockUser)


// Handle undefined routes
router.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});


router.post("/login", (req, res) => {});



// Export the router object.
module.exports = router;