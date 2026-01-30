"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./navItems";

interface AdminSidebarProps {
    variant?: "desktop" | "mobile";
}

export default function AdminSidebar({ variant = "desktop" }: AdminSidebarProps) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    };

    const isDesktop = variant === "desktop";
    const asideClasses = isDesktop
        ? "w-64 flex-shrink-0 bg-white border-r border-[#dcdae7] z-20 h-full overflow-y-auto hidden md:flex"
        : "w-72 flex-shrink-0 bg-white border-r border-[#dcdae7] z-20 h-full overflow-y-auto flex";

    return (
        <aside className={asideClasses}>
            <div className="p-6 flex flex-col gap-1">
                {/* Logo */}
                <div className="mb-8">
                    <img src="/logo.png" alt="TecnoVision" className="h-10 w-auto" />
                    <p className="text-[#645e8d] text-[10px] font-normal mt-1 uppercase tracking-tighter opacity-70">Admin Panel</p>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive(item.href)
                                ? "bg-primary/10 text-primary"
                                : "text-[#645e8d] hover:bg-[#f6f5f8] hover:text-primary"
                                }`}
                        >
                            <span className={`material-symbols-outlined ${isActive(item.href) ? "fill" : ""} group-hover:text-primary transition-colors`}>
                                {item.icon}
                            </span>
                            <span className={`text-sm ${isActive(item.href) ? "font-bold" : "font-medium"}`}>
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* User Profile Footer */}
            <div className="mt-auto p-6 border-t border-[#dcdae7]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                        <img
                            className="object-cover w-full h-full"
                            alt="Admin User Profile"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdpJO57QXABxN_0GLaXF3eizEmT74rpK89lXAwrNR11A8vYCnST8oqWYNDKHoJji4Bvi-_JVXfXvse0ASOZmX34RQSWMN5m4Q6QZzRbo6Fzx9PMOJeDWL0d_8X5yqtJkwUW4lcEnBD15jSZhc6E-YnjrXHWdE7BdKMfY9d-xatE7TdK_hlNLg6B9IcwStaoe7lBKJza5_735K3eRjuTi4WbuQqyrvR64_rZvTYSMQ4PdsJBBS0nN-R8pjfBYfRqlH1yJiCQ2npeuGU"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-semibold text-text-main">Admin User</p>
                        <p className="text-xs text-[#645e8d]">admin@tecnovision.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
