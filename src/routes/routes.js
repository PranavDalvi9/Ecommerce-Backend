import express from 'express';
const router = express.Router()
import userController from '../controller/user.js'
import { auth } from "../middleware/auth.js";
import productController from '../controller/product.js'

router.post('/', userController.signUp);
router.post('/login', userController.login);
router.post('/product/:id', auth, productController.addProduct)
router.get('/product/:id', auth, productController.getAllProduct)
router.get('/brand/:id', auth, productController.getAllbrand)
export default router;