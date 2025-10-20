import { useState } from "react";
import "./PublicarArticulo.css";

function PublicarArticulo() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [imagen, setImagen] = useState("");

  const manejarPublicacion = (e) => {
    e.preventDefault();

    if (!titulo || !contenido) {
      alert("Por favor, completa todos los campos");
      return;
    }

    const nuevoArticulo = {
      id: Date.now(),
      titulo,
      contenido,
      imagen,
      fecha: new Date().toLocaleDateString(),
    };

    // Guardar en localStorage (simulación antes de Supabase)
    const existentes = JSON.parse(localStorage.getItem("articulos")) || [];
    const actualizados = [nuevoArticulo, ...existentes];
    localStorage.setItem("articulos", JSON.stringify(actualizados));

    setTitulo("");
    setContenido("");
    setImagen("");

    alert("📰 Artículo publicado correctamente");
  };

  return (
    <div className="publicar-container">
      <h2>🖊️ Publicar nuevo artículo</h2>

      <form className="formulario-publicar" onSubmit={manejarPublicacion}>
        <input
          type="text"
          placeholder="Título del artículo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
          placeholder="Contenido del artículo"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
        />

        <input
          type="text"
          placeholder="URL de la imagen (opcional)"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />

        <button type="submit">Publicar</button>
      </form>
    </div>
  );
}

export default PublicarArticulo;
