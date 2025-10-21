import mongoose, { mongo, Mongoose } from "mongoose";
import { type } from "os";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: Array, required: true},
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    sizes: { type: Array, required: true},
    bestseller: {type: Boolean},
    createdAt: {type: Number, required: true}
});

const productModel = mongoose.models.product || Mongoose.model('product', productSchema);


export default productModel;