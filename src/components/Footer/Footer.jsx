import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>© {year} TT PetShop · Hecho en Talento Tech</p>
      </div>
    </footer>
  );
};

export default Footer;
