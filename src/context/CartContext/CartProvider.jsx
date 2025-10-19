import { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const exists = (id) => {
    const exist = cart.some((p) => p.id === id);
    return exist;
  };

  const addItem = (item) => {
    if (exists(item.id)) {
      alert("El producto ya existe en el carrito");
      return;
    }

    setCart([...cart, item]);
    alert(`${item.name} agregado`);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    if (!cart.length) {
      return 0;
    }
    return cart.length;
  };

  const removeItem = (id) => {
    const newCart = cart.filter((p) => p.id !== id);
    setCart(newCart);
  };

  const values = {
    cart,
    addItem,
    clearCart,
    removeItem,
    getTotalItems,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export default CartProvider;