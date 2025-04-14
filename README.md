# 🛒 Ecommerce Backend API

This is a **Node.js + Express** backend server for a modern eCommerce platform, designed with modularity, scalability, and real-world business logic in mind.

---

## 📚 Table of Contents

- [Tech Stack](#-tech-stack)
- [Dependencies](#-dependencies)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Core Features Overview](#-core-features-overview)
- [API Documentation](#-api-documentation)

---

## 🧰 Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT for authentication
- dotenv for environment variables
- express-async-handler for clean async routes
- Swagger for API docs

---

## 🧱 Dependencies

To run this backend application locally, make sure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **MongoDB** (local or hosted instance like MongoDB Atlas)
- **Cloudinary Account** (for image uploads)
- **Email Service Provider** (e.g., Gmail app password for sending emails)

Optional but useful:

- **nodemon** (for development hot reload)


## 📦 Installation

```bash
git clone https://github.com/your-username/ecommerce.git
cd ecommerce
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following:

```env
# Server Config
PORT=5000
MONGODB_URL=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_jwt_secret_key

# Email Configuration (for services like Nodemailer)
MAIL_ID=your_email@example.com
MP=your_app_password

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> ⚠️ Never commit this file to GitHub. It should remain private and be listed in `.gitignore`.

---

## 🧪 Available Scripts

```bash
# Start the application
npm start

# Run the server in development mode using nodemon
npm run server
```

---

## 📦 Core Features Overview

A breakdown of the core business logic organized by each controller in the ecommerce backend.

---

### 👤 **User Controller**

Handles all aspects of user account management and authentication:

- User registration, login, and admin authentication
- Refresh token logic for persistent sessions
- Password recovery and reset workflows
- Profile update and password change for authenticated users
- User blocking/unblocking by admin
- Wishlist and address management
- Shopping cart functionality (add, update, retrieve)
- Logout and session clearing

---

### 🛍️ **Product Controller**

Manages the full product lifecycle and media uploads:

- Creation, retrieval, updating, and deletion of products
- Filtering,sorting and pagination of product listings
- Image uploads using Cloudinary

---

### 🗂️ **Product Category Controller**

Supports the categorization of products:

- Management of product categories including creation, retrieve (single and all), editing, and deletion

---

### 🏷️ **Brand Controller**

Handles brand-related metadata:

- Management of brand Create, retrieve (single and all), update, and delete product brands

---

### 🎟️ **Coupon Controller**

Implements logic for promotional discounts:

- Creating and maintaining discount coupons

---

### ✍️ **Blog Controller**

Powers the content publishing system:

- Creating, editing, and deleting blog posts
- Blog engagement features like likes and dislikes
- Uploading blog images via Cloudinary

---

### 🧾 **Blog Category Controller**

Maintains classification for blog content:

- Manage categories associated with blog posts

---

### 📧 **Email Controller**

Facilitates outbound email communication:

- Sending transactional emails (e.g., password reset, verification)


## 📚 API Documentation (Swagger)

Swagger UI is hosted at:

```
http://localhost:5000/api-docs
```

You can inspect routes, request/response structures, and try endpoints directly.

Swagger is configured in [`swagger.js`](swagger.js)

---
