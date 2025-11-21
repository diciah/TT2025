# 🐾 TT PetShop - E-commerce para Mascotas

## 📋 Descripción del Proyecto

TT PetShop es una aplicación web de e-commerce desarrollada con React JS que permite a los usuarios navegar, buscar y comprar productos para sus mascotas. La aplicación cuenta con un sistema completo de gestión de productos (CRUD), carrito de compras interactivo, autenticación de usuarios y un panel de administración protegido.

## ✨ Características Principales

### Funcionalidades Públicas
- 🏠 **Página de Inicio**: Hero section y listado de productos destacados
- 🔍 **Búsqueda en Tiempo Real**: Filtrado instantáneo de productos por nombre, categoría o descripción
- 📄 **Paginación**: Navegación fluida entre páginas de productos (6 por página)
- 🐱 **Categorías**: Filtrado por categorías (Gatos, Perros, Ambos)
- 🛒 **Carrito de Compras**:
  - Agregar productos con cantidad personalizada
  - Incrementar/decrementar cantidades
  - Eliminar productos individuales
  - Vaciar carrito completo
  - Calcular total automáticamente
  - Proceso de checkout
- 📱 **Diseño Responsive**: Adaptado a móviles, tablets y desktop
- ♿ **Accesibilidad**: Atributos ARIA en elementos interactivos

### Panel de Administración (Protegido)
- 🔐 **Autenticación**: Login simulado (usuario: `admin`, contraseña: `1234`)
- ➕ **Crear Productos**: Formulario con validación completa
- ✏️ **Editar Productos**: Modificación de productos existentes
- 🗑️ **Eliminar Productos**: Con modal de confirmación
- 📋 **Listado de Productos**: Vista en tarjetas con todas las opciones CRUD
- 🖼️ **Gestión de Imágenes**: Subida a ImgBB o URL directa

## 🛠️ Tecnologías Utilizadas

### Core
- **React JS 19.1.1** - Biblioteca principal
- **React Router DOM 7.9.4** - Navegación y rutas
- **Vite 7.1.7** - Build tool y dev server

### Gestión de Estado
- **Context API** - Estado global (CartContext, AuthContext)
- **React Hooks** - useState, useEffect, useContext

### UI/UX
- **Bootstrap 5** - Framework CSS responsive
- **React Bootstrap** - Componentes Bootstrap para React
- **Styled Components** - CSS-in-JS para estilos personalizados
- **React Icons** - Iconografía (FaShoppingCart, FaEdit, FaTrash, etc.)
- **React Toastify** - Notificaciones toast elegantes

### SEO y Optimización
- **React Helmet Async** - Meta tags dinámicos y SEO por página

### Backend/API
- **MockAPI** - API REST para gestión de productos
- **ImgBB API** - Almacenamiento de imágenes en la nube

## 📦 Instalación

### Prerrequisitos
- Node.js 18 o superior
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/diciah/TT2025.git
cd TT2025
```

2. **Instalar dependencias**
```bash
npm install --legacy-peer-deps
```

3. **Configurar variables de entorno** (opcional)

Si deseas usar tu propia API de MockAPI o ImgBB, configura las URLs en:
- `src/services/products.js` - URL de MockAPI
- `src/services/uploadImage.js` - API key de ImgBB

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**

El proyecto estará disponible en `http://localhost:5173`

## 🎮 Uso de la Aplicación

### Como Usuario
1. **Navegar por productos**: Explora el catálogo desde la página principal
2. **Filtrar por categoría**: Usa el menú de navegación para ver productos de gatos o perros
3. **Buscar productos**: Escribe en la barra de búsqueda para filtrar instantáneamente
4. **Ver detalles**: Haz clic en un producto para ver su información completa
5. **Agregar al carrito**: Selecciona cantidad y agrega productos
6. **Gestionar carrito**: Modifica cantidades o elimina productos
7. **Finalizar compra**: Completa tu pedido desde el carrito

### Como Administrador
1. **Acceder al panel**: Navega a `/admin`
2. **Iniciar sesión**:
   - Usuario: `admin`
   - Contraseña: `1234`
