import React from 'react'
import Layout from '../../components/lay/layout'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import "../../styles/Authstyles.css"
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState("")
    const [answer, setanswer] = useState("")
    const Navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register',
                { name, email, password, phone, address, answer });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                Navigate('/login')
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }
    return (
        <Layout title={"Register-Ecommerce"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>REGISTER FORM</h4>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputEmail1"
                            placeholder='Enter your name' value={name}
                            onChange={(e) => setname(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="exampleInputEmail1"
                            placeholder='Enter your email' value={email}
                            onChange={(e) => setemail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputEmail1"
                            placeholder='Enter phone number' value={phone}
                            onChange={(e) => setphone(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputEmail1"
                            placeholder='Enter your address' value={address}
                            onChange={(e) => setaddress(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            placeholder='Enter your password' value={password}
                            onChange={(e) => setpassword(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputEmail1"
                            placeholder='Enter your school name' value={answer}
                            onChange={(e) => setanswer(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn btn-primary">REGISTER</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register