# 🛒 Ecommerce Backend API

This is a **Node.js + Express** backend server for an eCommerce platform. It supports user authentication using JWT, role-based access (admin vs. user), and provides Swagger API documentation.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Authentication](#-authentication)
- [API Documentation](#-api-documentation)
- [License](#-license)

---

## ✨ Features

- User authentication with JWT
- Role-based access control (Admin/User)
- RESTful API structure
- MongoDB integration via Mongoose
- Centralized error handling
- Swagger documentation
- Modular structure for scalability

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

## 🔐 Authentication

This app uses JWT-based authentication with middleware logic:

- **Access Token**: expires in `3d`
- **Refresh Token**: expires in `1d`
- Middleware:
  - `authmiddleware` verifies JWT and attaches user to `req.user`
  - `isAdmin` ensures the user has an `admin` role

---

## 📚 API Documentation (Swagger)

Swagger UI is hosted at:

```
http://localhost:5000/api-docs
```

You can inspect routes, request/response structures, and try endpoints directly.

Swagger is configured in [`swagger.js`](swagger.js)

---

## 📄 License

This project is licensed under the MIT License.

---

> Developed with ❤️ using Node.js + Express
