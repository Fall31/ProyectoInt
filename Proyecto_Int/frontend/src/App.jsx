import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Registrar from "./pages/Registrar";
import IniciarSesion from "./pages/IniciarSesion";
import AgregarProducto from "./pages/AgregarProducto";
import Catalogo from "./pages/Catalogo";
import ClienteCarrito from "./pages/CarritoCompras";
import PublicarArticulo from "./pages/PublicarArticulo";
import VerArticulos from "./pages/Articulos";
import "./App.css";

function App() {
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/saludo")
      .then((res) => res.json())
      .then((data) => setMensaje(data.mensaje))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <h2>Mi App</h2>
          <nav>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/agregar-producto">Agregar Productos</Link></li>
              <li><Link to="/catalogo">Catalogo Productos</Link></li>
              <li><Link to="/carrito">Carrito</Link></li>
              <li><Link to="/publicar">Publicar Artículo</Link></li>
              <li><Link to="/articulos">Artículos</Link></li>

            </ul>
          </nav>
        </aside>

        <main className="content">

          <Routes>
            <Route
              path="/"
              element={
                <div className="principal">
                  <header className="header">
                    <Link to="/iniciar-sesion" className="login-btn">Iniciar sesión</Link>
                    <Link to="/registrar" className="register-btn">Registrar</Link>
                  </header>
                  <h1>Frontend React</h1>
                  <p>{mensaje}</p>
                </div>
              }
            />
            <Route path="/registrar" element={<Registrar />} />
            <Route path="/iniciar-sesion" element={<IniciarSesion />} />
            <Route path="/agregar-producto" element={<AgregarProducto />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/carrito" element={<ClienteCarrito />} />
            <Route path="/publicar" element={<PublicarArticulo />} />
            <Route path="/articulos" element={<VerArticulos />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
