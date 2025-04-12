// Description: This file contains the logic for the user routes.
// It contains the logic for creating a user, fetching a user, fetching all users, updating a user, and deleting a user.
// The functions are exported and used in the userRoute.js file.





// Import the necessary modules
const User = require("../models/userModel")
const asyncHandler = require('express-async-handler');
const  { generateToken } = require("../config/jwtToken")
const validateMangoDbId  = require("../utils/validatemangodbid")
const { generateRefreshToken } = require("../config/refreshToken")
const jwt = require('jsonwebtoken');
const { json } = require("body-parser");
const { sendEmail } = require("./emailCtrl");
const crypto = require("crypto");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");


// Create a new user
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    // Check if user already exists
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        // Create new user if not found
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        // Throw error if user already exists
        throw new Error("User already exists");
    }
});




// Login user controller
const loginUserControl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Find user by email
    const findUser = await User.findOne({ email });
    // Check if user exists and password matches
    if (findUser && (await findUser.isPasswordMatched(password))) {
        // Generate refresh token
        const refreshToken = generateRefreshToken(findUser._id);
        // Update user with refresh token
        const updateduser = await User.findByIdAndUpdate(findUser.id, { refreshToken: refreshToken }, { new: true });
        // Set refresh token in cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        // Respond with user details and access token
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        });
    } else {
        // Throw error if credentials are invalid
        throw new Error("Invalid Credentials");
    }
});



// Login admin-user
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Find user by email
    const findAdmin = await User.findOne({ email });
    // Check if user is an admin
    if(findAdmin.role !== "admin") {throw new Error("Not Authorized");}
    // Check if user exists and password matches
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        // Generate refresh token
        const refreshToken = generateRefreshToken(findAdmin._id);
        // Update user with refresh token
        const updateduser = await User.findByIdAndUpdate(findAdmin.id, { refreshToken: refreshToken }, { new: true });
        // Set refresh token in cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        // Respond with user details and access token
        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id)
        });
    } else {
        // Throw error if credentials are invalid
        throw new Error("Invalid Credentials");
    }
});














const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {throw new Error("No Refresh Token in Cookies")};
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshtoken: refreshToken  });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); // forbidden
    }
    await User.findOneAndUpdate(refreshToken, {
      refreshToken: "",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204); // forbidden
});




const handleRefreshToken = asyncHandler(async (req, res) => {
    // Get cookies from request
    const cookie = req.cookies;
    // Check if refresh token exists in cookies
    if (!cookie?.refreshToken) {
        throw new Error("No refreshToken in cookie found");
    }
    const refreshToken = cookie.refreshToken;
    // Find user by refresh token
    const user = await User.findOne({ refreshToken });

    // Check if user exists
    if (!user) {
        throw new Error("No refresh token present in DB or Invalid Token");
    }

    // Verify refresh token
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        // Check for errors or invalid token
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with the refresh token");
        }
        // Generate new access token
        const accessToken = generateToken(user?._id);
        // Respond with new access token
        res.json({ accessToken });
    });
});






const getalluser = asyncHandler(async(req,res) => {

    try {
        const getUsers = await User.find()
        res.json(getUsers)
    }
    catch (error) {
        throw new Error(error)
    }

})

//get a user 

const getaUser = asyncHandler(async(req,res) =>{

    const {id} = req.params
    validateMangoDbId(id)
    try{
        const getUser = await User.findById(id)
        res.json(getUser)
    }
    catch (error) {
        throw new Error(error)
    }
})

const updateduser = asyncHandler(async(req,res) => {

    try {
        const {_id} = req.user
        validateMangoDbId(_id)
        const updateduser = await User.findByIdAndUpdate(_id,{
        firstname : req.body?.firstname,
        lastname : req.body?.lastname,
        mobile : req.body?.mobile,
        email : req.body?.email,
        }, { new: true }
        )
        res.json(updateduser)
    }
    catch (error) {
        throw new Error(error)
    }

})



// Save Address
const saveAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMangoDbId(_id);
    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { address: req.body.address },
            { new: true }
        );
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});














const deleteaUser = asyncHandler(async(req,res) =>{

    const {id} = req.params
    validateMangoDbId(id)
    try{
        const deleteaUser = await User.findByIdAndDelete(id)
        res.json(deleteaUser)
    }
    catch (error) {
        throw new Error(error)
    }
})


const blockUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMangoDbId(id)
    try {
        const block = await User.findByIdAndUpdate(id, {isBloked: true},{new: true});
        res.json({message: 'User is blocked'});
    } catch (error) {
        throw new Error(error);
    }
})


const  unblockUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMangoDbId(id)
    try {
        const unblock = await User.findByIdAndUpdate(id, {isBloked: false},{new: true});
        res.json({message: 'User is unblocked'});
    } catch (error) {
        throw new Error(error);
    }
})


// -----------------------------------------------------

const updatepassword = asyncHandler(async (req, res, next) => {
    const {_id} = req.user;
    const {password } = req.body;
    validateMangoDbId(_id)
    const user = await User.findById(_id);


    if(password){
        user.password = password;
        const updatedpassword = await user.save();
        res.json(updatedpassword);

    }
    else{
        res,json(user)
    }

})



// Forget Password Token
const forgetPasswordToken = asyncHandler(async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        throw new Error('User not found');
    }
    try {
//    const token = await user.createPasswordResetToken();
const { resettoken: token, passwordResetToken : hashedToken, passwordResetExpire: passwordResetExpire} = await user.createPasswordResetToken();
    await user.save();
    const resetUrl = `Hi, You have requested to reset your password. Please click on the link below to reset your password. This link will expire in 10 minutes from now <a href=http://localhost:5000/api/user/reset-password/${token}>Reset Password</a>`;
    const data = {
        to: email,
        text : 'You have requested to reset your password',
        subject: 'Password Reset Request',
        html: resetUrl
    };
    sendEmail(data);
    const date = Date.now();
    res.json({ token, hashedToken,passwordResetExpire, date });
    }
    catch (error) {
        throw new Error(error);
    }
})


// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");   
    

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpire: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).json({ message: "Token expired. Please request a new password reset link." });
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.json(user);
});


const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMangoDbId(_id);
    try {
        const findUser = await User.findById(_id)
        res.json(findUser);
    } catch (error) {
        throw new Error(error);
    }
});



// ADD to User Cart
const userCart = asyncHandler(async (req, res) => {
    // Get the cart from the request body
    const { cart } = req.body;
    // Get the user id from the request user
    const { _id } = req.user;
    // Validate the MongoDB Id
    validateMangoDbId(_id);
    try {
      // Create an empty array for products
      let products = [];
      // Find the user by its id
      const user = await User.findById(_id);
      // Check if cart with logged in user id contains products
      const alreadyExistCart = await Cart.findOne({ orderedBy: user._id });
      // If there is an existing cart, remove it
      if (alreadyExistCart) {
        alreadyExistCart.remove();
      }
      // Loop through the cart items
      for (let i = 0; i < cart.length; i++) {
        // Create an empty object
        let object = {};
        // Add the product id to the object
        object.product = cart[i]._id;
        // Add the count to the object
        object.count = cart[i].count;
        // Add the color to the object
        object.color = cart[i].color;
        // Get the price of the product
        let { price } = await Product.findById(cart[i]._id)
          .select("price")
          .exec();
        // Add the price to the object
        object.price = price;
        // Push the object to the products array
        products.push(object);
      }
      // Calculate the total of the cart
      let cartTotal = 0;
      for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count;
      }
      // Create a new cart with the products, total and user id
      let newCart = await new Cart({
        products,
        cartTotal,
        orderedBy: user._id,
      }).save();
      // Return a success response
      res.status(200).json({
        status: "success",
        message: "Cart added successfully",
        newCart,
      });
    } catch (error) {
      // Throw an error if something goes wrong
      throw new Error(error);
    }
  });
  







  // Get user cart
  const getUserCart = asyncHandler(async (req, res) => {
    // Get the user id from the request
    const { _id } = req.user;
  
    // Validate the MongoDB Id
    validateMangoDbId(_id);
  
    try {
      // Find the cart associated with the user and populate the product details
      const cart = await Cart.findOne({ orderedBy: _id })
  
      // Return the response with the cart details
      res.status(200).json({
        status: "success",
        message: "User cart fetched successfully",
        cart,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  






// Export the functions
module.exports = {createUser, loginUserControl , getalluser, getaUser, deleteaUser, 
    updateduser , blockUser , unblockUser , handleRefreshToken , logout, updatepassword , forgetPasswordToken , resetPassword, loginAdmin
    , getWishlist, saveAddress, userCart, getUserCart}