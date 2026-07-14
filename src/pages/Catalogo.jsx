import React, { useState, useEffect } from "react";
import "./principalVisuales.css";
import lapizIcon from "../assets/img/lapiz.png";
import basuraIcon from "../assets/img/basura.png";
import Swal from "sweetalert2";

import Filtros from "../components/Filtros";
import TablaProductos from "../components/TablaProductos";
import ModalProducto from "../components/ModalProducto";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/servicioProductos";

function Catalogo() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

    const [paginaActual, setPaginaActual] = useState(1);
    const [registrosPorPagina, setRegistrosPorPagina] = useState(10);

    const [modalAbierto, setModalAbierto] = useState(false);
    const [editando, setEditando] = useState(false);
    const [productoIdActual, setProductoIdActual] = useState(null);
    const [valoresFormulario, setValoresFormulario] = useState({ title: "", price: "", category: "", description: "" });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setPaginaActual(parseInt(params.get("page")) || 1);
        setRegistrosPorPagina(parseInt(params.get("limit")) || 10);

        const handlePopState = () => {
            const currentParams = new URLSearchParams(window.location.search);
            setPaginaActual(parseInt(currentParams.get("page")) || 1);
            setRegistrosPorPagina(parseInt(currentParams.get("limit")) || 10);
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
        const obtenerProductos = async () => {
            try {
                setCargando(true);
                const data = await getProducts();
                setProductos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };
        obtenerProductos();
    }, []);

    const productosFiltrados = productos.filter((prod) => {
        const matchesSearch = prod.title.toLowerCase().includes(terminoBusqueda.toLowerCase());
        const matchesCategory = categoriaSeleccionada === "" || prod.category === categoriaSeleccionada;
        return matchesSearch && matchesCategory;
    });

    const totalPaginas = Math.ceil(productosFiltrados.length / registrosPorPagina) || 1;
    const paginaActiva = paginaActual > totalPaginas ? totalPaginas : paginaActual;
    const indiceInicio = (paginaActiva - 1) * registrosPorPagina;
    const registrosActuales = productosFiltrados.slice(indiceInicio, indiceInicio + registrosPorPagina);

    const manejarCambioPagina = (newPage) => {
        setPaginaActual(newPage);
        updateURL(newPage, registrosPorPagina);
    };

    const manejarCambioRegistrosPorPagina = (e) => {
        const newLimit = Number(e.target.value);
        setRegistrosPorPagina(newLimit);
        setPaginaActual(1);
        updateURL(1, newLimit);
    };

    const categorias = [...new Set(productos.map((p) => p.category))];

    const abrirModalCrear = () => {
        setEditando(false);
        setValoresFormulario({ title: "", price: "", category: "men's clothing", description: "" });
        setModalAbierto(true);
    };

    const abrirModalEditar = (product) => {
        setEditando(true);
        setProductoIdActual(product.id);
        setValoresFormulario({ title: product.title, price: product.price, category: product.category, description: product.description || "" });
        setModalAbierto(true);
    };

    const manejarEnvioFormulario = async (e) => {
        e.preventDefault();
        const productData = {
            title: valoresFormulario.title,
            price: parseFloat(valoresFormulario.price),
            category: valoresFormulario.category,
            description: valoresFormulario.description,
            image: "https://i.pravatar.cc/500",
            rating: { rate: 5.0, count: 1 }
        };

        if (editando) {
            Swal.fire({
                title: "¿Guardar cambios?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#ff7c43",
                confirmButtonText: "Sí, actualizar"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await updateProduct(productoIdActual, productData);
                        setProductos(productos.map(p => p.id === productoIdActual ? { ...p, ...productData } : p));
                        setModalAbierto(false);
                        Swal.fire({ icon: "success", title: "El producto ha sido actualizado", confirmButtonColor: "#ff7c43" });
                    } catch (err) { Swal.fire({ icon: "error", title: err.message }); }
                }
            });
        } else {
            try {
                await createProduct(productData);
                const localNewProduct = { ...productData, id: Math.max(...productos.map(p => p.id), 0) + 1 };
                setProductos([localNewProduct, ...productos]);
                setModalAbierto(false);
                Swal.fire({ icon: "success", title: "Producto agregado", confirmButtonColor: "#ff7c43" });
            } catch (err) { Swal.fire({ icon: "error", title: err.message }); }
        }
    };

    const manejarEliminarProducto = (id, name) => {
        Swal.fire({
            title: `¿Estás seguro de que deseas eliminar "${name}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteProduct(id);
                    setProductos(productos.filter(p => p.id !== id));
                    Swal.fire({ icon: "success", title: "¡Eliminado!", confirmButtonColor: "#ff7c43" });
                } catch (err) { Swal.fire({ icon: "error", title: err.message }); }
            }
        });
    };

    if (cargando) return <div className="panelPrincipal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><h2> Cargando catálogo...</h2></div>;
    if (error) return <div className="panelPrincipal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', color: 'red' }}><h2> Error: {error}</h2></div>;

    return (
        <div className="panelPrincipal">
            <div className="panelEncabezado">
                <h1>Catálogo de productos</h1>
                <button className="btnAgregar" id="botonAgregar" onClick={abrirModalCrear}>
                    <span id="Agregar">Agregar producto</span>
                </button>
            </div>

            <Filtros
                terminoBusqueda={terminoBusqueda}
                setTerminoBusqueda={setTerminoBusqueda}
                categoriaSeleccionada={categoriaSeleccionada}
                setCategoriaSeleccionada={setCategoriaSeleccionada}
                categorias={categorias}
                setPaginaActual={setPaginaActual}
            />

            <TablaProductos
                registrosActuales={registrosActuales}
                lapizIcon={lapizIcon}
                basuraIcon={basuraIcon}
                abrirModalEditar={abrirModalEditar}
                manejarEliminarProducto={manejarEliminarProducto}
            />

            <div className="panelPaginacion">
                <div>
                    Mostrar:
                    <select className="selectPaginacion" value={registrosPorPagina} onChange={manejarCambioRegistrosPorPagina}>
                        <option value="10">10 registros por página</option>
                        <option value="20">20 registros por página</option>
                        <option value="40">40 registros por página</option>
                        <option value="50">50 registros por página</option>
                    </select>
                </div>
                <div className="paginacion-paginas">
                    {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((page) => (
                        <button key={page} className={`pag-btn ${paginaActiva === page ? "active" : ""}`} onClick={() => manejarCambioPagina(page)}>{page}</button>
                    ))}
                </div>
            </div>

            {modalAbierto && (
                <ModalProducto
                    editando={editando}
                    valoresFormulario={valoresFormulario}
                    setValoresFormulario={setValoresFormulario}
                    manejarEnvioFormulario={manejarEnvioFormulario}
                    setModalAbierto={setModalAbierto}
                />
            )}
        </div>
    );
}

export default Catalogo;