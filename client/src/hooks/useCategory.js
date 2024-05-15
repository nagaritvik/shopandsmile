import React from 'react'
import Layout from '../components/lay/layout'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useCategory() {
    const [categories, setcategories] = useState([])
    //get categories
    const getcategories = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category")
            setcategories(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getcategories();
    }, [])
    return categories
}