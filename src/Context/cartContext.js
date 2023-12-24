import axios from 'axios'

import { createContext } from 'react'

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
    return <CartContext.Provider value={{ addToCart, getCart, deleteProductFromCart, updateProductQuantity, deleteUserCart }}>
        {props.children}
    </CartContext.Provider>
}