import { useContext } from "react"
import { ShopContext } from "../ShopContext/ShopContext"
import './ProductList.css'
import { Link } from "react-router-dom"

const ProductList = () => {

  const {products, addToCart} = useContext(ShopContext)

  return (
    <div>
      <div className="product-list">
          <h2>OUR AWESOME DISH</h2>

          <div className="product_display">

           {
              products.map((product) => {
                const {id, image, name, price} = product
                return ( 
                  <div className="product_card" key={id}>
                    <Link to={`/product/${product.id}`}>
                         <img src={image} alt="" className="product-img"/>
                    </Link>                   
                    <div className="product-info">
                      <h4>{name}</h4>
                      <p>${price}</p>
                    </div>
                    <button  onClick={() => addToCart(product, product.id)} className="cta">
                      Add To Cart
                    </button>
                  </div>
                )
              })
            }

          </div>
      </div>
    </div>
  )
}

export default ProductList