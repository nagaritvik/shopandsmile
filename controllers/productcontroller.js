import slugify from "slugify"
import productmodel from "../models/productmodel.js"
import categorymodel from "../models/categorymodel.js"
import fs from "fs"
import { GiToaster } from "react-icons/gi"
import braintree from "braintree"
import ordermodel from "../models/ordermodel.js"
import dotenv from 'dotenv'
dotenv.config();
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createproductcontroller = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case (!name):
                return res.status(500).send({ error: "Name is required" })
            case (!description):
                return res.status(500).send({ error: "Description is required" })
            case (!price):
                return res.status(500).send({ error: "Price is required" })
            case (!category):
                return res.status(500).send({ error: "Category is required" })
            case (!quantity):
                return res.status(500).send({ error: "Quantity is required" })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is required and less than 1mb" })
        }
        const product = new productmodel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success: true,
            product,
            message: "Product created successfully",
        });
    } catch (error) {
        console.log(error),
            res.status(500).send({
                success: false,
                message: "Error in creating product",
                error
            })
    }
}

export const getproductcontroller = async (req, res) => {
    try {
        const products = await productmodel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(201).send({
            success: true,
            message: "List of Products",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting all the products",
            error
        })
    }
}
export const getsingleproductcontroller = async (req, res) => {
    try {
        const product = await productmodel.findOne({ slug: req.params.slug }).select("-photo").populate('category')
        res.status(201).send({
            success: true,
            message: "Single product",
            product
        })
    } catch (error) {
        console.log(error),
            res.status(500).send({
                success: false,
                message: "Error in getting single product",
                error
            })
    }
}
export const photocontroller = async (req, res) => {
    try {
        const product = await productmodel.findById(req.params.id).select("photo")
        if (product?.photo?.data) {
            res.set('Content-type', product.photo.contentType)
            res.status(201).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: "Error in getting photo",
            error
        })
    }
}

export const deletecontroller = async (req, res) => {
    try {
        await productmodel.findByIdAndDelete(req.params.id).select("-photo")
        res.status(200).send({
            success: true,
            message: "Deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in deletion"
        })
    }
}
export const updateproductcontroller = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case (!name):
                return res.status(500).send({ error: "Name is required" })
            case (!description):
                return res.status(500).send({ error: "Description is required" })
            case (!price):
                return res.status(500).send({ error: "Price is required" })
            case (!category):
                return res.status(500).send({ error: "Category is required" })
            case (!quantity):
                return res.status(500).send({ error: "Quantity is required" })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is required and less than 1mb" })
        }
        const product = await productmodel.findByIdAndUpdate(req.params.id, { ...req.fields, slug: slugify(name) }, { new: true })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success: true,
            product,
            message: "Product updated successfully",
        });
    } catch (error) {
        console.log(error),
            res.status(500).send({
                success: false,
                message: "Error in updating product",
                error
            })
    }
}
export const filterproductcontroller = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productmodel.find(args)
        res.status(201).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error),
            res.status(404).send({
                success: false,
                message: "Error in filter",
                error
            })
    }
}
export const productcountcontroller = async (req, res) => {
    try {
        const { data } = await productmodel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            message: "Estimated count successsfully",
            data
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in count",
            error
        })
    }
}

export const productlistcontroller = async (req, res) => {
    try {
        const perpage = 6
        const page = req.params.page ? req.params.page : 1
        const products = await productmodel.find({}).select("-photo").skip((page - 1) * perpage).
            limit(perpage).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            products,
            message: "Succesfully got the list"
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in product list",
            error
        })
    }
}
export const searchcontroller = async (req, res) => {
    try {
        const { keyword } = req.params
        const result = await productmodel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }).select("-photo")
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(404).send({
            success: false,
            message: "Error in search filter",
            error
        })
    }
}

export const relatedproductcontroller = async (req, res) => {
    try {
        const { pid, cid } = req.params
        const products = await productmodel.find({
            category: cid,
            _id: { $ne: pid },
        }).select("-photo").limit(3).populate("category")
        res.status(201).send({
            success: true,
            message: "Product obtained successfully",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "error in related products",
            res
        })
    }
}

export const productcategorycontroller = async (req, res) => {
    try {
        const category = await categorymodel.findOne({ slug: req.params.slug })
        const products = await productmodel.find({ category }).populate("category")
        res.status(201).send({
            success: true,
            message: "Product obtained successfully",
            category,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in getting product category"
        })
    }
}

export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export const brainTreePaymentController = async (req, res) => {
    try {
        const { nonce, cart } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });
        let newTransaction = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (error, result) {
                if (result) {
                    const order = new ordermodel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};