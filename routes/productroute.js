import express from 'express'
import { isadmin, requiresignin } from "../middlewares/authmiddleware.js";
import {
    brainTreePaymentController,
    braintreeTokenController,
    createproductcontroller, deletecontroller, filterproductcontroller,
    getproductcontroller, getsingleproductcontroller, photocontroller, productcategorycontroller, productcountcontroller, productlistcontroller, relatedproductcontroller, searchcontroller, updateproductcontroller
} from "../controllers/productcontroller.js";
import formidable from "express-formidable";
const router = express.Router();
//create product

router.post('/create-product', requiresignin, isadmin, formidable(), createproductcontroller);
//get all products
router.get('/get-product', getproductcontroller)
//get single product
router.get('/get-product/:slug', getsingleproductcontroller)
//get photo
router.get('/product-photo/:id', photocontroller)
//delete product
router.delete('/delete-product/:id', deletecontroller)
//update product
router.put('/update-product/:id', requiresignin, isadmin, formidable(), updateproductcontroller);
//filter product
router.post('/filter-product', filterproductcontroller)
//count product
router.get('/product-count', productcountcontroller)
//product list
router.get('/product-list/:page', productlistcontroller)
//search filter
router.get('/search/:keyword', searchcontroller)
//similar product
router.get('/related-product/:pid/:cid', relatedproductcontroller)
// product category
router.get('/product-category/:slug', productcategorycontroller)
//token
router.get("/braintree/token", braintreeTokenController);
router.post("/braintree/payment", requiresignin, brainTreePaymentController);
export default router