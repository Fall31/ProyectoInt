import { useEffect, useState } from "react";
import "./Articulos.css";

function VerArticulos() {
  const [articulos, setArticulos] = useState([]);
//conexion a json(conectar a supabase)
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("articulos")) || [];
    setArticulos(guardados);
  }, []);

  return (
    <div className="ver-container">
      <h2>Artículos Publicados</h2>

      {articulos.length === 0 ? (
        <p>No hay artículos publicados todavía.</p>
      ) : (
        <div className="lista-articulos">
          {articulos.map((a) => (
            <div key={a.id} className="articulo-card">
              {a.imagen && <img src={a.imagen} alt={a.titulo} />}
              <div className="contenido">
                <h4>{a.titulo}</h4>
                <p>{a.contenido}</p>
                <small>{a.fecha}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VerArticulos;
