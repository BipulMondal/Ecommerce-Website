const { Order } = require("../models/orderSchema");
const express = require("express");
const router = express.Router();
const { OrderItem } = require("../models/itemSchema");
const { CartItem } = require("../models/CartSchema");
const { User } = require("../models/userSchema");
const bcrypt = require ("bcryptjs");
const jwt = require ("jsonwebtoken");

//get order
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    if (userId) {
      const orderList = await Order.find({ userId }).populate("user");
      if (orderList.length > 0) {
        res.status(200).json(orderList);
      } else {
        res.status(404).send("No order list found for the specified user");
      }
    }
  } catch (error) {
    res.status(401).send("error");
  }
});

//get single order
router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    });

  if (!order) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(order);
});

//new create order
router.post("/", async (req, res) => {
  const secret = process.env.SECRET

  try {
    let userId = null;
    let user = null;
    let cartItems = null;
    if (req.body.userId) {
      // Get the user ID from the request object
      userId = req.body.userId;
      // If the user ID is present, retrieve the user from the database
      user = await User.findById(userId);
      // Retrieve the items in the user's cart
      cartItems = await CartItem.find({ userId });
      
    } else {
      // If the user ID is not present, retrieve the user data from the request body

      const { name, email, password, phone, street, landmark, pin, city, country } = req.body.user;

      // Check that required fields are present in the request body
      if (!name || !email || !password || !phone || !street || ! landmark || ! pin || ! city || ! country ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existUser = await User.findOne({email});
      if(existUser) {
        return res.status(401).send("User Already Exists")
      }else{
          user = new User({
          name,
          email,
          passwordHash: bcrypt.hashSync(password, 10),
          phone,
          street,
          landmark,
          pin,
          city,
          country,
    })}
      // Save the new user to the database
      user = await user.save();
      // // get userId from DB
      userId = user._id;
    }

    // Check if there are any items in the cartItems array
    if (cartItems && cartItems.length > 0) {
    // If there are items in the cartItems array, use them
    cartItems = cartItems.map((item) => item.toObject());
    } else {
    // If there are no items in the cartItems array, use the items from the request body
    cartItems = req.body.items;
  }

    // Create an order object with the retrieved cart items and total price
    const order = new Order({
      userId: userId,
      user: user,
      items: cartItems,
      // shipping_fee: req.body.shipping_fee,
      // totalPrice: req.body.totalPrice,
    });

    // Save the order to the database
    await order.save();

    // Clear the user's cart by removing all items from the collection
    await CartItem.deleteMany({ userId });

    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin
      },
      secret,
      { expiresIn: "2d" }
    );

    // Return a success message with the created order object
    res.status(201).json({ 
      success: true,
      message: "Order created successfully!",
      order,
      token,
      user : {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        street: user.street,
        landmark: user.landmark,
        pin: user.pin,
        city: user.city,
        country: user.country
      }
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


//update order
router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );
  if (!order) {
    return res.status(404).send("the order canot be updated");
  }
  res.send(order);
});

//delete order and order items
router.delete("/:id", async (req, res) => {
  const orderId = req.params.id;

  try {
    const deleteOrder = await Order.findByIdAndDelete(orderId);

    if(deleteOrder){
      res.status(201).json({
        success: true,
        message: "order deleted successfully"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "order deletation failed"
    })
  }
    
    
   
});

//get total sales
router.get("/get/totalsales", async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null }, totalsales: { $sum: "$totalPrice" } },
  ]);
  if (!totalSales) {
    return res.status(400).send("the order sales can not be generate");
  }

  res.send({ totalsales: totalSales });
});

module.exports = router;
