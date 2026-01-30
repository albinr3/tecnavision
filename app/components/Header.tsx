"use client";

import { useEffect, useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (typeof document === "undefined") return;
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const handleNavClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-[#e7e6f4] bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
                    <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                        <img src="/logo.png" alt="TecnoVision" className="h-8 w-auto" />
                    </a>

                    <nav className="hidden md:flex items-center gap-8">
                    {/* Productos Dropdown */}
                    <div className="group relative">
                        <a className="flex items-center gap-1 text-[17px] font-medium text-text-main hover:text-primary transition-colors py-6 cursor-pointer" href="/products">
                            Productos
                            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:rotate-180">expand_more</span>
                        </a>

                        {/* Mega Menu Dropdown */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-[600px] bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 p-6 z-50">
                            <div className="grid grid-cols-2 gap-8">
                                {/* Column 1 */}
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="material-symbols-outlined text-primary">videocam</span>
                                            <h3 className="font-bold text-text-main text-sm uppercase tracking-wider">Cámaras de Seguridad</h3>
                                        </div>
                                        <ul className="space-y-2 pl-8 border-l border-gray-100">
                                            <li><a href="/products" className="text-sm text-text-sec-light hover:text-primary transition-colors block py-0.5">Cámaras de Interior</a></li>
                                            <li><a href="/products" className="text-sm text-text-sec-light hover:text-primary transition-colors block py-0.5">Seguridad Exterior</a></li>
                                            <li><a href="/products" className="text-sm text-text-sec-light hover:text-primary transition-colors block py-0.5">PTZ (Pan-Tilt-Zoom)</a></li>
                                            <li><a href="/products" className="text-sm text-text-sec-light hover:text-primary transition-colors block py-0.5">Térmicas e Industriales</a></li>
                                        </ul>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="material-symbols-outlined text-primary">dns</span>
                                            <h3 className="font-bold text-text-main text-sm uppercase tracking-wider">Grabadores (NVR)</h3>
                                        </div>
                                        <ul className="space-y-2 pl-8 border-l border-gray-100">
                                            <li><a href="#" className="text-sm text-text-sec-light hover:text-primary transition-colors block py-0.5">NVR Series 4K</a></li>
                                            <li><a href="#" className="text-sm text-text-sec-light hover:text-primary transition-colors block py-0.5">Sistemas Híbridos DVR</a></li>
                                            <li><a href="#" className="text-sm text-text-sec-light hover:text-primary transition-colors block py-0.5">Almacenamiento Cloud</a></li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Column 2 */}
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="material-symbols-outlined text-primary">lock_open</span>
                                            <h3 className="font-bold text-text-main text-sm uppercase tracking-wider">Control de Acceso</h3>
                                        </div>
                                        <ul className="space-y-2 pl-8 border-l border-gray-100">
                                            <li><a href="#" className="text-sm text-text-sec-light hover:text-primary transition-colors block py-0.5">Lectores Biométricos</a></li>
                                            <li><a href="#" className="text-sm text-text-sec-light hover:text-primary transition-colors block py-0.5">Cerraduras Inteligentes</a></li>
                                            <li><a href="#" className="text-sm text-text-sec-light hover:text-primary transition-colors block py-0.5">Intercomunicadores IP</a></li>
                                        </ul>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="material-symbols-outlined text-primary">cable</span>
                                            <h3 className="font-bold text-text-main text-sm uppercase tracking-wider">Accesorios</h3>
                                        </div>
                                        <ul className="space-y-2 pl-8 border-l border-gray-100">
                                            <li><a href="#" className="text-sm text-text-sec-light hover:text-primary transition-colors block py-0.5">Soportes y Monturas</a></li>
                                            <li><a href="#" className="text-sm text-text-sec-light hover:text-primary transition-colors block py-0.5">Cables Estructurados</a></li>
                                            <li><a href="#" className="text-sm text-text-sec-light hover:text-primary transition-colors block py-0.5">Fuentes de Poder PoE</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center bg-gray-50/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">hotel_class</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-text-main">¿Necesitas ayuda?</p>
                                        <p className="text-xs text-text-sec-light">Nuestros expertos te asesoran gratis</p>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-1">
                                    Contactar Soporte <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <a className="text-[17px] font-medium text-text-main hover:text-primary transition-colors" href="#">Soporte</a>
                    <a className="text-[17px] font-medium text-text-main hover:text-primary transition-colors" href="#">Blog</a>
                    <a className="text-[17px] font-bold text-text-main hover:text-primary transition-colors" href="/donde-comprar">¿Donde comprar?</a>
                </nav>

                    <div className="flex items-center gap-4">
                        <a href="/contacto" className="hidden sm:flex h-10 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-primary-dark">
                            Solicitar cotización
                        </a>
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(true)}
                            className="flex md:hidden items-center justify-center p-2 text-text-main"
                            aria-label="Abrir menú"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-nav-drawer"
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />
            <aside
                id="mobile-nav-drawer"
                className={`fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                aria-hidden={!isMenuOpen}
            >
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <span className="text-sm font-semibold text-text-main">Menú</span>
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 text-text-main"
                        aria-label="Cerrar menú"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <nav className="flex flex-col gap-3 px-6 py-4 overflow-y-auto">
                    <div>
                        <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-text-sec-light">
                            Productos
                        </p>
                        <div className="flex flex-col gap-2">
                            <details className="group rounded-lg border border-gray-100 bg-white">
                                <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-sm font-semibold text-text-main hover:bg-background-subtle">
                                    Cámaras de Seguridad
                                    <span className="material-symbols-outlined text-[18px] transition-transform group-open:rotate-180">
                                        expand_more
                                    </span>
                                </summary>
                                <div className="flex flex-col gap-1 px-4 pb-2">
                                    <a href="/products" onClick={handleNavClick} className="py-1 text-sm text-text-sec-light hover:text-primary">
                                        Cámaras de Interior
                                    </a>
                                    <a href="/products" onClick={handleNavClick} className="py-1 text-sm text-text-sec-light hover:text-primary">
                                        Seguridad Exterior
                                    </a>
                                    <a href="/products" onClick={handleNavClick} className="py-1 text-sm text-text-sec-light hover:text-primary">
                                        PTZ (Pan-Tilt-Zoom)
                                    </a>
                                    <a href="/products" onClick={handleNavClick} className="py-1 text-sm text-text-sec-light hover:text-primary">
                                        Térmicas e Industriales
                                    </a>
                                </div>
                            </details>

                            <details className="group rounded-lg border border-gray-100 bg-white">
                                <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-sm font-semibold text-text-main hover:bg-background-subtle">
                                    Grabadores (NVR)
                                    <span className="material-symbols-outlined text-[18px] transition-transform group-open:rotate-180">
                                        expand_more
                                    </span>
                                </summary>
                                <div className="flex flex-col gap-1 px-4 pb-2">
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-text-sec-light hover:text-primary">
                                        NVR Series 4K
                                    </a>
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-text-sec-light hover:text-primary">
                                        Sistemas Híbridos DVR
                                    </a>
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-text-sec-light hover:text-primary">
                                        Almacenamiento Cloud
                                    </a>
                                </div>
                            </details>

                            <details className="group rounded-lg border border-gray-100 bg-white">
                                <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-sm font-semibold text-text-main hover:bg-background-subtle">
                                    Control de Acceso
                                    <span className="material-symbols-outlined text-[18px] transition-transform group-open:rotate-180">
                                        expand_more
                                    </span>
                                </summary>
                                <div className="flex flex-col gap-1 px-4 pb-2">
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-text-sec-light hover:text-primary">
                                        Lectores Biométricos
                                    </a>
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-text-sec-light hover:text-primary">
                                        Cerraduras Inteligentes
                                    </a>
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-text-sec-light hover:text-primary">
                                        Intercomunicadores IP
                                    </a>
                                </div>
                            </details>

                            <details className="group rounded-lg border border-gray-100 bg-white">
                                <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-sm font-semibold text-text-main hover:bg-background-subtle">
                                    Accesorios
                                    <span className="material-symbols-outlined text-[18px] transition-transform group-open:rotate-180">
                                        expand_more
                                    </span>
                                </summary>
                                <div className="flex flex-col gap-1 px-4 pb-2">
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-text-sec-light hover:text-primary">
                                        Soportes y Monturas
                                    </a>
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-text-sec-light hover:text-primary">
                                        Cables Estructurados
                                    </a>
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-text-sec-light hover:text-primary">
                                        Fuentes de Poder PoE
                                    </a>
                                </div>
                            </details>
                        </div>
                    </div>

                    <div className="my-2 h-px bg-gray-100" />
                    <a
                        href="#"
                        onClick={handleNavClick}
                        className="rounded-lg px-3 py-2 text-base font-medium text-text-main hover:bg-background-subtle"
                    >
                        Soporte
                    </a>
                    <a
                        href="#"
                        onClick={handleNavClick}
                        className="rounded-lg px-3 py-2 text-base font-medium text-text-main hover:bg-background-subtle"
                    >
                        Blog
                    </a>
                    <a
                        href="/donde-comprar"
                        onClick={handleNavClick}
                        className="rounded-lg px-3 py-2 text-base font-semibold text-primary hover:bg-primary/10"
                    >
                        ¿Dónde comprar?
                    </a>
                    <a
                        href="/contacto"
                        onClick={handleNavClick}
                        className="mt-2 flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white"
                    >
                        Solicitar cotización
                    </a>
                </nav>
            </aside>
        </>
    );
}
