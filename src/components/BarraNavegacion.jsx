import React, { useState } from "react";
import "./navbarVisuales.css";
import usuarioIcon from "../assets/img/usuario.png";
import flechaAbajoIcon from "../assets/img/flecha-abajo.png";

function BarraNavegacion({ user, onLogout }) {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const alternarMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    return (
        <div className="navbar">
            <div className="user-menu-container">
                <button className="user-btn" id="botonUsuario" onClick={alternarMenu}>
                    <img className="nav-user-icon" src={user?.image || usuarioIcon} alt="user" />
                    <span id="nombreUsuario">{user?.firstName ? `${user.firstName} ${user.lastName}` : "Usuario"}</span>
                    <img src={flechaAbajoIcon} className="nav-flecha" alt="flecha" />
                </button>
                <ul className={`dropdown-content ${menuAbierto ? 'mostrar' : ''}`} id="dropdownOpciones">
                    <li><a href="#" id="botonPerfil">Perfil</a></li>
                    <li><a href="#" id="botonCerrar" onClick={(e) => { e.preventDefault(); onLogout && onLogout(); }}>Cerrar sesión</a></li>
                </ul>
            </div>
        </div>
    )
}

export default BarraNavegacion;