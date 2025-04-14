# ecommerce-backend-api


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
- [Project Structure](#-project-structure)
- [Error Handling](#-error-handling)
- [Security](#-security)
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

Create a `.env` file in the root and add:

```env
PORT=5000
MONGODB_URL=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🧪 Available Scripts

```bash
# Start the server
npm start

# Development with live reloading
npm run dev

# Run tests
npm test
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

## 🧱 Project Structure

```
.
├── config/
│   ├── dbConnect.js         # MongoDB connection setup
│   ├── jwtToken.js          # JWT generator
│   └── refreshToken.js      # Refresh token generator
│
├── middlewares/
│   ├── authmiddleware.js    # Auth and Admin guards
│   └── errorHandler.js      # Central error handling
│
├── routes/
│   ├── userRoute.js         # User-related routes
│   └── ...                  # Other route files
│
├── index.js                 # Entry point
├── swagger.js               # Swagger configuration
├── .env                     # Environment variables
└── package.json
```

---

## ❌ Error Handling

Handled centrally in `middlewares/errorHandler.js`:
- `notFound` middleware catches unknown routes
- `errorHandler` handles runtime exceptions with status codes and stack traces

---

## 🔒 Security Tips

- Do **not** commit `.env` or secrets to source control
- Use HTTPS in production
- Rotate JWT secrets periodically
- Implement rate limiting & validation (recommended for production)

---

## 📄 License

This project is licensed under the MIT License.

---

> Developed with ❤️ using Node.js + Express
