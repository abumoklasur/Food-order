import { useContext, useState, useEffect } from "react"
import { productsData } from "../../assets/data"
import { ShopContext } from "../../Components/ShopContext/ShopContext"
import { useParams, Link } from "react-router-dom"
import './ProductDetails.css'

const ProductDetails = () => {
  const { addToCart } = useContext(ShopContext)
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      // ✅ Direct comparison (both are strings)
      const foundProduct = productsData.find(product => product.id === id)
      setProduct(foundProduct)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [id])

  if (loading) {
    return (
      <div className="loading_container">
        <h2>Loading product details...</h2>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product_not_found">
        <h2>Product not found</h2>
        <p>Sorry, the product you're looking for doesn't exist.</p>
        <Link to="/" className="back_home">Back to Home</Link>
      </div>
    )
  }

  return (
    <div>
      <div className="product_detail">
        <div className="details_left">
          <img src={product.image} alt={product.title || product.name} />
        </div>
        <div className="details_right">
          <h3>{ product.name}</h3>
          <p className="product_price">${product.price}</p>
          <p className="desc">{product.description || "No description available"}</p>
          {/* ✅ Pass id as string */}
          <button onClick={() => addToCart(product, id)}>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails