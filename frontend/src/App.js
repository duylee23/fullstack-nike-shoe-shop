import path from "./utils/paths"
import { Routes, Route } from "react-router-dom";
import {Home, Admin} from "./pages"
import { Header, Footer, UserList, ProductList, OrderList } from './components';
function App() {


  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<Admin />}>
          <Route path="user" element={<UserList />} />
          <Route path="product" element={<ProductList/>} /> 
          <Route path="order" element={<OrderList />} /> 
        </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