3. **Gestionar productos**:
   - Crear nuevos productos con el formulario
   - Editar productos existentes haciendo clic en "Editar"
   - Eliminar productos (con confirmación)
   - Ver listado completo de productos

## 📁 Estructura del Proyecto

```
TT2025/
├── public/
│   ├── _redirects          # Configuración Netlify
│   ├── data/
│   └── images/
├── src/
│   ├── assets/             # Recursos estáticos
│   ├── components/         # Componentes React
│   │   ├── adminComponents/
│   │   │   └── ProductFormContainer/  # CRUD de productos
│   │   ├── Cart/           # Carrito de compras
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── Item/           # Tarjeta de producto
│   │   ├── ItemDetail/     # Detalle de producto
│   │   ├── ItemDetailContainer/
│   │   ├── ItemList/       # Listado de productos
│   │   ├── ItemListContainer/  # Container con búsqueda y paginación
│   │   ├── Login/          # Autenticación
│   │   ├── Nav/            # Navegación
│   │   └── RutaProtegida/  # HOC para rutas protegidas
│   ├── context/            # Contextos globales
│   │   ├── AuthContext/    # Autenticación
│   │   └── CartContext/    # Carrito
│   ├── layouts/            # Layouts de página
│   │   ├── AdminLayout.jsx
│   │   └── MainLayout.jsx
│   ├── services/           # Servicios API
│   │   ├── products.js     # CRUD de productos
│   │   └── uploadImage.js  # Subida de imágenes
│   ├── utils/              # Utilidades
│   │   └── validateProducts.js
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Entry point
│   └── index.css           # Estilos globales
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Características de Diseño

### Sistema de Colores (CSS Variables)
```css
--primary: #6366f1;      /* Indigo principal */
--surface: #1f2937;      /* Fondo de tarjetas */
--muted-surface: #111827; /* Fondo alternativo */
--text: #f9fafb;         /* Texto principal */
--muted-text: #9ca3af;   /* Texto secundario */
--border: #374151;       /* Bordes */
```

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔒 Validaciones Implementadas

### Formulario de Productos
- **Nombre**: Obligatorio, mínimo 3 caracteres
- **Precio**: Obligatorio, debe ser mayor a 0
- **Categoría**: Obligatorio (gatos, perros, ambos)
- **Descripción**: Obligatorio, mínimo 10 caracteres
- **Imagen**: URL válida o archivo de imagen

### Autenticación
- Usuario y contraseña obligatorios
- Verificación contra credenciales configuradas
- Persistencia en sessionStorage

## 🚀 Scripts Disponibles

```bash
npm run dev        # Iniciar servidor de desarrollo
npm run build      # Compilar para producción
npm run preview    # Previsualizar build de producción
npm run lint       # Ejecutar ESLint
```

## 📊 API Endpoints (MockAPI)

### Productos
- `GET /products` - Obtener todos los productos
- `GET /products?category={category}` - Filtrar por categoría
- `GET /products/:id` - Obtener producto por ID
- `POST /products` - Crear nuevo producto
- `PUT /products/:id` - Actualizar producto
- `DELETE /products/:id` - Eliminar producto

## 🌐 Deploy

El proyecto está configurado para deploy en:
- **Netlify** (recomendado) - Incluye archivo `_redirects` para SPA routing
- **Vercel**
- **GitHub Pages**

### Deploy en Netlify
1. Conecta tu repositorio de GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. El archivo `_redirects` ya está configurado

## 🐛 Solución de Problemas

### Error de dependencias con React 19
Si encuentras errores al instalar dependencias:
```bash
npm install --legacy-peer-deps
```

### Productos no se cargan
Verifica que la URL de MockAPI esté correcta en `src/services/products.js`

### Imágenes no se suben
Verifica tu API key de ImgBB en `src/services/uploadImage.js`

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

**Ezequiel**
- GitHub: [@diciah](https://github.com/diciah)
- Proyecto: [TT2025](https://github.com/diciah/TT2025)

---

**⭐ Si te gustó este proyecto, no olvides darle una estrella en GitHub!**
