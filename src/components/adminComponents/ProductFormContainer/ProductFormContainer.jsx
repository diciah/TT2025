import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../../../services/products";
import { uploadToImgbb } from "../../../services/uploadImage";
import { useAuthContext } from "../../../context/AuthContext/useAuthContext";
import { validateProduct } from "../../../utils/validateProducts";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import "./ProductFormContainer.css";

export const ProductFormContainer = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      toast.error("Error al cargar productos");
    }
  };

  const resetForm = () => {
    setProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
    });
    setImageFile(null);
    setErrors({});
    setEditingId(null);
    
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  const handleEdit = (prod) => {
    setProduct({
      name: prod.name,
      price: prod.price.toString(),
      category: prod.category,
      description: prod.description,
      image: prod.image || "",
    });
    setEditingId(prod.id);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const confirmDelete = (prod) => {
    setProductToDelete(prod);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    setLoading(true);
    try {
      await deleteProduct(productToDelete.id);
      toast.success(`Producto "${productToDelete.name}" eliminado exitosamente`);
      await loadProducts();
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      toast.error("Error al eliminar el producto: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productToValidate = {
      ...product,
      file: imageFile || product.image,
    };
    
    const validationErrors = validateProduct(productToValidate, !product.image && !editingId);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setLoading(true);

    try {
      let imageUrl = product.image;

      if (imageFile) {
        try {
          imageUrl = await uploadToImgbb(imageFile);
        } catch (error) {
          toast.warning("Error al subir la imagen. Se usará la URL proporcionada o la existente.");
        }
      }

      const productData = {
        ...product,
        price: parseFloat(product.price),
        image: imageUrl || product.image || "/images/placeholder.jpg",
      };

      if (editingId) {
        await updateProduct(editingId, productData);
        toast.success("Producto actualizado exitosamente!");
      } else {
        await createProduct(productData);
        toast.success("Producto creado exitosamente!");
      }
      
      resetForm();
      await loadProducts();
      
    } catch (error) {
      toast.error(`Error al ${editingId ? 'actualizar' : 'crear'} el producto: ` + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="admin-container">
      <Helmet>
        <title>{editingId ? 'Editar Producto' : 'Alta de Producto'} - Panel Admin - TT PetShop</title>
        <meta name="description" content="Panel de administración de productos" />
      </Helmet>
      <div className="admin-header">
        <h2>Panel de Administración - {editingId ? 'Editar' : 'Alta de'} Productos</h2>
        <button className="btn btn-logout" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre del Producto *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Ej: Alimento Balanceado para Gatos"
            aria-label="Nombre del producto"
            aria-required="true"
          />
          {errors.name && <span className="error-message" role="alert">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Ej: 24999.99"
            step="0.01"
            min="0"
            aria-label="Precio del producto"
            aria-required="true"
          />
          {errors.price && <span className="error-message" role="alert">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría *</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            aria-label="Categoría del producto"
            aria-required="true"
          >
            <option value="">Seleccione una categoría</option>
            <option value="gatos">Gatos</option>
            <option value="perros">Perros</option>
            <option value="ambos">Ambos</option>
          </select>
          {errors.category && <span className="error-message" role="alert">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción *</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Descripción detallada del producto (mínimo 10 caracteres)..."
            rows="4"
            aria-label="Descripción del producto"
            aria-required="true"
          />
          {errors.description && <span className="error-message" role="alert">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">URL de Imagen</label>
          <input
            type="url"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
            aria-label="URL de la imagen del producto"
          />
          <small className="form-help">
            Opcional: Ingrese una URL directa o suba un archivo abajo
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="imageFile">O subir imagen</label>
          <input
            type="file"
            id="imageFile"
            accept="image/*"
            onChange={handleImageChange}
            aria-label="Subir archivo de imagen"
          />
          <small className="form-help">
            {imageFile ? `Archivo seleccionado: ${imageFile.name}` : "Ningún archivo seleccionado"}
          </small>
          {errors.file && <span className="error-message" role="alert">{errors.file}</span>}
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            aria-label={editingId ? "Actualizar producto" : "Crear producto"}
          >
            <FaSave /> {loading ? "Guardando..." : editingId ? "Actualizar Producto" : "Crear Producto"}
          </button>
          
          {editingId && (
            <button 
              type="button" 
              className="btn btn-warning" 
              onClick={handleCancelEdit}
              aria-label="Cancelar edición"
            >
              <FaTimes /> Cancelar Edición
            </button>
          )}
          
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigate("/")}
            aria-label="Volver al inicio"
          >
            Volver al Inicio
          </button>
        </div>
      </form>

      {/* Listado de productos */}
      <div className="products-list">
        <h3>Productos Existentes</h3>
        {products.length === 0 ? (
          <p>No hay productos registrados aún.</p>
        ) : (
          <div className="products-grid">
            {products.map((prod) => (
              <div key={prod.id} className="product-card">
                <img 
                  src={prod.image || "/images/placeholder.jpg"} 
                  alt={prod.name}
                  className="product-card-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/placeholder.jpg";
                  }}
                />
                <div className="product-card-body">
                  <h4>{prod.name}</h4>
                  <p className="product-price">${prod.price}</p>
                  <p className="product-category">Categoría: {prod.category}</p>
                  <p className="product-description">{prod.description}</p>
                  <div className="product-card-actions">
                    <button 
                      className="btn btn-edit"
                      onClick={() => handleEdit(prod)}
                      aria-label={`Editar producto ${prod.name}`}
                    >
                      <FaEdit /> Editar
                    </button>
                    <button 
                      className="btn btn-delete"
                      onClick={() => confirmDelete(prod)}
                      aria-label={`Eliminar producto ${prod.name}`}
                    >
                      <FaTrash /> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-content">
            <h3 id="modal-title">Confirmar Eliminación</h3>
            <p>¿Está seguro que desea eliminar el producto <strong>{productToDelete?.name}</strong>?</p>
            <p className="warning-text">Esta acción no se puede deshacer.</p>
            <div className="modal-actions">
              <button 
                className="btn btn-delete"
                onClick={handleDelete}
                disabled={loading}
                aria-label="Confirmar eliminación"
              >
                {loading ? "Eliminando..." : "Sí, Eliminar"}
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setShowDeleteModal(false);
                  setProductToDelete(null);
                }}
                disabled={loading}
                aria-label="Cancelar eliminación"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
