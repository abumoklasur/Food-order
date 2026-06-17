import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import Homepage from "./Pages/Homepage/Homepage"
import Cart from "./Components/Cart/Cart"
import ProductDetails from "./Pages/ProductDetails/ProductDetails"
import Footer from "./Components/Footer/Footer"
import { ToastContainer } from "react-toastify"

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={ <Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
 
      </Routes>

      <Footer />
    </div>
  )
}

export default App