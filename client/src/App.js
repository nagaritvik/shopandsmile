import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policies from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/auth/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/auth/login';
import Dashboard from './pages/user/Dashboard';
import Privateroute from './components/routes/Private';
import Forgotpassword from './pages/auth/Forgotpassword';
import Adminroute from './components/routes/Adminroute';
import Admindashboard from './pages/admin/Admindashboard';
import Createcategory from './pages/admin/Createcategory';
import Createproduct from './pages/admin/Createproduct';
import Users from './pages/admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/admin/Products';
import Updateproduct from './pages/admin/Updateproduct';
import Search from './pages/Search';
import Productdetails from './pages/Productdetails';
import Categories from './pages/Categories';
import Categoryproduct from './pages/CategoryProduct';
import Cartpage from './pages/Cartpage';
import Adminorders from './pages/admin/Adminorders';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/product/:slug' element={<Productdetails />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/category/:slug' element={<Categoryproduct />} />
        <Route path='/search' element={<Search />} />
        <Route path='/cart' element={<Cartpage />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Privateroute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/orders' element={<Orders />} />
          <Route path='user/profile' element={<Profile />} />
        </Route>
        <Route path='/dashboard' element={<Adminroute />}>
          <Route path="admin" element={<Admindashboard />} />
          <Route path='admin/create-category' element={<Createcategory />} />
          <Route path='admin/create-product' element={<Createproduct />} />
          <Route path='admin/product/:slug' element={<Updateproduct />} />
          <Route path='admin/product' element={<Products />} />
          <Route path='admin/users' element={<Users />} />
          <Route path='admin/orders' element={<Adminorders />} />
        </Route>
        <Route path='/contact' element={<Contact />} />
        <Route path='/forgot-password' element={<Forgotpassword />} />
        <Route path='/policies' element={<Policies />} />
        <Route path='/*' element={<Pagenotfound />} />

      </Routes>


    </>
  );
}

export default App;
