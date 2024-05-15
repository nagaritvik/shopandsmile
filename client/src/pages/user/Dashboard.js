import React from 'react'
import Layout from '../../components/lay/layout'
import Usermenu from '../../components/lay/Usermenu'
import { useAuth } from '../../context/auth'
const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title={"Dashboard"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3 '>
                        <Usermenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 p-3'>
                            <h3>{auth?.user?.name}</h3>
                            <h3>{auth?.user?.email}</h3>
                            <h3>{auth?.user?.address}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard