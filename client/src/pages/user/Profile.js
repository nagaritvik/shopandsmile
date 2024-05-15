import React, { useState, useEffect } from 'react'
import Layout from '../../components/lay/layout'
import Usermenu from '../../components/lay/Usermenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'
const Profile = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState("")
    const [auth, setauth] = useAuth()
    //get user data
    useEffect(() => {
        const { name, email, phone, address } = auth?.user
        setname(name)
        setemail(email)
        setaddress(address)
        setphone(phone)
    }, [auth?.user])
    //submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put('/api/v1/auth/profile',
                { name, email, password, phone, address });

            setauth({ ...auth, user: data?.updateduser })
            let ls = localStorage.getItem('auth')
            ls = JSON.parse(ls)
            ls.user = data.updateduser
            localStorage.setItem('auth', JSON.stringify(ls))
            toast.success('Profile updated successfully')
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }
    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Usermenu />
                    </div>
                    <div className='col-md-8'>
                        <div className="form-container" style={{ marginTop: "-40px" }}>
                            <form onSubmit={handleSubmit}>
                                <h4 className='title'>USER PROFILE</h4>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                        placeholder='Enter your name' value={name}
                                        onChange={(e) => setname(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                        placeholder='Enter your email' value={email}
                                        onChange={(e) => setemail(e.target.value)} required disabled />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                        placeholder='Enter phone number' value={phone}
                                        onChange={(e) => setphone(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                        placeholder='Enter your address' value={address}
                                        onChange={(e) => setaddress(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" id="exampleInputPassword1"
                                        placeholder='Enter your password' value={password}
                                        onChange={(e) => setpassword(e.target.value)} />
                                </div>

                                <button type="submit" className="btn btn-primary">UPDATE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile