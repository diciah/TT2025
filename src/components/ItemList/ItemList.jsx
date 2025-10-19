import "./ItemList.css";
import { Item } from "../Item/Item";
import { Link } from "react-router-dom";

export const ItemList = ({ list }) => {
  return (
    <div className="products-grid">
      {
        list.length ?
        list.map((prod) => (
          <Link to={`/detail/${prod.id}`} key={prod.id} className="product-link">
            <Item {...prod} />
          </Link>
        ))
        :
        <p>No hay productos</p>
      }
    </div>
  );
};