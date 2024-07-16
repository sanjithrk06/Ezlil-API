const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(reqData) {
    let category = await Category.findOne({name : reqData.category});

    if(!category) {
        throw new Error("Category not found with the name "+ reqData.category);
    }

    const discountPrice = reqData.price * (reqData.discountPersent / 100);

    const product = new Product({
        title: reqData.title,
        description: reqData.description,
        price: reqData.price,
        discountedPrice: discountPrice,
        discountPersent: reqData.discountPersent,
        quantity: reqData.quantity,
        brand: reqData.brand,
        imageUrl: reqData.imageUrl,
        category: category._id,
        weight: reqData.weight,
        manufacturer: reqData.manufacturer
    })

    await product.save();

    const populatedProduct = await Product.findById(product._id).populate('category', 'name').exec();

    const result = {
        ...populatedProduct.toObject(),
        category: populatedProduct.category.name
    };

    return result;
}

async function deleteProduct(productId) {
    const product = await findProductById(productId);

    await Product.findByIdAndDelete(productId);
    return "Product deleted successfully";
}

async function updateProduct(productId, reqData) {
    console.log(productId);
    await Product.findByIdAndUpdate(productId, reqData);
    const product = await Product.findById(productId);

    return product;
}

async function findProductById(id) {
    const product = await Product.findById(id).populate("category").exec();

    if(!product){
        throw new Error("Product not found with id "+ id);
    }

    return product;
}

async function getAllProducts() {
    const products = await Product.find().populate("category");

    if(!products) {
        products = [];
    }
    
    return products;
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProducts
}