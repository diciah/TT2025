import { useState } from "react";
import { toast } from "react-toastify";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const exists = (id) => {
    const exist = cart.some((p) => p.id === id);
    return exist;
  };

  const addItem = (item, quantity = 1) => {
    if (exists(item.id)) {
      // If item exists, update quantity
      const updatedCart = cart.map((p) => 
        p.id === item.id 
          ? { ...p, quantity: p.quantity + quantity } 
          : p
      );
      setCart(updatedCart);
      toast.success(`${item.name} actualizado en el carrito`);
      return;
    }

    // Add new item with quantity
    setCart([...cart, { ...item, quantity }]);
    toast.success(`${item.name} agregado al carrito`);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    if (!cart.length) return 0;
    // Sumar cantidades reales en el carrito en lugar de solo contar ítems distintos
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const removeItem = (id) => {
    const newCart = cart.filter((p) => p.id !== id);
    setCart(newCart);
  };

  // Alias for removeItem to match Cart component usage
  const deleteItem = (id) => {
    removeItem(id);
  };

  // Increment quantity of item in cart
  const incrementQuantity = (id) => {
    const updatedCart = cart.map((p) =>
      p.id === id ? { ...p, quantity: p.quantity + 1 } : p
    );
    setCart(updatedCart);
  };

  // Decrement quantity of item in cart
  const decrementQuantity = (id) => {
    const item = cart.find((p) => p.id === id);
    if (!item) return;

    if (item.quantity === 1) {
      // If quantity is 1, remove the item
      removeItem(id);
    } else {
      // Otherwise, decrease quantity
      const updatedCart = cart.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity - 1 } : p
      );
      setCart(updatedCart);
    }
  };

  // Calculate total price
  const total = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  // Checkout function
  const checkout = () => {
    if (cart.length === 0) {
      toast.warning("El carrito está vacío");
      return;
    }

    const totalAmount = total();
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    toast.success(`Compra finalizada!\nTotal de productos: ${itemCount}\nTotal a pagar: $${totalAmount.toFixed(2)}`, {
      autoClose: 5000,
    });
    
    // Clear cart after checkout
    setCart([]);
  };

  const values = {
    cart,
    addItem,
    clearCart,
    removeItem,
    deleteItem,
    getTotalItems,
    total,
    checkout,
    incrementQuantity,
    decrementQuantity,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export default CartProvider;