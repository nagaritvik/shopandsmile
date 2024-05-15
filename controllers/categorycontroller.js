import React from 'react'
import categorymodel from '../models/categorymodel.js';
import slugify from 'slugify';
export const Createcategorycontroller = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(401).send({
                message: "name is required"
            })
        }
        const existingcategory = await categorymodel.findOne({ name })
        if (existingcategory) {
            res.status(401).send({ success: true, message: "Category exists" })
        }
        const category = await new categorymodel({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: "Category successfully created",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in category',
            error
        })
    }
}
export const Updatecategorycontroller = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params  //params means url
        const category = await categorymodel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "Category updated succesfully",
            category
        })
    } catch (error) {
        console.log(error),
            error,
            res.status(404).send({
                success: false,
                message: "Error while updating",
                error
            })
    }
}
export const categorycontroller = async (req, res) => {
    try {
        const category = await categorymodel.find({})
        res.status(201).send({
            success: true,
            category,
            message: "All list of categories"
        })

    } catch (error) {
        console.log(error),
            error,
            res.status(500).send({
                success: false,
                message: "Error in getting all categories",
                error
            })
    }
}
export const singlecategorycontroller = async (req, res) => {
    try {

        const category = await categorymodel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "Get single category successfully",
            category
        })
    } catch (error) {
        console.log(error),
            error,
            res.status(500).send({
                success: false,
                message: "Error in getting single category",
                error
            })
    }
}

export const deletecategorycontroller = async (req, res) => {
    try {
        const { id } = req.params
        await categorymodel.findByIdAndDelete(id)
        res.status(201).send({
            success: true,
            message: "Deleted category successfully"
        })
    } catch (error) {
        console.log(error),
            error,
            res.status(500).send({
                success: false,
                error,
                message: "Error while deletion"
            })
    }
}
export default Createcategorycontroller

