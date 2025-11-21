const BASE_URL = "https://690e3f0cbd0fefc30a03ebc2.mockapi.io/products";

export const createProduct = async (product) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("No se pudo crear el producto");
  }

  const result = await res.json();
  return result;
};
export const getProducts = async (category) => {
  let url = BASE_URL;
  if (category) {
    url = `${BASE_URL}?category=${category}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    // If 404, return empty array (no products yet)
    if (res.status === 404) {
      return [];
    }
    throw new Error("Error al listar productos");
  }

  const results = await res.json();
  return results;
};

// Traer uno por id
export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Error al obtener el producto");
  }
  return await res.json();
};

// Actualizar producto
export const updateProduct = async (id, product) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("No se pudo actualizar el producto");
  }

  const result = await res.json();
  return result;
};

// Eliminar producto
export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("No se pudo eliminar el producto");
  }

  return await res.json();
};