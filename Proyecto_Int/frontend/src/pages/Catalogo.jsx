import { useEffect, useState } from "react";
import "./Catalogo.css";

function Catalogo() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Carga los productos desde localStorage, borrar para supabase
    const guardados = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(guardados);
  }, []);

  return (
    <div className="catalogo-container">
      <h2>Catálogo de Productos</h2>

      {productos.length === 0 ? (
        <p className="vacio">No hay productos registrados aún</p>
      ) : (
        <div className="grid">
          {productos.map((p, i) => (
            <div key={i} className="card">
              <img src={p.imagen} alt={p.nombre} />
              <h3>{p.nombre}</h3>
              <p className="precio">${p.precio}</p>
              <p className="descripcion">{p.descripcion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalogo;
