import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ContenidoInterfaz from "./components/contenidoInterfaz";

function App() {
  return (
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
  );
}

export default App;