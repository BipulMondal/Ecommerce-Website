const { Product } = require ("../models/productSchema")
const express = require ("express");
const router = express.Router();
const mongoose = require ("mongoose")
const multer = require ('multer')

const FILE_TYPE_MAP = {
    'image/png': "png",
    'image/jpeg': "jpeg",
    'image/jpg': "jpg"
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error("Invalid Image Type");

        if(isValid){
            uploadError = null;
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
const upload = multer({ storage: storage })


router.get(`/`, async(req, res) => {
    let filter = {};
    if(req.query.categories){
        filter = { category: req.query.categories.split(",")}
    }
    const productList = await Product.find(filter).populate("category");

    if(!productList){
        res.status(500).json({
            success: false
        })
    }
    res.status(201).send(productList)
})

//get single product
router.get("/:id", async(req, res) => {
    const product = await Product.findById(req.params.id).populate("category");

    if(!product){
        res.status(500).json({
            success: false,
            message: "product con not get"
        })
    }
    res.status(201).send(product);
})

//create product
router.post(`/`, upload.array('images', 5), async (req, res) => {
    const files = req.files;
    if(!files || files.length === 0 ){
        return res.status(400).send("No image in the request")
    }

    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    const images = [];
    for(let i=0; i<files.length; i++){
        const fileName = files[i].filename;
        images.push(`${basePath}${fileName}`);
    }

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        images: images,
        company: req.body.company,
        colors: req.body.colors,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        isAppliance: req.body.isAppliance,
        isFootStyle: req.body.isFootStyle,
        isBeauty: req.body.isBeauty,
        isBabyDiscount: req.body.isBabyDiscount,
        star: req.body.star
    })

    product = await product.save();
   
    if(!product){
        return res.status(500).send("The product can not be created")
    }
    res.send(product);
})

//update product
router.put("/:id", async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid Product Id")
    }
   

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            company: req.body.company,
            price: req.body.price,
            colors: req.body.colors,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
            isAppliance: req.body.isAppliance,
            isFootStyle: req.body.isFootStyle,
            isBeauty: req.body.isBeauty,
            isBabyDiscount: req.body.isBabyDiscount,
            star: req.body.star
        },
        {new: true}
    )
 
    if(!product){
        res.status(500).send("The product con not be updated")
    }
    res.send(product)
})

//delete product
router.delete("/:id", async (req, res) => {
    Product.findByIdAndDelete(req.params.id).then(product => {
        if(product) {
            return res.status(201).json({
                success: true,
                message: "product deleted successfully"
            })
        }else{
            return res.status(404).json({
                success: true,
                message: "product not found"
            })
        }
    }).catch(err => {
        return res.status(500).json({
            success: false,
             error: err.message
            })
    })
})


//count product
router.get("/get/count", async(req, res) => {
    const productCount = await Product.countDocuments((count) => count)

    if(!productCount) {
        res.status(500).json({
            success: false
        })
    }
    res.send({
        productCount: productCount
    });
});


router.get(`/get/featured/:count`, async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured : true}).limit(+count);

    if(!products) {
        res.status(500).json({
            success: false
        })
    }
    res.send(products);
})

//update image gallery
router.put('/gallery/:id', upload.array('images', 5), async (req, res) => {

    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid Product Id")
    }
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    let imagesPaths = [];

    const files = req.files
    if(!files) {
        return res.status(400).send("No Images in the request")
    }
    if(files) {
        files.forEach(file => {
            imagesPaths.push(`${basePath}${file.filename}`)
        })
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            images: imagesPaths
        },
        {new: true}
    )

    if(!product) {
        return res.status(500).send('the gallery cannot be updated')
    }

    res.send(product);
})

module.exports = router


  