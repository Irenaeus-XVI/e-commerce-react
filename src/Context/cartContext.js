const { createContext } = require("react");


export const CartContext = createContext()


function addToCart() {
    console.log('added');
}

export default function CartContextProvider(props) {
    return <CartContext.Provider value={{ addToCart }}>
        {props.children}
    </CartContext.Provider>
}