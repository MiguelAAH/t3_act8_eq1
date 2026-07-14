import { useState } from 'react';
import './Login.css';
import { login } from '../services/servicioAutenticacion';

import electroImage from '../assets/img/electro.avif';
import logoImage from '../assets/img/logo2.jpg';

function InicioSesion({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await login(username, password);

            console.log("Login exitoso. Datos de usuario:", data);

            if (onLoginSuccess) {
                onLoginSuccess(data);
            }

            setUsername('');
            setPassword('');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div
                className="login-left"
                style={{ backgroundImage: `url(${electroImage})` }}
            ></div>
            <div className="login-right">
                <div className="login-form-content">
                    <div className="logo-container">
                        <img src={logoImage} alt="Logo Tewiin" className="tewiin-logo" />
                    </div>

                    <h1 className="login-title">Iniciar Sesión</h1>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Nombre de Usuario</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Ej. emilys"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="password-header">
                                <label htmlFor="password">Contraseña</label>
                                <a href="#" className="forgot-password">¿Haz olvidado tu contraseña?</a>
                            </div>
                            <div className="password-input-wrapper">
                                <input
                                    type={mostrarPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Ingresa tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setMostrarPassword(!mostrarPassword)}
                                    aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {mostrarPassword ? (
                                        /* Ojo tachado — ocultar */
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        /* Ojo abierto — mostrar */
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && <p className="error-message"> {error}</p>}

                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? 'Validando...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <p className="register-text">
                        ¿Todavia no tienes una cuenta? <a href="#" className="register-link">Cree una ahora</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default InicioSesion;