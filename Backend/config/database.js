const mongoose = require ("mongoose");

const connectToDB = () => {
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log(`database conection successfully`)
}).catch((e) => {
    console.log(`db connection failed`)
    console.log(e.message)
})
}

module.exports = connectToDB;