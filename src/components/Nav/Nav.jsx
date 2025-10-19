import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext/useCartContext";
import "./Nav.css";

export const Nav = () => {
  const { getTotalItems } = useCartContext();

  return (
  <header className="site-header">
    <nav className="nav">
      <div className="nav-inner">
        <div className="brand">
          <Link to="/">TT PetShop</Link>
        </div>
        <ul className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/category/gatos">Gatos</Link>
          </li>
          <li>
            <Link to="/category/perros">Perros</Link>
          </li>
          <li className="cart">
            <Link to="#">Carrito</Link>
            {getTotalItems() > 0 && (
              <span className="in-cart">{getTotalItems()}</span>
            )}
          </li>
        </ul>
      </div>
    </nav>
  </header>
 );
};

export default Nav;

