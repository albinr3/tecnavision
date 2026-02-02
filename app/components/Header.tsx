"use client";

import { useEffect, useState } from "react";
import ThemeLogo from "./ThemeLogo";
import ThemeToggle from "./ThemeToggle";

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
            <header className="sticky top-0 z-50 w-full border-b border-app-border bg-app-surface/80 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
                    <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                        <ThemeLogo className="h-8 w-auto" />
                    </a>

                    <nav className="hidden md:flex items-center gap-8">
                    {/* Productos Dropdown */}
                    <div className="group relative">
                        <a className="flex items-center gap-1 text-[17px] font-medium text-app-text hover:text-primary transition-colors py-6 px-3 -mx-1 rounded-xl dark:hover:bg-white dark:hover:text-primary cursor-pointer" href="/products">
                            Productos
                            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:rotate-180">expand_more</span>
                        </a>

                        {/* Mega Menu Dropdown */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-[600px] bg-app-surface rounded-2xl shadow-xl border border-app-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 p-6 z-50">
                            <div className="grid grid-cols-2 gap-8">
                                {/* Column 1 */}
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 dark:bg-white text-primary shrink-0">
                                                <span className="material-symbols-outlined text-[22px]">videocam</span>
                                            </span>
                                            <h3 className="font-bold text-app-text text-sm uppercase tracking-wider">Cámaras de Seguridad</h3>
                                        </div>
                                        <ul className="space-y-2 pl-8 border-l border-app-border">
                                            <li><a href="/products" className="text-sm text-app-text-sec hover:text-primary transition-colors block py-0.5">Cámaras de Interior</a></li>
                                            <li><a href="/products" className="text-sm text-app-text-sec hover:text-primary transition-colors block py-0.5">Seguridad Exterior</a></li>
                                            <li><a href="/products" className="text-sm text-app-text-sec hover:text-primary transition-colors block py-0.5">PTZ (Pan-Tilt-Zoom)</a></li>
                                            <li><a href="/products" className="text-sm text-app-text-sec hover:text-primary transition-colors block py-0.5">Térmicas e Industriales</a></li>
                                        </ul>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 dark:bg-white text-primary shrink-0">
                                                <span className="material-symbols-outlined text-[22px]">dns</span>
                                            </span>
                                            <h3 className="font-bold text-app-text text-sm uppercase tracking-wider">Grabadores (NVR)</h3>
                                        </div>
                                        <ul className="space-y-2 pl-8 border-l border-app-border">
                                            <li><a href="#" className="text-sm text-app-text-sec hover:text-primary transition-colors block py-0.5">NVR Series 4K</a></li>
                                            <li><a href="#" className="text-sm text-app-text-sec hover:text-primary transition-colors block py-0.5">Sistemas Híbridos DVR</a></li>
                                            <li><a href="#" className="text-sm text-app-text-sec hover:text-primary transition-colors block py-0.5">Almacenamiento Cloud</a></li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Column 2 */}
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 dark:bg-white text-primary shrink-0">
                                                <span className="material-symbols-outlined text-[22px]">lock_open</span>
                                            </span>
                                            <h3 className="font-bold text-app-text text-sm uppercase tracking-wider">Control de Acceso</h3>
                                        </div>
                                        <ul className="space-y-2 pl-8 border-l border-app-border">
                                            <li><a href="#" className="text-sm text-app-text-sec hover:text-primary transition-colors block py-0.5">Lectores Biométricos</a></li>
                                            <li><a href="#" className="text-sm text-app-text-sec hover:text-primary transition-colors block py-0.5">Cerraduras Inteligentes</a></li>
                                            <li><a href="#" className="text-sm text-app-text-sec hover:text-primary transition-colors block py-0.5">Intercomunicadores IP</a></li>
                                        </ul>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 dark:bg-white text-primary shrink-0">
                                                <span className="material-symbols-outlined text-[22px]">cable</span>
                                            </span>
                                            <h3 className="font-bold text-app-text text-sm uppercase tracking-wider">Accesorios</h3>
                                        </div>
                                        <ul className="space-y-2 pl-8 border-l border-app-border">
                                            <li><a href="#" className="text-sm text-app-text-sec hover:text-primary transition-colors block py-0.5">Soportes y Monturas</a></li>
                                            <li><a href="#" className="text-sm text-app-text-sec hover:text-primary transition-colors block py-0.5">Cables Estructurados</a></li>
                                            <li><a href="#" className="text-sm text-app-text-sec hover:text-primary transition-colors block py-0.5">Fuentes de Poder PoE</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-app-border flex justify-between items-center bg-app-bg-subtle/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 bg-primary/10 dark:bg-white rounded-lg flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined">hotel_class</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-app-text">¿Necesitas ayuda?</p>
                                        <p className="text-xs text-app-text-sec">Nuestros expertos te asesoran gratis</p>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-1 dark:text-white dark:hover:text-white dark:font-extrabold">
                                    Contactar Soporte <span className="material-symbols-outlined text-[16px] dark:text-white">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <a className="text-[17px] font-medium text-app-text hover:text-primary transition-colors px-3 py-2 rounded-xl dark:hover:bg-white dark:hover:text-primary" href="#">Soporte</a>
                    <a className="text-[17px] font-medium text-app-text hover:text-primary transition-colors px-3 py-2 rounded-xl dark:hover:bg-white dark:hover:text-primary" href="#">Blog</a>
                    <a className="text-[17px] font-bold text-app-text hover:text-primary transition-colors px-3 py-2 rounded-xl dark:hover:bg-white dark:hover:text-primary" href="/donde-comprar">¿Donde comprar?</a>
                </nav>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <a href="/contacto" className="hidden sm:flex h-10 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-primary-dark">
                            Solicitar cotización
                        </a>
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(true)}
                            className="flex md:hidden items-center justify-center p-2 text-app-text"
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
                className={`fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-app-surface shadow-2xl transform transition-transform md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                aria-hidden={!isMenuOpen}
            >
                <div className="flex items-center justify-between border-b border-app-border px-6 py-4">
                    <ThemeLogo className="h-8 w-auto" />
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 text-app-text"
                        aria-label="Cerrar menú"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <nav className="flex flex-col gap-3 px-6 py-4 overflow-y-auto">
                    <div>
                        <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-app-text-sec">
                            Productos
                        </p>
                        <div className="flex flex-col gap-2">
                            <details className="group rounded-lg border border-app-border bg-app-surface">
                                <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-sm font-semibold text-app-text hover:bg-app-bg-subtle">
                                    Cámaras de Seguridad
                                    <span className="material-symbols-outlined text-[18px] transition-transform group-open:rotate-180">
                                        expand_more
                                    </span>
                                </summary>
                                <div className="flex flex-col gap-1 px-4 pb-2">
                                    <a href="/products" onClick={handleNavClick} className="py-1 text-sm text-app-text-sec hover:text-primary">
                                        Cámaras de Interior
                                    </a>
                                    <a href="/products" onClick={handleNavClick} className="py-1 text-sm text-app-text-sec hover:text-primary">
                                        Seguridad Exterior
                                    </a>
                                    <a href="/products" onClick={handleNavClick} className="py-1 text-sm text-app-text-sec hover:text-primary">
                                        PTZ (Pan-Tilt-Zoom)
                                    </a>
                                    <a href="/products" onClick={handleNavClick} className="py-1 text-sm text-app-text-sec hover:text-primary">
                                        Térmicas e Industriales
                                    </a>
                                </div>
                            </details>

                            <details className="group rounded-lg border border-app-border bg-app-surface">
                                <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-sm font-semibold text-app-text hover:bg-app-bg-subtle">
                                    Grabadores (NVR)
                                    <span className="material-symbols-outlined text-[18px] transition-transform group-open:rotate-180">
                                        expand_more
                                    </span>
                                </summary>
                                <div className="flex flex-col gap-1 px-4 pb-2">
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-app-text-sec hover:text-primary">
                                        NVR Series 4K
                                    </a>
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-app-text-sec hover:text-primary">
                                        Sistemas Híbridos DVR
                                    </a>
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-app-text-sec hover:text-primary">
                                        Almacenamiento Cloud
                                    </a>
                                </div>
                            </details>

                            <details className="group rounded-lg border border-app-border bg-app-surface">
                                <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-sm font-semibold text-app-text hover:bg-app-bg-subtle">
                                    Control de Acceso
                                    <span className="material-symbols-outlined text-[18px] transition-transform group-open:rotate-180">
                                        expand_more
                                    </span>
                                </summary>
                                <div className="flex flex-col gap-1 px-4 pb-2">
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-app-text-sec hover:text-primary">
                                        Lectores Biométricos
                                    </a>
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-app-text-sec hover:text-primary">
                                        Cerraduras Inteligentes
                                    </a>
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-app-text-sec hover:text-primary">
                                        Intercomunicadores IP
                                    </a>
                                </div>
                            </details>

                            <details className="group rounded-lg border border-app-border bg-app-surface">
                                <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-sm font-semibold text-app-text hover:bg-app-bg-subtle">
                                    Accesorios
                                    <span className="material-symbols-outlined text-[18px] transition-transform group-open:rotate-180">
                                        expand_more
                                    </span>
                                </summary>
                                <div className="flex flex-col gap-1 px-4 pb-2">
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-app-text-sec hover:text-primary">
                                        Soportes y Monturas
                                    </a>
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-app-text-sec hover:text-primary">
                                        Cables Estructurados
                                    </a>
                                    <a href="#" onClick={handleNavClick} className="py-1 text-sm text-app-text-sec hover:text-primary">
                                        Fuentes de Poder PoE
                                    </a>
                                </div>
                            </details>
                        </div>
                    </div>

                    <div className="my-2 h-px bg-app-border" />
                    <a
                        href="#"
                        onClick={handleNavClick}
                        className="rounded-lg px-3 py-2 text-base font-medium text-app-text hover:bg-app-bg-subtle"
                    >
                        Soporte
                    </a>
                    <a
                        href="#"
                        onClick={handleNavClick}
                        className="rounded-lg px-3 py-2 text-base font-medium text-app-text hover:bg-app-bg-subtle"
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
                    <div className="mt-2 flex items-center justify-between rounded-lg px-3 py-2">
                        <span className="text-sm font-medium text-app-text-sec">Tema</span>
                        <ThemeToggle />
                    </div>
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
