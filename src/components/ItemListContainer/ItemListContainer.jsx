import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaSearch } from "react-icons/fa";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import Hero from "../Hero/Hero";

import "./ItemListContainer.css";
import { getProducts } from "../../services/products";

export const ItemListContainer = ({ titulo }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const { category } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSearchTerm("");
    setCurrentPage(1);
    getProducts(category)
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [category]);

  // Filtrado de productos por búsqueda
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, products]);

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>{category ? `${category.charAt(0).toUpperCase() + category.slice(1)} - TT PetShop` : 'Inicio - TT PetShop'}</title>
        <meta name="description" content={category ? `Productos para ${category} - La mejor tienda de mascotas` : 'TT PetShop - Productos para tus mascotas'} />
      </Helmet>
      {!category && <Hero />}
      <section className="container">
        <h1>{titulo}</h1>
        
        {/* Barra de búsqueda */}
        {!loading && !error && products.length > 0 && (
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar productos por nombre, categoría o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              aria-label="Buscar productos"
            />
          </div>
        )}

        {loading && <p>Cargando productos...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && !error && products.length === 0 && (
          <p>No hay productos disponibles. Visita el panel de administración para agregar productos.</p>
        )}
        {!loading && !error && filteredProducts.length === 0 && searchTerm && (
          <p>No se encontraron productos que coincidan con "{searchTerm}"</p>
        )}
        {!loading && !error && currentProducts.length > 0 && (
          <>
            <ItemList lista={currentProducts} />
            
            {/* Paginador */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                  aria-label="Página anterior"
                >
                  Anterior
                </button>
                
                <div className="pagination-numbers">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                      aria-label={`Página ${index + 1}`}
                      aria-current={currentPage === index + 1 ? 'page' : undefined}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                  aria-label="Página siguiente"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};