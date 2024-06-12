import HomePage from "./pages/HomePage"
import { Route, Routes } from "react-router-dom"
import { ColorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import Layout from "./components/Layout"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Admin from "./pages/Admin"
import LoginForm from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Reset from "./pages/auth/Reset"
import ProductDetails from "./components/product/ProductDetails"
import Cart from "./pages/Cart"
import { BASE_URL } from "./URL"
import BackgroundGradient from "./components/BackgroundGradient"
import Contact from "./pages/Contact"
import Likes from "./pages/Likes"
import NotFound from "./pages/NotFound"
import CheckoutDetails from "./pages/checkout/CheckoutDetails"
import Checkout from "./pages/checkout/Checkout"
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess"
import OrderHistory from "./pages/order/OrderHistory"
import OrderDetails from "./pages/order/OrderDetails"
import ReviewProducts from "./pages/order/ReviewProducts"
import Redirect from "./pages/Redirect"

function App() {
  const [theme, colorMode] = useMode()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <ToastContainer />
          <BackgroundGradient />
          <div className="App">
            <Routes>
              <Route path="/" element={<Redirect />} />
              <Route path={BASE_URL} element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="register" element={<Register />} />
                <Route path="reset" element={<Reset />} />
                <Route path="cart" element={<Cart />} />
                <Route
                  path="product-details/:id"
                  element={<ProductDetails />}
                />
                <Route path="likes" element={<Likes />} />
                <Route path="contact" element={<Contact />} />
                <Route path="checkout-details" element={<CheckoutDetails />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="checkout-success" element={<CheckoutSuccess />} />
                <Route path="order-history" element={<OrderHistory />} />
                <Route path="order-details/:id" element={<OrderDetails />} />
                <Route path="review-product/:id" element={<ReviewProducts />} />
                {/* <AdminOnlyRoute> */}
                <Route path="admin/*" element={<Admin />} />
                {/* </AdminOnlyRoute> */}
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
