import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './components/Navbar';
import Products from './Products';
import SingleProduct from './SingleProduct';
import Cart from './Cart';
import Login from './authentication/login';
import { AuthProvider } from './context/UserContext';
import Order from './components/Order';
import Register from './components/Register';
import Mobile from './components/Mobile';
import Footer from './components/Footer';
import CreateOrder from './components/CreateOrder';
import Electronic from './components/Electronic';
import BabyToys from './components/BabyToys';
import Fashion from './components/Fashion';
import HomeDecoration from './components/HomeDecoration';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/singleproduct/:id' element={<SingleProduct/>} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<Order />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mobile" element={<Mobile />}/>
          <Route path='/createorder' element={<CreateOrder />} />
          <Route path='/electronics' element={<Electronic />} />
          <Route path='/toys' element={<BabyToys />} />
          <Route path='/fashion' element={<Fashion />} />
          <Route path='/homedecoration' element={<HomeDecoration />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
      
  );
}

export default App;
