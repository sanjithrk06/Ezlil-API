const Category = require("../models/category.model");


async function createCategory(name) {
    try {
        if(!name.trim) {
            throw new Error("Name is required");
        }
    
        const existCategory = await Category.findOne({ name });
    
        if(existCategory) {
            throw new Error("Category Name is already exists");
        }

        const category = await new Category({ name }).save();

        return category;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function updateCategory(name, categoryId) {
    try {
        const category = await Category.findOne({_id: categoryId});

        if(!category) {
            throw new Error("category not found");
        }

        category.name = name;

        const updateCategory = await category.save();

        return updateCategory;

    } catch (error) {
        throw new Error(error.message);
    }
}

async function deleteCategory(categoryId) {
    try {
        const deleteCategory = await Category.findByIdAndDelete(categoryId);

        return deleteCategory;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getAllCategory() {
    try {
        const categories = await Category.find();

        return categories;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getCategory(categoryId) {
    try {
        const category = await Category.findOne({_id: categoryId});

        return category;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    getCategory
}