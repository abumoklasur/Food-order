// import {  createContext, useEffect, useState } from "react";

// export const ShopContext = createContext()

// import {productsData} from '../../assets/data'
// import { toast } from "react-toastify";

// const ShopContextProvider = ({children}) => {
//     // ProductList p
//     const [products, setProducts ] = useState(productsData)


//     // Card page
//     const [cart , setCart] = useState([])

//     const [quantity, setQuantity] = useState(0)

//     const [total, setTotal ] = useState(0)

//     useEffect(() => {
//         const total = cart.reduce((accumulator, currentItem) => {
//             const priceAsNumber = parseFloat(currentItem.price)
//             if(isNaN(priceAsNumber)){
//                 return accumulator
//             }
//             return accumulator + priceAsNumber * currentItem.amount
//         }, 0)
//         setTotal(total)
//     }, [cart])

//     useEffect(() => {
//         if(cart) {
//             const amount = cart.reduce((accumulator, currentItem) => {
//                 return accumulator + currentItem.amount
//             },0)
//             setQuantity(amount)
//         }
//     }, [cart])

//     const addToCart = (product, id) => {
//         const newItem = {...product, amount: 1}

//         const cartItem = cart.find((item) => {
//             return item.id === id 
//         })

//         if(cartItem) {
//             const newCart = [...cart].map((item) => {
//                 if(item.id===id) {
//                     return { ...item, amount: cartItem.amount}
//                 }else {
//                     return item
//                 }
//             })
//             setCart(newCart)

//         }else{
//             setCart([...cart, newItem ])
//             toast.success("Product added to cart")
//         }
//     }

//     const clearCart = () => {
//         setCart([])
//         toast.success("Cart Empty")
//     }

//     const removeFromCart = (id) => {
//         const newCart = cart.filter((item) => {
//             return item.id !== id;
//         })
//         setCart(newCart);
//      toast.success("Product removed successfully")
//     }

//     const increaseQuantity = (id) => {
//         const cartItem = cart.find((item) => item.id === id);
//         addToCart(cartItem, id)
//     }

//     const decreaseQuantity = (id) => {
//         const cartItem = cart.find((item) => {
//             return item.id === id;
//         })
//         if(cartItem) {
//             const newCart = cart.map((item) => {
//                 if(item.id === id ) {
//                     return { ... item, amount:cartItem.amount - 1}
//                 }else {
//                     return item
//                 }
//             })
//             setCart(newCart)
//         }
//         else{
//             if(cartItem.amount < 2) {
//                 removeFromCart(id)
//             }
//         }
//     } 

//     return (
//         <ShopContext.Provider value={{
//             products,
//             cart,
//             addToCart, 
//             removeFromCart,
//             clearCart,
//             increaseQuantity, 
//             decreaseQuantity, 
//             quantity,
//             total
//             }}>
//             {children}
//         </ShopContext.Provider>
//     )

// }

// export default ShopContextProvider


import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext()

import { productsData } from '../../assets/data'
import { toast } from "react-toastify";

const ShopContextProvider = ({ children }) => {
    // ProductList
    const [products, setProducts] = useState(productsData)

    // Cart page
    const [cart, setCart] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const total = cart.reduce((accumulator, currentItem) => {
            const priceAsNumber = parseFloat(currentItem.price)
            if (isNaN(priceAsNumber)) {
                return accumulator
            }
            return accumulator + priceAsNumber * currentItem.amount
        }, 0)
        setTotal(total)
    }, [cart])

    useEffect(() => {
        if (cart) {
            const amount = cart.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.amount
            }, 0)
            setQuantity(amount)
        }
    }, [cart])

    const addToCart = (product, id) => {
        const newItem = { ...product, amount: 1 }

        const cartItem = cart.find((item) => {
            return item.id === id
        })

        if (cartItem) {
            const newCart = cart.map((item) => {
                if (item.id === id) {
                    return { ...item, amount: cartItem.amount + 1 }  // ✅ Fixed: +1 to increase
                } else {
                    return item
                }
            })
            setCart(newCart)
            toast.success("Quantity increased")
        } else {
            setCart([...cart, newItem])
            toast.success("Product added to cart")
        }
    }

    const clearCart = () => {  // ✅ Fixed: renamed from elearCart to clearCart
        setCart([])
        toast.success("Cart Empty")
    }

    const removeFromCart = (id) => {  // ✅ Fixed: added id parameter
        const newCart = cart.filter((item) => {
            return item.id !== id
        })
        setCart(newCart)
        toast.success("Product removed successfully")
    }

    const increaseQuantity = (id) => {
        const cartItem = cart.find((item) => item.id === id)
        if (cartItem) {
            addToCart(cartItem, id)
        }
    }

    const decreaseQuantity = (id) => {  // ✅ Fixed: correct logic
        const cartItem = cart.find((item) => item.id === id)
        if (cartItem) {
            if (cartItem.amount === 1) {
                // Remove item if quantity is 1
                const newCart = cart.filter((item) => item.id !== id)
                setCart(newCart)
                toast.success("Product removed from cart")
            } else {
                // Decrease quantity by 1
                const newCart = cart.map((item) => {
                    if (item.id === id) {
                        return { ...item, amount: cartItem.amount - 1 }
                    } else {
                        return item
                    }
                })
                setCart(newCart)
            }
        }
    }

    return (
        <ShopContext.Provider value={{
            products,
            cart,
            addToCart,
            removeFromCart,
            clearCart,  // ✅ Fixed: renamed from elearCart
            increaseQuantity,
            decreaseQuantity,
            quantity,
            total
        }}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider