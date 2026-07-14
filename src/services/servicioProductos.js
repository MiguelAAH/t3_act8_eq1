const BASE_URL = 'https://fakestoreapi.com/products';

export const getProducts = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Error al obtener los productos");
    return await response.json();
};

export const createProduct = async (productData) => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error("Error al crear el producto");
    return await response.json();
};

export const updateProduct = async (id, productData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error("Error al actualizar el producto");
    return await response.json();
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error al eliminar el producto");
    return await response.json();
};
