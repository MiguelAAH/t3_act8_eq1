import React from "react";
import "./inicioVisuales.css"; // Crearemos sus estilos abajo

function Inicio({ user }) {
    // Obtenemos el nombre del usuario logueado en la API o usamos el tuyo por defecto
    const nombreUsuario = user && user.firstName ? `${user.firstName} ${user.lastName}` : "Miguel Alonso";

    return (
        <div className="panelInicio">
            <h1 className="bienvenida-titulo">!Bienvenido de nuevo, {nombreUsuario}!</h1>
            <p className="fecha-resumen">Resumen de la tienda para hoy 13 de Julio 2026</p>

            <div className="contenedor-tarjetas">
                <div className="tarjeta-resumen">
                    <h3>Resumen de ventas</h3>
                    <p className="tarjeta-monto">$1240.60</p>
                </div>

                <div className="tarjeta-resumen">
                    <h3>Pedidos pendientes</h3>
                    <p className="tarjeta-monto">10</p>
                </div>
            </div>
        </div>
    );
}

export default Inicio;