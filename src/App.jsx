import { useState } from 'react';
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ContenidoInterfaz from "./components/contenidoInterfaz";
import Login from './components/Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {!user ? (
        <Login onLoginSuccess={(userData) => setUser(userData)} />
      ) : (
        <>
          <div className="side">
            <Sidebar />
          </div>
          <div className="navbar">
            <Navbar />
          </div>
          <div className="contenido">
            <ContenidoInterfaz />
          </div>
        </>
      )}
    </div>
  );
}

export default App;