import React, { useState, useEffect } from 'react'
import Layout from '../components/lay/layout'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import "../styles/CartPage.css"
const Cartpage = () => {
    const [cart, setcart] = useCart()
    const [auth, setauth] = useAuth()
    const [clientToken, setclientToken] = useState("")
    const [instance, setinstance] = useState("")
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()




    //get total price

    const totalprice = () => {
        try {
            let total = 0
            cart?.map((item) => {
                total = total + item.price
            })
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })
        } catch (error) {
            console.log(error)
        }
    }
    const removeitem = (pid) => {
        try {
            let mycart = [...cart]
            let index = mycart.findIndex(item => item._id === pid)
            mycart.splice(index, 1)
            setcart(mycart)
            localStorage.setItem("cart", JSON.stringify(mycart))
        } catch (error) {
            console.log(error)
        }
    }

    //get cart
    const gettoken = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/braintree/token");
            setclientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        gettoken();
    }, [auth?.token]);

    const handlepayment = async () => {
        try {
            setloading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post("/api/v1/product/braintree/payment", {
                nonce,
                cart
            }

            );
            setloading(false);
            localStorage.removeItem("cart");
            setcart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-3 mb-1'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length
                                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
                                }`
                                : " Your Cart Is Empty"}
                        </h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        {
                            cart?.map(c => (
                                <div className='row mb-2 p-3 card flex-row'>
                                    <div className='col-md-4'>
                                        <img src={`/api/v1/product/product-photo/${c._id}`} className="card-img-top"
                                            alt={c.name}
                                            width={"100px"}
                                            height={"100px"} />
                                    </div>
                                    <div className='col-md-8'>
                                        <h5>{c.name}</h5>
                                        <h5>{c.description}</h5>
                                        <h5>Price: {c.price}</h5>
                                        <button className='btn btn-danger' onClick={() => removeitem(c._id)}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='col-md-4 text-center'>
                        <h4>Cart Summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total :{totalprice()}</h4>
                        {auth?.user?.address ? (
                            <>
                                <div className='mb-3'>
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                </div>
                            </>
                        ) : (
                            <div className='mb-3'>
                                {
                                    auth?.token ? (
                                        <button className='btn btn-outline-warning'
                                            onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                    ) : (
                                        <button className='btn btn-outline-warning'
                                            onClick={() => navigate('/login', { state: '/cart' })}>Please login to checkout</button>
                                    )

                                }
                            </div>
                        )
                        }
                        <div className='mt-2'>
                            {!clientToken || !auth?.token || !cart?.length ? (
                                ""
                            ) : (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: "vault",
                                            },
                                        }}
                                        onInstance={(instance) => setinstance(instance)}
                                    />

                                    <button
                                        className="btn btn-primary"
                                        onClick={handlepayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                    >
                                        {loading ? "Processing ...." : "Make Payment"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cartpage