const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(reqData) {
    let category = await Category.findOne({name: reqData.category})

    if(!category) {
        throw new Error("Category not found with the name "+ reqData.category);
    }

    const product = new Product({
        title: reqData.title,
        description: reqData.description,
        price: reqData.price,
        discountedPrice: reqData.discountedPrice,
        discountPresent: reqData.discountPresent,
        quantity: reqData.quantity,
        brand: reqData.brand,
        imageUrl: reqData.imageUrl,
        category: category._id
    })

    return await product.save();
}

async function deleteProduct(productId) {
    const product = await findProductById(productId);

    await Product.findByIdAndDelete(productId);
    return "Product deleted successfully";
}

async function updateProduct(productId, reqData) {
    return await Product.findByIdAndUpdate(productId, reqData);
}

async function findProductById(id) {
    const product = await Product.findById(id).populate("category").exec();

    if(!product){
        throw new Error("Product not found with id "+ id);
    }

    return product;
}

async function getAllProducts(reqQuery) {
    let {category, minPrice, maxPrice, minDiscount, sort, stock, pageNumer, pageSize} = reqQuery;

    let query = Product.find().populate("category");

    if(category){
        const existCategory = await Category.findOne({name: category});
        if(existCategory) {
            query = query.where("category").equals(existCategory._id);
        }else {
            return {content:[], currentPage: 1, totalPage: 0}
        }
    }

    if(minPrice && maxPrice) {
        query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    }

    if(minDiscount) {
        query = query.where("discountedPersent").gt(minDiscount);
    }

    if(stock) {
        if(stock=="in_stock") {
            query = query.where("quantity").gt(0);
        }else if(stock=="out_of_stock") {
            query = query.where("quantity").gt(1);
        }
    }


}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProducts
}