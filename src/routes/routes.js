const express = require('express')
const userController = require('../controller/user.js')
const router = express.Router();
const {auth} = require('../middleware/auth.js')
const productController = require('../controller/product.js')

router.post("/", userController.signUp);
router.post("/login", userController.login);
router.post("/product/:id", auth, productController.addProduct);
router.get("/product/:id", auth, productController.getAllProduct);
router.get("/brand/:id", auth, productController.getAllbrand);

module.exports = router;
