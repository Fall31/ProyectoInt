import { useEffect, useState } from "react";
import "./CarritoCompras.css";

function ClienteCarrito() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [descuento, setDescuento] = useState(0);
  const [totalFinal, setTotalFinal] = useState(0);

  // Cargar productos desde localStorage
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(guardados);
  }, []);

  // Calcular total y total con descuento
  useEffect(() => {
    const subtotal = carrito.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
    const descuentoAplicado = subtotal * (descuento / 100);
    setTotalFinal(subtotal - descuentoAplicado);
  }, [carrito, descuento]);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.nombre === producto.nombre);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.nombre === producto.nombre
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const quitarDelCarrito = (nombre) => {
    setCarrito(carrito.filter((item) => item.nombre !== nombre));
  };

  const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("🛒 Carrito guardado correctamente");
  };

  return (
    <div className="cliente-container">
      <h2>Catálogo de Productos</h2>

      <div className="catalogo-grid">
        {productos.map((p, i) => (
          <div key={i} className="producto-card">
            <img src={p.imagen} alt={p.nombre} />
            <h3>{p.nombre}</h3>
            <p>${p.precio}</p>
            <button onClick={() => agregarAlCarrito(p)}>
              Añadir al carrito 🛍️
            </button>
          </div>
        ))}
      </div>

      <hr />

      <h2>🛒 Tu Carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div className="carrito-lista">
          {carrito.map((item, i) => (
            <div key={i} className="carrito-item">
              <img src={item.imagen} alt={item.nombre} />
              <div>
                <h4>{item.nombre}</h4>
                <p>Cantidad: {item.cantidad}</p>
                <p>Subtotal: ${item.precio * item.cantidad}</p>
              </div>
              <button onClick={() => quitarDelCarrito(item.nombre)}>
                Quitar ❌
              </button>
            </div>
          ))}

          <div className="descuento-box">
            <label>Descuento (%): </label>
            <input
              type="number"
              value={descuento}
              min="0"
              max="100"
              onChange={(e) => setDescuento(Number(e.target.value))}
            />
          </div>

          <div className="totales">
            <h3>Descuento aplicado: {descuento}%</h3>
            <h3>Total final: ${totalFinal.toFixed(2)}</h3>
          </div>

          <button className="guardar" onClick={guardarCarrito}>
            Guardar Carrito 💾
          </button>
        </div>
      )}
    </div>
  );
}

export default ClienteCarrito;
