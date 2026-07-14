import React from "react";

function ModalProducto({ isEditing, formValues, setFormValues, handleFormSubmit, setIsModalOpen }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{isEditing ? "Editar Producto" : "Nuevo Producto"}</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group-modal">
                        <label>Título del producto</label>
                        <input
                            type="text"
                            value={formValues.title}
                            onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group-modal" style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ flex: 1 }}>
                            <label>Precio ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={formValues.price}
                                onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                                required
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Categoría</label>
                            <select
                                value={formValues.category}
                                onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
                                required
                            >
                                <option value="men's clothing">men's clothing</option>
                                <option value="jewelery">jewelery</option>
                                <option value="electronics">electronics</option>
                                <option value="women's clothing">women's clothing</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group-modal">
                        <label>Descripción</label>
                        <textarea
                            rows="3"
                            value={formValues.description}
                            onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancelar" onClick={() => setIsModalOpen(false)}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-guardar">
                            {isEditing ? "Guardar cambios" : "Agregar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalProducto;