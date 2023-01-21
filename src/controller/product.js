const usermodel = require('../models/user_model.js')
const productModel = require('../models/product_models.js')
const bcryptjs = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const error = (tag, key) => {
    if (tag === 1) return 'Invalid Request'
    if (tag === 2) return `Invalid ${key}`
    if (tag === 3) return `${key} already exist`
    if (tag === 4) return `User not found`
}

const addProduct = async (req, res) => {
    try {
        const body = req.body
        const data = await productModel.create(body);
        return res.status(201).send({ message: "Product added successfully", data: data });

    } catch (error) {
        res.send(error.message)
    }
}
const getAllProduct = async (req, res) => {
    try {
        const body = req.body
        const filter = req.query;
        let data = {}
        if (filter.brand)
            data['brand_name'] = { $regex: filter.brand, $options: 'i' }
        if (filter.sizes) {
            data['sizes'] = { $elemMatch: { $eq: filter.sizes } }
        }
        if (filter.rating) {
            data['customer_rating'] = { $gte: filter.rating }
        }
        if (filter.category) {
            let regex = new RegExp(`\\b${filter.category}\\b`, "i");
            data['tag'] = { $regex: regex }
        }
        if (filter.discount) {
            data = { 'price.discount': { $gt: filter.discount } }
        }
        const response = await productModel.find(data);
        return res.status(200).send({ message: "Product details fetched  successfully", data: response });

    } catch (error) {
        res.send(error.message)
    }
}
const getAllbrand = async (req, res) => {
    try {
        const response = await productModel.distinct("brand_name")
        return res.status(200).send({ message: "Product brands fetched  successfully", data: response });
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = { addProduct, getAllbrand, getAllProduct }
