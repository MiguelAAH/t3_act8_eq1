import { useState } from 'react';
import BarraLateral from "./components/BarraLateral";
import BarraNavegacion from "./components/BarraNavegacion";
import Catalogo from "./pages/Catalogo";
import InicioSesion from './pages/InicioSesion';
import Inicio from './pages/Inicio';
import Configuracion from './pages/Configuracion';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('inicio');

  return (
    <div className="App">
      {!user ? (
        <InicioSesion onLoginSuccess={(userData) => setUser(userData)} />
      ) : (
        <>
          <div className="side">
            <BarraLateral currentView={currentView} setCurrentView={setCurrentView} />
          </div>
          <div className="navbar">
            <BarraNavegacion user={user} onLogout={() => setUser(null)} />
          </div>
          <div className="contenido">
            {currentView === 'inicio' && <Inicio user={user} />}
            {currentView === 'catalogo' && <Catalogo />}
            {currentView === 'configuracion' && <Configuracion />}
          </div>
        </>
      )}
    </div>
  );
}

export default App;