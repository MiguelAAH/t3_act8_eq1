import React, { useState } from "react";
import "./navbarVisuales.css";
import usuarioIcon from "../assets/img/usuario.png";
import flechaAbajoIcon from "../assets/img/flecha-abajo.png";

function Navbar() {
    // Estado para controlar si el menú está abierto o cerrado
    const [menuAbierto, setMenuAbierto] = useState(false);

    // Función que se ejecuta al hacer clic en el botón
    const alternarMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    return (
        <div className="navbar">
            <div className="user-menu-container">
                <button className="user-btn" id="botonUsuario" onClick={alternarMenu}>
                    <img className="nav-user-icon" src={usuarioIcon} alt="user" />
                    <span id="nombreUsuario">Jose Daniel Rodriguez Juarez</span>
                    <img src={flechaAbajoIcon} className="nav-flecha" alt="flecha" />
                </button>

                {/* Se añade la clase 'mostrar' dinámicamente dependiendo del estado */}
                <ul className={`dropdown-content ${menuAbierto ? 'mostrar' : ''}`} id="dropdownOpciones">
                    <li><a href="#" id="botonPerfil">Perfil</a></li>
                    <li><a href="#" id="botonCerrar">Cerrar sesión</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;