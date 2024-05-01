import path from "./utils/paths"
import { Routes, Route, useParams } from "react-router-dom";
import {Home, Admin, NewProduct, ProductList, ProductAdd, ProductEdit, ProductsShow, Popular, Login, Register,ProductDetail, UserList} from "./pages"
import { Header, Footer, OrderList } from './components';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <div className="App">
      <Header/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<Admin />}>
          <Route path="product" element= {<ProductList/>} />
          <Route path="product/new-product" element={<ProductAdd/>}/>
          <Route path="product/edit/:productId" element={<ProductEdit/>}/>
          <Route path="order" element={<OrderList />} /> 
          <Route path="user" element={<UserList/>}/>
        </Route>
        <Route path="/user/products" element={<ProductsShow/>}/>
        <Route path="/user/popular" element={<Popular/>}/>
        <Route path="/user/product/{id}" element={<ProductDetail/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
