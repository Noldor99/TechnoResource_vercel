import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "../components/admin/navigate/LayoutAdmin";
import HomePage from "../components/admin/HomePage";
import AddProduct from "../components/admin/AddProduct/AddProduct";
import ViewProducts from "../components/admin/allProducts/ViewProducts";

import UseList from "../components/admin/UseList";
import OrderDetailsAdmin from "../components/admin/orders/OrderDetailsAdmin";
import OrderHistory from "./order/OrderHistory";


const Admin = () => {
  return (
    <div>
      <Routes>
        <Route element={<LayoutAdmin />}>
          <Route index element={<HomePage />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="orders" element={<OrderHistory mode="admin" />} />
          <Route path="order-details/:id" element={<OrderDetailsAdmin />} />
          <Route path="useList" element={<UseList />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Admin;
