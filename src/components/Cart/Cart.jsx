import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft } from "react-icons/fa";
import { useCartContext } from "../../context/CartContext/useCartContext";

import "./Cart.css";

export const Cart = () => {
  const { cart, clearCart, deleteItem, total, checkout, incrementQuantity, decrementQuantity } = useCartContext();

  return (
    <section className="cart-container">
      <Helmet>
        <title>Carrito de Compras - TT PetShop</title>
        <meta name="description" content="Tu carrito de compras en TT PetShop" />
      </Helmet>
      <h2>Carrito de compras</h2>

      {cart.length ? (
        <>
          <div className="cart-items">
            {cart.map((prod) => (
              <article key={prod.id} className="cart-item">
                <img src={prod.image || prod.imageUrl} alt={prod.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{prod.name}</h3>
                  <p className="cart-item-price">Precio: ${prod.price}</p>
                  <div className="cart-quantity-controls">
                    <button className="cart-quantity-btn" onClick={() => decrementQuantity(prod.id)} aria-label="Decrementar cantidad">
                      -
                    </button>
                    <span className="cart-quantity-display">{prod.quantity}</span>
                    <button className="cart-quantity-btn" onClick={() => incrementQuantity(prod.id)} aria-label="Incrementar cantidad">
                      +
                    </button>
                  </div>
                  <p className="cart-item-subtotal">Subtotal: ${(prod.price * prod.quantity).toFixed(2)}</p>
                </div>
                <button className="cart-item-remove" onClick={() => deleteItem(prod.id)} aria-label={`Eliminar ${prod.name}`}>
                  <FaTrash /> Eliminar
                </button>
              </article>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <h3>Total a pagar: ${total().toFixed(2)}</h3>
            </div>
            <div className="cart-actions">
              <button className="btn btn-primary" onClick={checkout} aria-label="Finalizar compra">
                <FaShoppingBag /> Finalizar compra
              </button>
              <button className="btn btn-secondary" onClick={clearCart} aria-label="Vaciar carrito">
                <FaTrash /> Vaciar carrito
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="cart-empty">
          <p>Tu carrito está vacío</p>
          <Link className="btn btn-primary" to="/" aria-label="Volver al inicio">
            <FaArrowLeft /> Volver al inicio
          </Link>
        </div>
      )}
    </section>
  );
};