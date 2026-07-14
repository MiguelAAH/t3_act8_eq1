import React, { useState } from "react";
import "./principalVisuales.css";
import lapizIcon from "../assets/img/lapiz.png";
import basuraIcon from "../assets/img/basura.png";

function ContenidoInterfaz() {
    const mockProducts = [
        { id: 1, name: "Fjallraven - Foldsack No. 1", category: "men's clothing", price: 109.95, rating: 3.9, reviews: 120 },
        { id: 2, name: "John Hardy Women's Legends Naga...", category: "jewelery", price: 22.30, rating: 4.1, reviews: 259 },
        { id: 3, name: "WD 2TB Elements Portable External...", category: "electronics", price: 695.00, rating: 4.6, reviews: 400 },
        { id: 4, name: "BIYLACLESEN Women's 3-in-1 Snowboard...", category: "women's clothing", price: 64.00, rating: 3.3, reviews: 203 },
        { id: 5, name: "Mens Casual Premium Slim Fit T-Shirts", category: "men's clothing", price: 56.99, rating: 2.6, reviews: 235 },
        { id: 6, name: "Solid Gold Petite Micropave", category: "jewelery", price: 168.00, rating: 3.9, reviews: 70 },
        { id: 7, name: "White Gold Plated Princess", category: "jewelery", price: 9.99, rating: 3.0, reviews: 400 },
        { id: 8, name: "Pierced Owl Rose Gold Plated Stainless Steel", category: "jewelery", price: 10.99, rating: 1.9, reviews: 100 },
        { id: 9, name: "WD 4TB Gaming Drive Works", category: "electronics", price: 114.00, rating: 4.8, reviews: 400 },
        { id: 10, name: "Acer SB220Q bi 21.5 inches", category: "electronics", price: 599.00, rating: 2.9, reviews: 250 },
        { id: 11, name: "Samsung 49-Inch CHG90 144Hz Curved", category: "electronics", price: 999.99, rating: 2.2, reviews: 140 },
        { id: 12, name: "BIYLACLESEN Women's 3-in-1 Snowboard", category: "women's clothing", price: 56.99, rating: 2.6, reviews: 235 },
        { id: 13, name: "Lock and Love Women's Removable Hood", category: "women's clothing", price: 29.95, rating: 2.9, reviews: 340 },
        { id: 14, name: "Rain Jacket Women Windbreaker", category: "women's clothing", price: 39.99, rating: 3.8, reviews: 679 },
        { id: 15, name: "MBJ Women's Solid Short Sleeve", category: "women's clothing", price: 9.85, rating: 4.7, reviews: 130 },
    ];

    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(mockProducts.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const currentRecords = mockProducts.slice(startIndex, startIndex + recordsPerPage);

    const handleRecordsPerPageChange = (e) => {
        setRecordsPerPage(Number(e.target.value));
        setCurrentPage(1); // Volver a la primera página al cambiar la cantidad
    };

    return (
        <div className="panelPrincipal">
            <div className="panelEncabezado">
                <h1>Catálogo de productos</h1>
                <button className="btnAgregar" id="botonAgregar">
                    <span id="Agregar">Agregar producto</span>
                </button>
            </div>
            <div className="panelFiltros">
                <input className="inputFiltro" type="text" placeholder="Buscar Producto" />

                <select className="inputFiltro" defaultValue="">
                    <option value="" disabled hidden>Filtrar categoria</option>
                    <option value="men's clothing">men's clothing</option>
                    <option value="jewelery">jewelery</option>
                    <option value="electronics">electronics</option>
                    <option value="women's clothing">women's clothing</option>
                </select>

                <input 
                    type="number" 
                    className="inputFiltro" 
                    placeholder="Filtrar calificación (Ej: 4.5)" 
                    step="0.1" 
                    min="0" 
                    max="10" 
                />
                <button className="btnFiltrar" id="botonFiltrar">
                    <span id="Filtrar">Filtrar</span>
                </button>
            </div>

            <div className="panelTabla">
                <div className="tablaContainer">
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Categoria</th>
                                <th>Precio</th>
                                <th>Rating</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((prod) => (
                                <tr key={prod.id}>
                                    <td>{prod.name}</td>
                                    <td><b>{prod.category}</b></td>
                                    <td>${prod.price.toFixed(2)}</td>
                                    <td>⭐ {prod.rating} ({prod.reviews})</td>
                                    <td>
                                        <button className="acciones-btn">
                                            <img src={lapizIcon} alt="Editar" style={{ width: '16px', height: '16px', display: 'block' }} />
                                        </button>
                                        <button className="acciones-btn">
                                            <img src={basuraIcon} alt="Borrar" style={{ width: '16px', height: '16px', display: 'block' }} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="panelPaginacion">
                <div>
                    Mostrar:
                    <select className="selectPaginacion" value={recordsPerPage} onChange={handleRecordsPerPageChange}>
                        <option value="10">10 registros por página</option>
                        <option value="20">20 registros por página</option>
                        <option value="50">50 registros por página</option>
                    </select>
                </div>
                <div className="paginacion-paginas">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            className={`pag-btn ${currentPage === page ? "active" : ""}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ContenidoInterfaz;