"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "./AdminSidebar";
import { navItems } from "./navItems";

interface AdminShellProps {
    children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (typeof document === "undefined") return;
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    return (
        <div className="flex min-h-screen md:h-screen w-full overflow-hidden bg-[#f6f5f8] text-text-main antialiased">
            <AdminSidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-[#dcdae7]">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="TecnoVision" className="h-8 w-auto" />
                        <span className="text-sm font-semibold text-text-main">Admin</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(true)}
                        className="text-text-main p-2"
                        aria-label="Abrir menú"
                        aria-expanded={isMenuOpen}
                        aria-controls="admin-mobile-drawer"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>

                {children}
            </main>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />
            <aside
                id="admin-mobile-drawer"
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#dcdae7] transform transition-transform md:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                aria-hidden={!isMenuOpen}
            >
                <div className="flex items-center justify-between p-4 border-b border-[#dcdae7]">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="TecnoVision" className="h-8 w-auto" />
                        <span className="text-sm font-semibold text-text-main">Admin</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-text-main p-2"
                        aria-label="Cerrar menú"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <nav className="flex flex-col gap-2 p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#645e8d] hover:bg-[#f6f5f8] hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
        </div>
    );
}
