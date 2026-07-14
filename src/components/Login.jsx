import { useState } from 'react';
import './Login.css';

import electroImage from '../assets/img/electro.avif';
import logoImage from '../assets/img/logo2.jpg';

// 🌟 AJUSTE 1: Agrega "{ onLoginSuccess }" aquí adentro de los paréntesis
function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Credenciales incorrectas');
            }

            // Registro silencioso en consola para desarrollo
            console.log("Login exitoso. Datos de usuario:", data);

            // 🌟 AJUSTE 2: Ejecuta la función de éxito pasándole los datos del usuario.
            // Esto cambiará de golpe el estado en App.jsx para mostrar el catálogo.
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
                                    type="password"
                                    id="password"
                                    placeholder="Ingresa tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && <p className="error-message">⚠️ {error}</p>}

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

export default Login;