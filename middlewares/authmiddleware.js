import JWT from "jsonwebtoken"
import usermodels from "../models/usermodels.js";

export const requiresignin = (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode;
        next();
    }
    catch (error) {
        console.log(error)
    }
}
//admin access

export const isadmin = async (req, res, next) => {
    try {
        const user = await usermodels.findById(req.user._id)
        if (user.role !== 1) {
            res.status(401).send({
                success: false,
                message: "Unauthorised access"
            });
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message: "error is middleware"
        });
    }
}