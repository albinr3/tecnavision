"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchFilters from "./SearchFilters";
import DistributorCard from "./DistributorCard";

export default function DondeComprarPage() {
    const [distributors, setDistributors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState("");
    const [searchState, setSearchState] = useState("");
    const [displayCount, setDisplayCount] = useState(6);

    const fetchDistributors = async (name: string = "", state: string = "") => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (name) params.append("search", name);
            if (state) params.append("state", state);

            const response = await fetch(`/api/distributors?${params.toString()}`);
            const data = await response.json();
            setDistributors(data);
            setDisplayCount(6); // Reset to 6 when new search
        } catch (error) {
            console.error("Error fetching distributors:", error);
            setDistributors([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDistributors();
    }, []);

    const handleSearch = (name: string, state: string) => {
        setSearchName(name);
        setSearchState(state);
        fetchDistributors(name, state);
    };

    const handleLoadMore = () => {
        setDisplayCount(prev => prev + 6);
    };

    const displayedDistributors = distributors.slice(0, displayCount);
    const hasMore = displayCount < distributors.length;

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Header />

            <main className="flex flex-col flex-grow">
                {/* Hero Section with Map Background */}
                <section className="relative bg-surface-light py-12 lg:py-16 overflow-hidden">
                    {/* Abstract Map Pattern Background */}
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(#1301b2 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    ></div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-4xl mx-auto text-center mb-10">
                            <h1 className="text-text-main text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                                Encuentra un Distribuidor
                            </h1>
                            <p className="text-text-secondary text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
                                Red nacional de expertos certificados en seguridad TecnoVision. Calidad y servicio garantizado cerca de ti.
                            </p>
                        </div>
                        {/* Search Filter Box */}
                        <SearchFilters onSearch={handleSearch} />
                    </div>
                </section>

                {/* Results Section */}
                <section className="flex-1 bg-white py-12 border-t border-slate-100">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-text-main">Resultados de Búsqueda</h2>
                            <span className="text-sm font-medium text-text-secondary bg-slate-100 px-3 py-1 rounded-full">
                                {loading ? "Cargando..." : `${distributors.length} Distribuidores encontrados`}
                            </span>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        )}

                        {/* No Results */}
                        {!loading && distributors.length === 0 && (
                            <div className="text-center py-20">
                                <div className="size-20 mx-auto mb-4 rounded-full bg-surface-light flex items-center justify-center text-text-secondary">
                                    <span className="material-symbols-outlined text-4xl">search_off</span>
                                </div>
                                <h3 className="text-xl font-bold text-text-main mb-2">No se encontraron distribuidores</h3>
                                <p className="text-text-secondary">
                                    Intenta ajustar tus filtros de búsqueda o{" "}
                                    <button
                                        onClick={() => handleSearch("", "")}
                                        className="text-primary font-semibold hover:underline"
                                    >
                                        ver todos los distribuidores
                                    </button>
                                </p>
                            </div>
                        )}

                        {/* Grid Layout */}
                        {!loading && distributors.length > 0 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {displayedDistributors.map((distributor) => (
                                        <DistributorCard key={distributor.id} {...distributor} />
                                    ))}
                                </div>
                                {/* Load More Button */}
                                {hasMore && (
                                    <div className="mt-12 flex justify-center">
                                        <button
                                            onClick={handleLoadMore}
                                            className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 bg-white text-text-main font-medium hover:bg-gray-50 transition-colors shadow-sm"
                                        >
                                            Cargar más resultados
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                {/* Mini Map Visualization Section */}
                <section className="py-16 bg-surface-light border-t border-slate-100">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1 space-y-6">
                                <h2 className="text-3xl font-bold text-text-main">Cobertura Nacional</h2>
                                <p className="text-text-secondary text-lg">
                                    Con más de 50 puntos de venta y soporte técnico en todo el país, siempre tendrás un experto TecnoVision cerca de ti para asesorarte en tus proyectos de seguridad.
                                </p>
                                <ul className="space-y-4 pt-2">
                                    <li className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-sm">check</span>
                                        </div>
                                        <span className="text-text-main font-medium">Soporte Técnico Certificado</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-sm">check</span>
                                        </div>
                                        <span className="text-text-main font-medium">Inventario Disponible Inmediato</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-sm">check</span>
                                        </div>
                                        <span className="text-text-main font-medium">Garantía Extendida Directa</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1 w-full max-w-lg">
                                <div className="relative w-full aspect-[4/3] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                                    {/* Placeholder for Map Visualization */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{
                                            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbr1isMVK9sEKlql2WuTu_i3ftrMEFIuHESXy38nBMJLZ4r_0FdyA4oKrzUiTyc7ewURO324D98KYyvpC8DabtyX0APEjzUF3ZJ-OKc4lQLU9jRxBeM2ecYyLob0H9DwA_ef2-uH6wGzp_zimTf7ufhSWKFV00F58OSH_E3_K_VmEaM26r3SB3GwJJ2lz-3fkCvVgQeruJj6KhPs05nY23Y8jC5Jm2j-5spWWmDWhB3L6acELd5mZlz8eC5C2C5wAXjoIIbg0eBlRE')",
                                            opacity: 0.8,
                                        }}
                                    ></div>
                                    <div className="absolute inset-0 bg-primary/10"></div>
                                    {/* Decorative Map Pins */}
                                    <div className="absolute top-1/4 left-1/3 size-4 bg-primary border-2 border-white rounded-full shadow-lg animate-pulse"></div>
                                    <div className="absolute top-1/2 left-1/2 size-4 bg-primary border-2 border-white rounded-full shadow-lg"></div>
                                    <div className="absolute bottom-1/3 right-1/4 size-4 bg-primary border-2 border-white rounded-full shadow-lg"></div>
                                    <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary rounded-lg text-white">
                                                <span className="material-symbols-outlined">public</span>
                                            </div>
                                            <div>
                                                <p className="text-xs text-text-secondary uppercase tracking-wider font-bold">
                                                    Presencia Global
                                                </p>
                                                <p className="text-sm text-text-main font-bold">México, LATAM y USA</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
                        <div className="flex flex-col gap-4 max-w-sm">
                            <div className="flex items-center gap-2 text-text-main">
                                <div className="size-6 text-primary">
                                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                                <span className="text-xl font-bold">TecnoVision</span>
                            </div>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                Líderes en innovación y tecnología de seguridad. Protegiendo lo que más importa desde 2010.
                            </p>
                        </div>
                        <div className="flex gap-16 flex-wrap">
                            <div className="flex flex-col gap-4">
                                <h4 className="text-text-main font-bold">Compañía</h4>
                                <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Nosotros</a>
                                <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Carreras</a>
                                <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Prensa</a>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="text-text-main font-bold">Soporte</h4>
                                <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Centro de Ayuda</a>
                                <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Garantías</a>
                                <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Manuales</a>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="text-text-main font-bold">Legal</h4>
                                <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Privacidad</a>
                                <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Términos</a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-text-secondary text-sm">© 2024 TecnoVision. Todos los derechos reservados.</p>
                        <div className="flex gap-4">
                            <a className="text-text-secondary hover:text-primary transition-colors" href="#">
                                <span className="material-symbols-outlined text-lg">public</span>
                            </a>
                            <a className="text-text-secondary hover:text-primary transition-colors" href="#">
                                <span className="material-symbols-outlined text-lg">mail</span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
