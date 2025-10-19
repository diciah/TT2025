import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";

const ItemDetailContainer = () => {
  const [detail, setDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error("No se encontró el producto");
        return res.json();
      })
      .then((data) => {
        const found = data.find((prod) => prod.id == id);
        if (!found) throw new Error("Producto no encontrado");
        setDetail(found);
      });
  }, [id]);

  return (
    <main>
      {Object.keys(detail).length > 0 && (
        <ItemDetail {...detail} />
      )}
    </main>
  );
};

export default ItemDetailContainer;