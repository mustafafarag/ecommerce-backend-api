// Description: This file is the entry point of the application. 
// It connects to the database and starts the server. It also uses the middlewares and routes.   


// Importing the required modules
const express = require ("express")
const dbConnect = require("./config/dbConnect")
const app = express()
const dotenv = require ("dotenv").config()
const PORT = process.env.PORT || 4000
const authRouter = require("./routes/authRoute")
const bodyParser = require("body-parser")
const {notFound, errorHandler} = require("./middlewares/errorHandler")
const cookieParser = require("cookie-parser")
const productRouter = require("./routes/productRoute");
const morgan = require("morgan");


// Using the middlewares and routes
app.use(cookieParser())
dbConnect()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan("dev")); 

app.use("/api/user", authRouter)
app.use("/api/product", productRouter); 
app.use(notFound)
app.use(errorHandler)

// Starting the server
app.listen(PORT, ()=>
    console.log(`App is running on PORT ${PORT}`)
)



