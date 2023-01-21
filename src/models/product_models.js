const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    price: {
        mrp: { type: Number },
        discount: { type: Number },
        sp: { type: Number }
    },
    brand_name: { type: String },
    sizes: [{ type: Number }],
    customer_rating: { type: Number },
    product_details: [{ type: String }],
    images: [{ type: String }],
    tag: { type: String }
}, { timestamps: true })

module.exports = mongoose.model("product", productSchema);

