const { CartItem } = require ("../models/CartSchema")
const User = require ("../models/userSchema")
const express = require ("express");
const router = express.Router();

//create cart item
router.post("/", async (req, res) => {
    const { userId, productId, name, color, amount, price, image } = req.body;
        try {
            let cartItem = await CartItem.findOne({productId})

        if (cartItem) {
        // If the item is already in the cart, update the quantity and price
        cartItem.amount += amount;
        cartItem.price += price;
        await cartItem.save();

        } else {
        // If the item is not in the cart, create a new item
        const cartItem = new CartItem({
            userId,
            productId,
            name,
            color,
            amount,
            price,
            image
            // subtotal
          });

          await cartItem.save();
        }
       // Save the cart item to the database

        res.status(200).json({
            success: true,
            message: "item add to cart successfully",
            cartItem
        });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
})


//get cart items
router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        if (userId) {
            const cartItems = await CartItem.find({userId}).populate('productId');
            if (cartItems.length > 0) {
                res.status(200).json(cartItems);
            } else {
                res.status(404).send("No cart items found for the specified user");
            }
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
})

//remove single cart item
router.delete("/:productId", async (req, res) => {
    const cartItem = req.query.productId;

    try {
        const deleteCartItem = await CartItem.findOneAndDelete(cartItem);

        if(deleteCartItem) {
            res.status(201).json({
                success: true,
                message: " items deleted successfully"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
})

//remove total cart items
router.delete("/", async (req, res) => {
    try {
        const cartItems = await CartItem.deleteMany();

        if(cartItems) {
            res.status(201).json({
                success: true,
                message: "All Cart Items Deleted"
            })
        }
        res.status(401).json({
            success: false,
            message: "Cart Items Not Deleted"
        })
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router;
