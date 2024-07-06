const categoryService = require("../services/category.service");

const createCategory = async(req, res) => {
    const {name} = req.body;
    try {
        const category = await categoryService.createCategory(name);

        return res.status(200).send(category);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const updateCategory = async(req, res) => {
    const {categoryId, name} = req.body;

    try {
        const updateCategory = await categoryService.updateCategory(categoryId, name);

        return res.status(200).send(updateCategory);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const deleteCategory = async(req, res)=> {
    const { categoryId } = req.body;
    try {
        const deleteCategory = await categoryService.deleteCategory(categoryId);

        return res.status(200).send(deleteCategory);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const getAllCategory = async(req, res)=> {
    try {
        const categories = await categoryService.getAllCategory();

        return res.status(200).send(categories);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const getCategory = async(req, res)=> {
    const {categoryId} = req.body;
    try {
        const category = await categoryService.getCategory(categoryId);

        return res.status(200).send(category);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    getCategory
}