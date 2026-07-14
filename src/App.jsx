import { useState } from 'react';
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ContenidoInterfaz from "./components/contenidoInterfaz";
import Login from './components/Login';
import Inicio from './components/Inicio';
import Configuracion from './components/Configuracion';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('inicio');

  return (
    <div className="App">
      {!user ? (
        <Login onLoginSuccess={(userData) => setUser(userData)} />
      ) : (
        <>
          <div className="side">
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} onLogout={() => setUser(null)} />
          </div>
          <div className="navbar">
            <Navbar user={user} />
          </div>
          <div className="contenido">
            {currentView === 'inicio' && <Inicio user={user} />}
            {currentView === 'catalogo' && <ContenidoInterfaz />}
            {currentView === 'configuracion' && <Configuracion />}
          </div>
        </>
      )}
    </div>
  );
}

export default App;