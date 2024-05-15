
import { useState, useEffect, useContext, createContext } from "react";

const cartcontext = createContext();
const Cartprovider = ({ children }) => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        let existingcartitem = localStorage.getItem('cart')
        if (existingcartitem) setCart(JSON.parse(existingcartitem))
    }, [])
    return (
        <cartcontext.Provider value={[cart, setCart]}>
            {children}
        </cartcontext.Provider>
    )
}

const useCart = () => useContext(cartcontext);
export { useCart, Cartprovider };