const express = require ("express");
const app = express();
const morgan = require ("morgan")
const cors = require ("cors")
const connectToDB = require ("./config/database");
const authJwt = require ("./helpers/jwt");
const errorHandler = require ("./helpers/error-handler")
require("dotenv/config");

app.use(cors());
app.options("*", cors());


//middleware 
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);


//routes
const productsRoutes = require("./routers/productRouter")
const userRoutes = require ("./routers/usersRouter")
const orderRoutes = require("./routers/orderRouter");
const cartRoutes = require("./routers/CartRouter")

const api = process.env.API_URL;

app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, userRoutes)
app.use(`${api}/orders`, orderRoutes)
app.use(`${api}/cartItems`, cartRoutes)

//database connection
connectToDB();

module.exports = app;