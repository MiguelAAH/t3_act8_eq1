import React, { useState } from "react";
import "./sidebarVisuales.css";
import logoTienda from "../assets/img/Logo_Tienda.png";
import casaIcon from "../assets/img/casa.png";
import bolsaIcon from "../assets/img/bolsa.png";
import ajustesIcon from "../assets/img/ajustes.png";

function BarraLateral({ currentView, setCurrentView, abierto, setAbierto }) {

    const handleNav = (view) => {
        setCurrentView(view);
        setAbierto(false);
    };

    return (
        <>

            {abierto && (
                <div className="sidebar-overlay" onClick={() => setAbierto(false)} />
            )}

            <div className={`sidebar${abierto ? ' sidebar-open' : ''}`}>
                <div className="sidebar-logo">
                    <img src={logoTienda} alt="Logo" />
                </div>

                <div className="sidebar-options">
                    <button
                        className={currentView === 'inicio' ? 'active' : ''}
                        onClick={() => handleNav('inicio')}
                    >
                        <img src={casaIcon} alt="Inicio" />
                        <span>Inicio</span>
                    </button>

                    <button
                        className={currentView === 'catalogo' ? 'active' : ''}
                        onClick={() => handleNav('catalogo')}
                    >
                        <img src={bolsaIcon} alt="Catálogo" />
                        <span>Catálogo</span>
                    </button>

                    <button
                        className={currentView === 'configuracion' ? 'active' : ''}
                        onClick={() => handleNav('configuracion')}
                    >
                        <img src={ajustesIcon} alt="Configuración" />
                        <span>Configuración</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default BarraLateral;