import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";

import "./ItemDetailContainer.css";
import { getProductById } from "../../services/products";

export const ItemDetailContainer = () => {
  const [detail, setDetail] = useState({});

  //Desestructuramos el objeto del useParams
  //La clave coincide con el nombre que definimos en Route -> :id
  const { id } = useParams();

  useEffect(() => {
    getProductById(id)
      .then((data) => setDetail(data))
      .catch((err) => setDetail({}));
  }, [id]);

  return (
    <main className="detail-container">
      <Helmet>
        <title>{detail.name ? `${detail.name} - TT PetShop` : 'Producto - TT PetShop'}</title>
        <meta name="description" content={detail.description || 'Detalle del producto en TT PetShop'} />
      </Helmet>
      {Object.keys(detail).length ? (
        <ItemDetail detail={detail} />
      ) : (
        <p>Cargando...</p>
      )}
    </main>
  );
};