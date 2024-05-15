import React from 'react'
import Layout from '../../components/lay/layout'
import { useState } from 'react'
import axios from 'axios'
import "../../styles/Authstyles.css"
import toast from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth'
const Login = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const Navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login',
                { email, password });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data))
                Navigate('/' || location.state)
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
        < Layout title={"Register-Ecommerce"} >
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>LOGIN FORM</h4>

                    <div className="mb-3">
                        <input type="email" className="form-control" id="exampleInputEmail1"
                            placeholder='Enter your email' value={email}
                            onChange={(e) => setemail(e.target.value)} required />
                    </div>


                    <div className="mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            placeholder='Enter your password' value={password}
                            onChange={(e) => setpassword(e.target.value)} required />
                    </div>
                    <div className='mb-3'>
                        <button type="button" onClick={() => Navigate('/forgot-password')} className="btn btn-primary">Forgot Password</button>
                    </div>
                    <button type="submit" className="btn btn-primary">LOGIN</button>
                </form>

            </div>
        </Layout >
    )
}

export default Login