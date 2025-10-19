import "./Item.css";
import { useCartContext } from "../../context/CartContext/useCartContext";

// showDescription: muestra la descripción (true para la vista detalle)
export const Item = ({ id, name, price, description, imageUrl, children, showDescription = false }) => {
  const { addItem } = useCartContext();

  const handleAdd = (e) => {
    // Evita navegar cuando el card está dentro de un Link
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addItem({ id, name, price, description, imageUrl });
  };

  return (
    <article className="product-item">
      <img src={imageUrl} alt={description} />
      <h2 className="product-title">{name}</h2>
      <p className="product-price">Precio: ${price}</p>
      {showDescription && (
        <p className="product-desc">Descripcion: {description}</p>
      )}
      <div className="product-actions">
        <button type="button" className="add-btn" onClick={handleAdd}>
          Agregar al carrito
        </button>
      </div>
      {children}
    </article>
  );
};

export default Item;