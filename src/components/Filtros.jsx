import React from "react";

function Filtros({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories, setCurrentPage }) {
    return (
        <div className="panelFiltros">
            <input
                className="inputFiltro"
                type="text"
                placeholder="Buscar Producto..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />

            <select
                className="inputFiltro"
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
            >
                <option value="">Todas las categorías</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
        </div>
    );
}

export default Filtros;