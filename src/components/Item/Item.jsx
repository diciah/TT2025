import "./Item.css";
import { useState } from "react";
import { useCartContext } from "../../context/CartContext/useCartContext";

// showDescription: muestra la descripción (true para la vista detalle)
export const Item = ({ id, name, price, description, imageUrl, image, children, showDescription = false }) => {
  const { addItem } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  const increment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((prev) => prev + 1);
  };

  const decrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAdd = (e) => {
    // Evita navegar cuando el card está dentro de un Link
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addItem({ id, name, price, description, image: image || imageUrl }, quantity);
    setQuantity(1);
  };

  return (
    <article className="product-item">
      <img src={image || imageUrl || "/images/placeholder.jpg"} alt={description} />
      <h2 className="product-title">{name}</h2>
      <p className="product-price">Precio: ${price}</p>
      {showDescription && (
        <p className="product-desc">{description}</p>
      )}
      <div className="product-actions">
        <div className="quantity-selector">
          <button type="button" className="quantity-btn" onClick={decrement}>
            -
          </button>
          <span className="quantity-display">{quantity}</span>
          <button type="button" className="quantity-btn" onClick={increment}>
            +
          </button>
        </div>
        <button type="button" className="add-btn" onClick={handleAdd}>
          Agregar al carrito
        </button>
      </div>
      {children}
    </article>
  );
};

export default Item;