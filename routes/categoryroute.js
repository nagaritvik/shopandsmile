import express from "express";
import { isadmin, requiresignin } from "../middlewares/authmiddleware.js";
import { Createcategorycontroller, Updatecategorycontroller, categorycontroller, deletecategorycontroller, singlecategorycontroller } from "../controllers/categorycontroller.js";
const router = express.Router();
//routes 
//create category route
router.post('/create-category', requiresignin, isadmin, Createcategorycontroller)
//update category route
router.put('/update-category/:id', requiresignin, isadmin, Updatecategorycontroller)

//get all categories

router.get('/get-category', categorycontroller)
//get single category
router.get('/single-category/:id', singlecategorycontroller)

//delete category
router.delete('/delete-category/:id', requiresignin, isadmin, deletecategorycontroller)

export default router