import React, { useState, useEffect } from "react";
import "./principalVisuales.css";
import lapizIcon from "../assets/img/lapiz.png";
import basuraIcon from "../assets/img/basura.png";
import Swal from "sweetalert2";

// 🌟 Importamos los nuevos componentes reutilizables
import Filtros from "./Filtros";
import TablaProductos from "./TablaProductos";
import ModalProducto from "./ModalProducto";

function ContenidoInterfaz() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [formValues, setFormValues] = useState({ title: "", price: "", category: "", description: "" });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setCurrentPage(parseInt(params.get("page")) || 1);
        setRecordsPerPage(parseInt(params.get("limit")) || 10);

        const handlePopState = () => {
            const currentParams = new URLSearchParams(window.location.search);
            setCurrentPage(parseInt(currentParams.get("page")) || 1);
            setRecordsPerPage(parseInt(currentParams.get("limit")) || 10);
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    const updateURL = (page, limit) => {
        const params = new URLSearchParams();
        params.set("page", page);
        params.set("limit", limit);
        window.history.pushState({}, "", `?${params.toString()}`);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch("https://fakestoreapi.com/products");
                if (!response.ok) throw new Error("Error al obtener los productos");
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter((prod) => {
        const matchesSearch = prod.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "" || prod.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredProducts.length / recordsPerPage) || 1;
    const activePage = currentPage > totalPages ? totalPages : currentPage;
    const startIndex = (activePage - 1) * recordsPerPage;
    const currentRecords = filteredProducts.slice(startIndex, startIndex + recordsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        updateURL(newPage, recordsPerPage);
    };

    const handleRecordsPerPageChange = (e) => {
        const newLimit = Number(e.target.value);
        setRecordsPerPage(newLimit);
        setCurrentPage(1);
        updateURL(1, newLimit);
    };

    const categories = [...new Set(products.map((p) => p.category))];

    const handleOpenCreateModal = () => {
        setIsEditing(false);
        setFormValues({ title: "", price: "", category: "men's clothing", description: "" });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (product) => {
        setIsEditing(true);
        setCurrentProductId(product.id);
        setFormValues({ title: product.title, price: product.price, category: product.category, description: product.description || "" });
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            title: formValues.title,
            price: parseFloat(formValues.price),
            category: formValues.category,
            description: formValues.description,
            image: "https://i.pravatar.cc/500",
            rating: { rate: 5.0, count: 1 }
        };

        if (isEditing) {
            Swal.fire({
                title: "¿Guardar cambios?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#ff7c43",
                confirmButtonText: "Sí, actualizar"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await fetch(`https://fakestoreapi.com/products/${currentProductId}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(productData)
                        });
                        if (response.ok) {
                            setProducts(products.map(p => p.id === currentProductId ? { ...p, ...productData } : p));
                            setIsModalOpen(false);
                            Swal.fire({ icon: "success", title: "El producto ha sido actualizado", confirmButtonColor: "#ff7c43" });
                        }
                    } catch (err) { Swal.fire({ icon: "error", title: err.message }); }
                }
            });
        } else {
            try {
                const response = await fetch("https://fakestoreapi.com/products", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(productData)
                });
                if (response.ok) {
                    const localNewProduct = { ...productData, id: Math.max(...products.map(p => p.id), 0) + 1 };
                    setProducts([localNewProduct, ...products]);
                    setIsModalOpen(false);
                    Swal.fire({ icon: "success", title: "Producto agregado", confirmButtonColor: "#ff7c43" });
                }
            } catch (err) { Swal.fire({ icon: "error", title: err.message }); }
        }
    };

    const handleDeleteProduct = (id, name) => {
        Swal.fire({
            title: `¿Estás seguro de que deseas eliminar "${name}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" });
                    if (response.ok) {
                        setProducts(products.filter(p => p.id !== id));
                        Swal.fire({ icon: "success", title: "¡Eliminado!", confirmButtonColor: "#ff7c43" });
                    }
                } catch (err) { Swal.fire({ icon: "error", title: err.message }); }
            }
        });
    };

    if (loading) return <div className="panelPrincipal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><h2> Cargando catálogo...</h2></div>;
    if (error) return <div className="panelPrincipal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', color: 'red' }}><h2> Error: {error}</h2></div>;

    return (
        <div className="panelPrincipal">
            <div className="panelEncabezado">
                <h1>Catálogo de productos</h1>
                <button className="btnAgregar" id="botonAgregar" onClick={handleOpenCreateModal}>
                    <span id="Agregar">Agregar producto</span>
                </button>
            </div>

            {/* 🌟 USAMOS LOS COMPONENTES MODULARES AQUÍ */}
            <Filtros
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
                setCurrentPage={setCurrentPage}
            />

            <TablaProductos
                currentRecords={currentRecords}
                lapizIcon={lapizIcon}
                basuraIcon={basuraIcon}
                handleOpenEditModal={handleOpenEditModal}
                handleDeleteProduct={handleDeleteProduct}
            />

            <div className="panelPaginacion">
                <div>
                    Mostrar:
                    <select className="selectPaginacion" value={recordsPerPage} onChange={handleRecordsPerPageChange}>
                        <option value="10">10 registros por página</option>
                        <option value="20">20 registros por página</option>
                        <option value="40">40 registros por página</option>
                        <option value="50">50 registros por página</option>
                    </select>
                </div>
                <div className="paginacion-paginas">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button key={page} className={`pag-btn ${activePage === page ? "active" : ""}`} onClick={() => handlePageChange(page)}>{page}</button>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <ModalProducto
                    isEditing={isEditing}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    handleFormSubmit={handleFormSubmit}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </div>
    );
}

export default ContenidoInterfaz;