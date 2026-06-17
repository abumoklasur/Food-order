import { BiCart } from "react-icons/bi"
import './Navbar.css'
import { Link } from "react-router-dom"
import { useContext } from "react"
import { ShopContext } from "../ShopContext/ShopContext"


const Navbar = () => {
const {quantity} = useContext(ShopContext)

  return (
    <div>
        <div className="navbar">
            <div className="link">
                <ul>
                    <li>HOME</li>
                    <li>DISHES</li>
                </ul>
            </div>
            <div className="logo-header">
                <h2>JASON DINER</h2>
            </div>
            <div className="nav_icon_wrapper">
               <Link to="/cart">
                    <BiCart className="nav_icon" />
                     {
                        quantity > 0 && (
                            <span className="nav_qty"> {quantity} </span>
                        )
                     }
                  
               </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar