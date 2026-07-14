import React from "react";

function Filtros({ terminoBusqueda, setTerminoBusqueda, categoriaSeleccionada, setCategoriaSeleccionada, categorias, setPaginaActual }) {
    return (
        <div className="panelFiltros">
            <input
                className="inputFiltro"
                type="text"
                placeholder="Buscar Producto..."
                value={terminoBusqueda}
                onChange={(e) => { setTerminoBusqueda(e.target.value); setPaginaActual(1); }}
            />

            <select
                className="inputFiltro"
                value={categoriaSeleccionada}
                onChange={(e) => { setCategoriaSeleccionada(e.target.value); setPaginaActual(1); }}
            >
                <option value="">Todas las categorías</option>
                {categorias.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
        </div>
    );
}

export default Filtros;