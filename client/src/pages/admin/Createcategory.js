import React, { useEffect, useState } from 'react'
import Layout from '../../components/lay/layout'
import Adminmenu from '../../components/lay/Adminmenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import Categoryform from '../../components/form/Categoryform.js'
import { Modal } from 'antd'
import { set } from 'mongoose'
const Createcategory = () => {
    const [categories, setcategories] = useState([])
    const [name, setname] = useState('')
    const [visible, setvisible] = useState(false)
    const [selected, setselected] = useState(null)
    const [updatedname, setupdatedname] = useState('')
    //get all categories
    const getallcategories = async (req, res) => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data.success) {
                setcategories(data.category)
            }
            toast.success('All categories list')
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }
    useEffect(() => {
        getallcategories();
    }, [])
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name })
            if (data?.success) {
                toast.success(`${name} is created`)
                getallcategories()
            }
            else
                toast.error('Error in creation')
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in submit')
        }
    }
    //update category
    const handleupdatesubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedname })
            if (data.success) {
                toast.success(`${updatedname} is updated`)
                setselected(null)
                setupdatedname("")
                setvisible(false)
                getallcategories();
            }
        } catch (error) {
            console.log(error)
            toast.error('Some thing is wrong in updation')
        }
    }
    //delete category
    const handledeletesubmit = async (pid) => {

        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${pid}`)
            if (data.success) {
                toast.success(`category is deleted`)

                getallcategories();
            }
        } catch (error) {
            console.log(error)
            toast.error('Some thing is wrong in updation')
        }
    }

    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Adminmenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage Category</h1>
                        <div className='p-3 w-50'>
                            <Categoryform handlesubmit={handlesubmit} value={name} setValue={setname} />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>


                                    {categories?.map(c => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button className='btn btn-primary ms-2 ' onClick={() => {
                                                        setvisible(true)
                                                        setupdatedname(c.name)
                                                        setselected(c)
                                                    }}>Edit</button>
                                                    <button className='btn btn-danger ms-2' onClick={() => handledeletesubmit(c._id)}>Delete</button>
                                                </td>
                                            </tr >
                                        </>
                                    ))}



                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setvisible(false)} footer={null} visible={visible}>
                            <Categoryform value={updatedname} setValue={setupdatedname} handlesubmit={handleupdatesubmit} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Createcategory