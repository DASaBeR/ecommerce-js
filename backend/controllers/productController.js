import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import mongoose from "mongoose";

const read = async (req, res) => {
  try {
    const products = await productModel.find({});

    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const details = async (req, res) => {
  
  try {
    const {id} = req.params;
    
    const product = await productModel.findById(id);

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

};

const create = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (image) => image !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name: name,
      description: description,
      price: price,
      bestseller: bestseller === "true" ? true : false,
      category: category,
      subCategory: subCategory,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      createdAt: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, productId: product._id });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {

  
};

const remove = async (req, res) => {
  try {

    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Valid product ID is required" 
      });
    }

    const deletedProduct = await productModel.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Product deleted successfully",
      data: { id: deletedProduct._id }
    });
    
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

export { read, details, create, update, remove };
