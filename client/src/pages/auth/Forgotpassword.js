
import React from 'react'
import Layout from '../../components/lay/layout'
import { useState } from 'react'
import axios from 'axios'
import "../../styles/Authstyles.css"
import toast from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth'
const Forgotpassword = () => {
    const [email, setemail] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [answer, setanswer] = useState("")
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password',
                { email, newpassword, answer });
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
        <Layout title={"forgot password"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>RESET PASSWORD</h4>

                    <div className="mb-3">
                        <input type="email" className="form-control" id="exampleInputEmail1"
                            placeholder='Enter your email' value={email}
                            onChange={(e) => setemail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputEmail1"
                            placeholder='What is your school name' value={answer}
                            onChange={(e) => setanswer(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            placeholder='Enter your password' value={newpassword}
                            onChange={(e) => setnewpassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">RESET</button>
                </form>

            </div>
        </Layout>
    )
}

export default Forgotpassword