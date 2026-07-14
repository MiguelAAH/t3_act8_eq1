export const login = async (username, password) => {
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

    return data;
};
