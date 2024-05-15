import express from "express";
import { registercontroller, logincontroller, forgotpasswordcontroller, updateprofilecontroller, getordercontroller, getallordercontroller, orderstatuscontroller } from "../controllers/authcontroller.js";
import { testcontroller } from "../controllers/authcontroller.js";
import { isadmin, requiresignin } from "../middlewares/authmiddleware.js";
const router = express.Router();

router.post('/register', registercontroller)
//login
router.post('/login', logincontroller)

router.get('/test', requiresignin, isadmin, testcontroller)

router.get('/user-auth', requiresignin, (req, res) => {
    res.status(200).send({
        ok: true
    })
})
router.get('/admin-auth', requiresignin, isadmin, (req, res) => {
    res.status(200).send({
        ok: true
    })
})

//update profile
router.put('/profile', requiresignin, updateprofilecontroller)

router.post('/forgot-password', forgotpasswordcontroller)
//orders
router.get('/orders', requiresignin, getordercontroller)
//all orders
router.get('/all-orders', requiresignin, isadmin, getallordercontroller)
//order status
router.put('/order-status', requiresignin, isadmin, orderstatuscontroller)
export default router;