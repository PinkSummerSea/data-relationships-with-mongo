const mongoose = require('mongoose');
const Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost:27017/mongo-relationships', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Mongo Connection Open")
})
.catch(err => {
    console.log("Oh No. Mongo Connection Error.")
    console.log(err)
})

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     {name: 'Goddness Melon', price: 5, season: 'Summer'},
//     {name: 'Sugar Baby Watermelon', price: 6, season: 'Summer'},
//     {name: 'Asparagus', price: 4, season: 'Spring'},
// ])

// const makeFarm = async () => {
//     const farm = new Farm({ name: 'Full Belly Farms', city: 'Guinda, CA'});
//     const melon = await Product.findOne({name: 'Goddness Melon'});
//     farm.products.push(melon);
//     await farm.save()
// }

// makeFarm()

// const addProduct = async(farmName) => {
//     const farm = await Farm.findOne({name: farmName});
//     const product = await Product.findOne({name: 'Sugar Baby Watermelon'});
//     farm.products.push(product);
//     await farm.save();
// }

// addProduct("Full Belly Farms")

Farm.findOne({name: 'Full Belly Farms'})
.populate('products')
.then(farm => console.log(farm))