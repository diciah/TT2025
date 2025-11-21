import { Link } from "react-router-dom";
import { FaShoppingCart, FaHome, FaDog, FaCat } from "react-icons/fa";
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
            <Link to="/"><FaHome /> Home</Link>
          </li>
          <li>
            <Link to="/category/gatos"><FaCat /> Gatos</Link>
          </li>
          <li>
            <Link to="/category/perros"><FaDog /> Perros</Link>
          </li>
          <li className="cart">
            <Link to="/carrito"><FaShoppingCart /> Carrito</Link>
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

