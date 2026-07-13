import React from "react";
import "./sidebarVisuales.css";
import logoTienda from "../assets/img/Logo_Tienda.png";
import casaIcon from "../assets/img/casa.png";
import bolsaIcon from "../assets/img/bolsa.png";
import ajustesIcon from "../assets/img/ajustes.png";

function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="brand-logo"><img src={logoTienda} alt="logo-empresa" className="logo-empresa" /></h2>

            <ul>
                <li>
                    <label className="menu-btn" htmlFor="btn-inicio">
                        <img src={casaIcon} className="icono" alt="inicio" /> Inicio
                    </label>
                </li>

                <li>
                    <label className="menu-btn" htmlFor="btn-catalogo">
                        <img src={bolsaIcon} className="icono" alt="catalogo" /> Catalogo
                    </label>
                </li>

                <li>
                    <label className="menu-btn" htmlFor="btn-configuracion">
                        <img src={ajustesIcon} className="icono" alt="configuracion" /> Configuración
                    </label>
                </li>
            </ul>
        </div>
    )
}
export default Sidebar;