import React from "react";

function ModalProducto({ editando, valoresFormulario, setValoresFormulario, manejarEnvioFormulario, setModalAbierto }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{editando ? "Editar Producto" : "Nuevo Producto"}</h2>
                <form onSubmit={manejarEnvioFormulario}>
                    <div className="form-group-modal">
                        <label>Título del producto</label>
                        <input
                            type="text"
                            value={valoresFormulario.title}
                            onChange={(e) => setValoresFormulario({ ...valoresFormulario, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group-modal" style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ flex: 1 }}>
                            <label>Precio ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={valoresFormulario.price}
                                onChange={(e) => setValoresFormulario({ ...valoresFormulario, price: e.target.value })}
                                required
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Categoría</label>
                            <select
                                value={valoresFormulario.category}
                                onChange={(e) => setValoresFormulario({ ...valoresFormulario, category: e.target.value })}
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
                            value={valoresFormulario.description}
                            onChange={(e) => setValoresFormulario({ ...valoresFormulario, description: e.target.value })}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancelar" onClick={() => setModalAbierto(false)}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-guardar">
                            {editando ? "Guardar cambios" : "Agregar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalProducto;