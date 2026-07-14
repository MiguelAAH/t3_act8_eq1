import React from "react";
import "./configuracionVisuales.css";

function Configuracion() {
    return (
        <div className="panelConfiguracion">
            <h1 className="config-titulo">Configuración de tu cuenta</h1>
            <p className="config-subtitulo">Administra tu perfil, notificaciones y metodos de pago</p>

            <div className="config-grid">
                {/* Columna Izquierda */}
                <div className="config-columna">
                    {/* Tarjeta Perfil */}
                    <div className="tarjeta-config">
                        <h3>Perfil del usuario</h3>
                        <div className="form-group-config">
                            <label>Nombre</label>
                            <input type="text" value="Miguel Alonso Rodriguez Juarez" disabled />
                        </div>
                        <div className="form-group-config">
                            <label>Correo</label>
                            <input type="text" value="Miguel@gmail.com" disabled />
                        </div>
                        <button className="btn-config-naranja">Cambiar Contraseña</button>
                    </div>

                    {/* Tarjeta Métodos de Pago */}
                    <div className="tarjeta-config">
                        <h3>Metodos de pago</h3>
                        <div className="tarjeta-visa-info">
                            <span className="icono-tarjeta-simulado">💳</span>
                            <p>Visa ********1234</p>
                        </div>
                        <button className="btn-config-naranja">Añadir nuevo metodo</button>
                    </div>
                </div>

                {/* Columna Derecha */}
                <div className="config-columna">
                    {/* Tarjeta Notificaciones */}
                    <div className="tarjeta-config">
                        <h3>Notificaciones</h3>
                        <div className="switch-group-config">
                            <p>Notificar por correo de nuevos pedidos</p>
                            <label className="switch-simulado">
                                <input type="checkbox" defaultChecked disabled />
                                <span className="slider-switch checked"></span>
                            </label>
                        </div>
                        <div className="switch-group-config">
                            <p>Notificar por SMS de pagos confirmados</p>
                            <label className="switch-simulado">
                                <input type="checkbox" disabled />
                                <span className="slider-switch"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Configuracion;