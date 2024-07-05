const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(reqData) {
    let topLevel = await Category.findOne({name: reqData.topLevelCategory})

    if(!topLevel) {
        topLevel = new Category({
            name: reqData.topLevelCategory,
            level: 1
        })
    }

    let secondLevel = await Category.findOne({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id
    })

    if(!secondLevel) {
        secondLevel = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2
        })
    }

    const product = new Product({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: reqData.discountedPrice,
        discountPresent: reqData.discountPresent,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price: reqData.price,
        quantity: reqData.quantity,
        category: secondLevel._id
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