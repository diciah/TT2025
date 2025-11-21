import { useState } from "react";
import { useCartContext } from "../../context/CartContext/useCartContext";
import "./ItemDetail.css";

export const ItemDetail = ({ detail }) => {
  const { addItem } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAdd = () => {
    if (quantity > 0) {
      addItem(detail, quantity);
      setQuantity(1);
    }
  };

  return (
    <article className="item-detail">
      <div className="item-detail-image-container">
        <img 
          src={detail.image || detail.imageUrl} 
          alt={detail.name} 
          className="item-detail-image"
        />
      </div>
      <div className="item-detail-info">
        <h1 className="item-detail-title">{detail.name}</h1>
        <p className="item-detail-description">{detail.description}</p>
        <p className="item-detail-category">Categoría: {detail.category}</p>
        <p className="item-detail-price">${detail.price}</p>
        
        <div className="item-detail-actions">
          <div className="item-detail-quantity">
            <button className="quantity-btn" onClick={decrement}>
              -
            </button>
            <span className="quantity-display">{quantity}</span>
            <button className="quantity-btn" onClick={increment}>
              +
            </button>
          </div>
          <button className="item-detail-add-btn" onClick={handleAdd}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
};