import { Link } from "react-router-dom";
import { Item } from "../Item/Item";
import "./ItemList.css";

export const ItemList = ({ lista }) => {
  //pasamos el button como children, no es obligatorio

  return (
    <div className="item-list-container">
      {lista.length ? (
        lista.map((prod) => (
          <Link to={`/detail/${prod.id}`} key={prod.id}>
            <Item {...prod} imageUrl={prod.image || prod.imageUrl} />
          </Link>
        ))
      ) : (
        <p>No hay productos</p>
      )}
    </div>
  );
};