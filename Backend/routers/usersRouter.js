const { User } = require ("../models/userSchema");
const express = require ("express");
const router = express.Router();
const bcrypt = require ("bcryptjs");
const jwt = require ("jsonwebtoken");

//get all users
router.get("/", async (req, res) => {
    const userList = await User.find().select("-passwordHash");
    
    if(!userList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(userList);
})

//get single user
router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id).select("-passwordHash");
    
    if(!user) {
        res.status(500).json({
            success: false
        })
    }
    res.send(user);
})


//login 
router.post("/login", async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    const secret = process.env.SECRET
    if(!user){
        return res.status(404).json({
            success: false,
            message:"The user not found"
        })
    }
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        const token = jwt.sign(
        {
            userId: user.id,
            isAdmin: user.isAdmin
        }, secret, {expiresIn: "2d"})

        res.status(201).json({
            success: true,
            // userId: user.id,
            user: user,
            token: token
        });
    }else{
        res.status(400).json({
            success: false,
            message: "email or password is wrong"
        })
        
    } 
})

//register
router.post("/register", async (req, res) => {

    const secret = process.env.SECRET;
    const { name, email, password, phone, street, landmark, pin, city, country } = req.body;

    if (!name || !email || !password || !phone || !street || ! landmark || ! pin || ! city || ! country ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existUser = await User.findOne({email});

    if(existUser) {
        res.status(401).send("User Already Exists");
    }

    let user = new User({
        name,
        email,
        passwordHash: bcrypt.hashSync(password, 10),
        phone,
        street,
        landmark,
        pin,
        city,
        country
    })

    if(user) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            }, secret, {expiresIn: "2d"})

            user = await user.save();

            res.status(201).json({
                success: true,
                message: "user created successfully",
                user: user,
                token: token
            })
    }else{
        return res.status(404).send("user canot be created")
    }
    
})

//delete user
router.delete("/:id", async (req, res) => {
    User.findByIdAndDelete(req.params.id).then(user => {
        if(user) {
            return res.status(201).json({
                success: true,
                message: "user deleted successfully"
            })
        }else{
            return res.status(404).json({
                success: true,
                message: "user not found"
            })
        }
    }).catch(err => {
        return res.status(500).json({
            success: false,
             error: err.message
            })
    })
})


//user count
router.get("/get/count", async(req, res) => {
    const userCount = await User.countDocuments((count) => count)

    if(!userCount) {
        res.status(500).json({
            success: false
        })
    }
    res.send({
        userCount: userCount
    });
});

module.exports = router;