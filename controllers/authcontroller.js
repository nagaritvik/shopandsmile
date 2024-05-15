import { comparepassword, hashpassword } from "../helpers/authhelper.js";
import JWT from "jsonwebtoken";
import usermodels from "../models/usermodels.js"
import ordermodel from "../models/ordermodel.js";
import { requiresignin } from "../middlewares/authmiddleware.js";
export const registercontroller = async (req, res) => {

    try {
        const { name, email, phone, address, password, answer } = req.body;
        if (!name)
            return res.send({ error: 'Name is required' })
        if (!email)
            return res.send({ message: 'Email is required' })
        if (!password)
            return res.send({ message: 'password is required' })
        if (!phone)
            return res.send({ message: 'Phone is required' })
        if (!address)
            return res.send({ message: 'address is required' })
        if (!answer)
            return res.send({ message: 'answer is required' })
        const existinguser = await usermodels.findOne({ email }) //check user
        if (existinguser)
            res.status(200).send({
                success: true,
                message: 'Already exists please login',
            })
        //register user
        const hashedpassword = await hashpassword(password)
        //save pasword
        const user = await new usermodels({ name, email, phone, address, password: hashedpassword, answer }).save();
        res.status(201).send({
            success: true,
            message: 'User registered succesfully',
            user,
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error in register control",
            success: false,
            error,
        });

    }
};
export const logincontroller = async (req, res) => {
    try {

        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password',
            })
        }
        //check user
        const user = await usermodels.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'email is not registered',
            })
        }
        const matchpassword = await comparepassword(password, user.password)
        if (!matchpassword) {
            return res.status(200).send({
                success: false,
                message: 'Password do not match'
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d', });
        res.status(200).send({
            success: true,
            message: 'Login successfully',
            user: {
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
};

export const forgotpasswordcontroller = async (req, res) => {
    try {
        const { email, answer, newpassword } = req.body
        if (!email) {
            res.status(400).send({ message: "Email is required" })
        }
        if (!answer) {
            res.status(400).send({ message: "Answer is required" })
        }
        if (!newpassword) {
            res.status(400).send({ message: "newpassword is required" })
        }
        //check
        const user = await usermodels.findOne({ email, answer })
        if (!user) {
            res.status(404).send({
                success: false,
                message: "Wrong email entered"
            })
        }
        const hashed = await hashpassword(newpassword)
        await usermodels.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password changed succesfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}
export const testcontroller = (req, res) => {
    res.send("protected route")
}

//update profile controller

export const updateprofilecontroller = async (req, res) => {
    try {
        const { name, email, phone, address, password } = req.body
        const user = await usermodels.findById(req.user._id)
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Password is required and length should be 6" })
        }
        const hashedpassword = password ? await hashpassword(password) : undefined
        const updateduser = await usermodels.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            phone: phone || user.phone,
            password: hashedpassword || user.password,
            address: address || user.address,

        }, { new: true })
        res.status(201).send({
            success: true,
            message: "Updated profile successfully",
            updateduser,
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "error in updating profile",
            error
        })
    }
}

export const getordercontroller = async (req, res) => {
    try {
        const orders = await ordermodel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name")
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in getting order",
            error
        })
    }
}

export const getallordercontroller = async (req, res) => {
    try {
        const orders = await ordermodel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "error in getting all products",
            error
        })
    }
}

export const orderstatuscontroller = async (req, res) => {
    try {
        const { orderid } = req.params
        const { status } = req.body
        const orders = await ordermodel.findByIdAndUpdate(orderid, { status }, { new: true })
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in stauts",
            error
        })
    }
}