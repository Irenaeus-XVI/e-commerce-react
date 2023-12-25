import axios from 'axios'

import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext()
const headers =
{
    token: localStorage.getItem('userToken')
}


function addToCart(id) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
        productId: id
    }, {
        headers
    }).then((res) => res).catch((err) => err)
}



function getCart() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
        {
            headers
        }).then((res) => res).catch((err) => err)
}

function deleteProductFromCart(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
            headers
        }).then((res) => res).catch((err) => err)
}




function updateProductQuantity(id, count) {
    return axios.put
        (`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            count
        },
            {
                headers
            }).then((res) => res).catch((err) => err)
}


function deleteUserCart() {
    return axios.delete
        (`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers
            }).then((res) => res).catch((err) => err)
}
export default function CartContextProvider(props) {

    const [cartId, setCartId] = useState(null)
    const [totalNumberOfElements, setTotalNumberOfElements] = useState(null)



    function onlinePayment(shippingAddress) {
        return axios.post
            (`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
                shippingAddress
            },
                {
                    headers
                }).then((res) => res).catch((err) => err)
    }


    async function getInitialCart() {
        const { data } = await getCart()
        try {
            // console.log(data);
            if (data) {
                setTotalNumberOfElements(data.numOfCartItems)
                setCartId(data.data._id)
            }
        } catch (error) {
            // console.log('asd', error);
        }
    }


    useEffect(() => {
        getInitialCart()
    }, [])
    return <CartContext.Provider value={{ addToCart, getCart, deleteProductFromCart, updateProductQuantity, deleteUserCart, onlinePayment, totalNumberOfElements, setTotalNumberOfElements }}>
        {props.children}
    </CartContext.Provider>
}