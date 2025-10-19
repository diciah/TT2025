import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Hubo un problema al buscar productos");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // Map route categories to product petType
  const mapCategoryToPetType = (cat) => {
    if (!cat) return null;
    const c = cat.toLowerCase();
    if (c === "gatos") return "cat";
    if (c === "perros") return "dog";
    return null;
  };

  const petType = mapCategoryToPetType(categoryId);
  const displayList = petType
    ? products.filter((p) => p.petType === petType || p.petType === "both")
    : products;

  return (
    <section id="productos" className="section">
      <h1 className="section-title">Productos</h1>
      <ItemList list={displayList} />
    </section>
  );
};

export default ItemListContainer;