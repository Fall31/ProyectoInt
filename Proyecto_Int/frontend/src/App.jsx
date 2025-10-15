import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Registrar from "./pages/Registrar";
import IniciarSesion from "./pages/IniciarSesion";
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
              <li><Link to="#">Usuarios</Link></li>
              <li><Link to="#">Configuración</Link></li>
              <li><Link to="#">Acerca de</Link></li>
            </ul>
          </nav>
        </aside>

        <main className="content">
          <header className="header">
            <Link to="/iniciar-sesion" className="login-btn">Iniciar sesión</Link>
            <Link to="/registrar" className="register-btn">Registrar</Link>
          </header>

          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1>Frontend React</h1>
                  <p>{mensaje}</p>
                </div>
              }
            />
            <Route path="/registrar" element={<Registrar />} />
            <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
//test
export default App;
