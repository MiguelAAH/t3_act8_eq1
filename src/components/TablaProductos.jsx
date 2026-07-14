import React from "react";

function TablaProductos({ currentRecords, lapizIcon, basuraIcon, handleOpenEditModal, handleDeleteProduct }) {
    return (
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
                        {currentRecords.length > 0 ? (
                            currentRecords.map((prod) => (
                                <tr key={prod.id}>
                                    <td>{prod.title}</td>
                                    <td><b>{prod.category}</b></td>
                                    <td>${prod.price.toFixed(2)}</td>
                                    <td>⭐ {prod.rating?.rate || "N/A"} ({prod.rating?.count || 0})</td>
                                    <td>
                                        <button className="acciones-btn" onClick={() => handleOpenEditModal(prod)}>
                                            <img src={lapizIcon} alt="Editar" style={{ width: '16px', height: '16px', display: 'block' }} />
                                        </button>
                                        <button className="acciones-btn" onClick={() => handleDeleteProduct(prod.id, prod.title)}>
                                            <img src={basuraIcon} alt="Borrar" style={{ width: '16px', height: '16px', display: 'block' }} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                                    No se encontraron productos con los filtros aplicados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TablaProductos;