import { useContext } from "react"
import { ShopContext } from "../ShopContext/ShopContext"
import { FiTrash2 } from "react-icons/fi"
import { IoMdAdd, IoMdRemove } from "react-icons/io"

const CartDetails = ({item}) => {

   const {removeFromCart, increaseQuantity, decreaseQuantity } = useContext(ShopContext)

   const { id, name, image, price, amount } = item
  return (
    <div>
      <div className="cart_item">
        <div className="product_details">
            <img src={image} alt="" />
            <div className="product_info">
              <h3>{name}</h3>
              <FiTrash2 onClick={() => removeFromCart(id)} />
            </div>
        </div>
        <div className="quantity">
          <button onClick={() => decreaseQuantity(id)} className="">
            <IoMdRemove />
          </button>
            <span>{amount}</span>
          <button onClick={() => increaseQuantity(id)}>
            <IoMdAdd />
          </button>
        </div>
        <div className="price">
            ${price}
        </div>
        <div className="total">          
             ${price * amount}  
        </div>
      </div>
    </div>
  )
}

export default CartDetails