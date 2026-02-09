import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { prisma } from "@/lib/db";
import Link from "next/link";
import type { Prisma } from "@prisma/client";

const PRODUCTS_PER_PAGE = 10;

export const metadata: Metadata = {
    title: "Catálogo de Productos - TecnaVision",
    description: "Explora nuestra gama completa de cámaras de seguridad con IA, visión nocturna y tecnología 4K.",
};

async function getProducts(categoryFilter?: string, searchFilter?: string, page = 1) {
    try {
        const filters: Prisma.ProductWhereInput[] = [];

        if (categoryFilter) {
            filters.push({
                category: {
                    is: {
                        OR: [
                            { slug: { equals: categoryFilter, mode: "insensitive" as const } },
                            { name: { contains: categoryFilter.replace(/-/g, " "), mode: "insensitive" as const } },
                        ],
                    },
                },
            });
        }

        if (searchFilter) {
            filters.push({
                OR: [
                    { name: { contains: searchFilter, mode: "insensitive" } },
                    { model: { contains: searchFilter, mode: "insensitive" } },
                    { subtitle: { contains: searchFilter, mode: "insensitive" } },
                    { description: { contains: searchFilter, mode: "insensitive" } },
                ],
            });
        }

        const where: Prisma.ProductWhereInput | undefined = filters.length > 0
            ? { AND: filters }
            : undefined;

        const total = await prisma.product.count({ where });
        const totalPages = Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE));
        const safePage = Math.min(Math.max(page, 1), totalPages);

        const items = await prisma.product.findMany({
            where,
            include: {
                category: true
            },
            orderBy: {
                createdAt: "desc"
            },
            skip: (safePage - 1) * PRODUCTS_PER_PAGE,
            take: PRODUCTS_PER_PAGE,
        });

        return { total, items, page: safePage, totalPages };
    } catch (error) {
        console.error("Error fetching products:", error);
        return { total: 0, items: [], page: 1, totalPages: 1 };
    }
}

type SearchParamsInput = Record<string, string | string[] | undefined>;

interface ShopPageProps {
    searchParams?: SearchParamsInput | Promise<SearchParamsInput>;
}

function resolveFirstParam(value: string | string[] | undefined) {
    if (Array.isArray(value)) return value[0] || "";
    return value || "";
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const resolvedSearchParams = searchParams
        ? ("then" in searchParams ? await searchParams : searchParams)
        : {};

    const requestedCategory = resolveFirstParam(resolvedSearchParams.category).trim();
    const requestedQuery = resolveFirstParam(resolvedSearchParams.q).trim();
    const requestedPage = Number.parseInt(resolveFirstParam(resolvedSearchParams.page), 10);
    const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
    const { total, items: products, page: safeCurrentPage, totalPages } = await getProducts(
        requestedCategory || undefined,
        requestedQuery || undefined,
        currentPage
    );
    const activeCategoryName = products[0]?.category?.name
        || (requestedCategory ? requestedCategory.replace(/-/g, " ") : "Todas las categorías");
    const createPageHref = (page: number) => {
        const params = new URLSearchParams();
        if (requestedCategory) params.set("category", requestedCategory);
        if (requestedQuery) params.set("q", requestedQuery);
        if (page > 1) params.set("page", String(page));
        const query = params.toString();
        return query ? `/products?${query}` : "/products";
    };

    return (
        <div className="bg-app-bg text-app-text antialiased selection:bg-primary selection:text-white min-h-screen flex flex-col">
            <Header />

            <div className="flex flex-1 w-full max-w-7xl mx-auto">
                {/* Sidebar Filters - Hidden on mobile, fixed on desktop */}
                <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-app-border bg-app-bg-subtle/50 p-6 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
                    <h3 className="text-lg font-bold mb-6 text-app-text">Filtros</h3>

                    {/* Categories */}
                    <div className="mb-8">
                        <h4 className="text-xs font-bold text-app-text-sec mb-4 uppercase tracking-wider">Categorías</h4>
                        <div className="space-y-3">
                            {["Cámaras de Interior", "Seguridad Exterior", "Soluciones para Negocios", "Hogar Inteligente"].map((item, i) => (
                                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        defaultChecked={i === 1}
                                        className="size-4 rounded border-app-border bg-transparent text-primary focus:ring-primary focus:ring-offset-app-surface"
                                    />
                                    <span className="text-sm text-app-text group-hover:text-primary transition-colors">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Resolution */}
                    <div className="mb-8">
                        <h4 className="text-xs font-bold text-app-text-sec mb-4 uppercase tracking-wider">Resolución</h4>
                        <div className="space-y-3">
                            {["2K QHD", "4K UHD", "8K Ultra"].map((item, i) => (
                                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="size-4 rounded border-app-border bg-transparent text-primary focus:ring-primary focus:ring-offset-app-surface" />
                                    <span className="text-sm text-app-text group-hover:text-primary transition-colors">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                        <h4 className="text-xs font-bold text-app-text-sec mb-4 uppercase tracking-wider">Características</h4>
                        <div className="space-y-3">
                            {["Visión Nocturna a Color", "Audio Bidireccional", "Detección de Personas con IA"].map((item, i) => (
                                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="size-4 rounded border-app-border bg-transparent text-primary focus:ring-primary focus:ring-offset-app-surface" />
                                    <span className="text-sm text-app-text group-hover:text-primary transition-colors">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col p-6 lg:p-10">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <Link className="text-app-text-sec text-sm font-medium hover:text-primary transition-colors" href="/">Inicio</Link>
                        <span className="text-gray-300 text-sm font-medium">/</span>
                        <Link className="text-app-text-sec text-sm font-medium hover:text-primary transition-colors" href="/products">Productos</Link>
                        <span className="text-gray-300 text-sm font-medium">/</span>
                        <span className="text-app-text text-sm font-medium">{activeCategoryName}</span>
                    </div>

                    {/* Controls Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <form action="/products" method="get" className="relative w-full md:max-w-md">
                            {requestedCategory && <input type="hidden" name="category" value={requestedCategory} />}
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-gray-400 text-xl">search</span>
                            </div>
                            <input
                                name="q"
                                defaultValue={requestedQuery}
                                className="block w-full pl-10 pr-4 py-3 border-none rounded-xl bg-app-bg-subtle text-app-text placeholder:text-app-text-sec focus:ring-2 focus:ring-primary sm:text-sm shadow-sm"
                                placeholder="Buscar modelo, SKU o característica..."
                            />
                        </form>
                        <div className="flex w-full flex-wrap items-center justify-between gap-3 md:w-auto md:justify-end">
                            <p className="text-app-text-sec text-sm whitespace-nowrap hidden sm:block">Mostrando {products.length} de {total} productos</p>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <span className="text-app-text-sec text-sm font-medium whitespace-nowrap">Ordenar por:</span>
                                <div className="relative">
                                    <select className="appearance-none bg-transparent border-none text-app-text text-sm font-bold pr-8 focus:ring-0 cursor-pointer">
                                        <option>Novedades</option>
                                        <option>Precio: Bajo a Alto</option>
                                        <option>Precio: Alto a Bajo</option>
                                        <option>Popularidad</option>
                                    </select>
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 material-symbols-outlined pointer-events-none text-app-text text-xl">expand_more</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.length === 0 ? (
                            <div className="col-span-full py-20 text-center">
                                <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">inventory_2</span>
                                <p className="text-app-text-sec">No se encontraron productos disponibles.</p>
                            </div>
                        ) : (
                            products.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.slug}`}
                                    className="group flex flex-col bg-app-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-app-border hover:border-primary/20"
                                >
                                    <div className="relative w-full aspect-square bg-app-bg-subtle p-6 flex items-center justify-center overflow-hidden">
                                        <img
                                            alt={product.name}
                                            className="object-contain w-full h-full mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
                                            src={product.mainImage || "/placeholder-camera.png"}
                                        />
                                        {product.badge && (
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{product.badge}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex-1">
                                            <h3 className="text-app-text text-lg font-bold mb-2 group-hover:text-primary transition-colors">{product.name} {product.model}</h3>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="text-[11px] font-medium text-app-text-sec bg-app-bg-subtle px-2 py-1 rounded-md">{product.category?.name || 'General'}</span>
                                                {product.resolutionOpts.slice(0, 2).map((opt) => (
                                                    <span key={opt} className="text-[11px] font-medium text-app-text-sec bg-app-bg-subtle px-2 py-1 rounded-md">{opt}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-4 w-full h-10 rounded-full bg-primary text-white hover:bg-primary-dark transition-all duration-300 text-sm font-bold flex items-center justify-center shadow-lg shadow-primary/20">
                                            Ver Detalles
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    {/* Pagination - Static for now */}
                    {total > PRODUCTS_PER_PAGE && (
                        <div className="mt-12 flex justify-center pb-12">
                            <nav className="flex flex-wrap items-center justify-center gap-2">
                                <Link
                                    href={createPageHref(Math.max(1, safeCurrentPage - 1))}
                                    aria-disabled={safeCurrentPage <= 1}
                                    className={`size-10 flex items-center justify-center rounded-lg border border-app-border transition-colors ${safeCurrentPage <= 1 ? "text-app-text-sec/40 pointer-events-none" : "text-app-text-sec hover:bg-app-bg-subtle"}`}
                                >
                                    <span className="material-symbols-outlined text-xl">chevron_left</span>
                                </Link>
                                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                                    <Link
                                        key={pageNum}
                                        href={createPageHref(pageNum)}
                                        className={`size-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${pageNum === safeCurrentPage ? "bg-primary text-white font-bold" : "border border-app-border text-app-text-sec hover:bg-app-bg-subtle hover:text-app-text"}`}
                                    >
                                        {pageNum}
                                    </Link>
                                ))}
                                <Link
                                    href={createPageHref(Math.min(totalPages, safeCurrentPage + 1))}
                                    aria-disabled={safeCurrentPage >= totalPages}
                                    className={`size-10 flex items-center justify-center rounded-lg border border-app-border transition-colors ${safeCurrentPage >= totalPages ? "text-app-text-sec/40 pointer-events-none" : "text-app-text-sec hover:bg-app-bg-subtle"}`}
                                >
                                    <span className="material-symbols-outlined text-xl">chevron_right</span>
                                </Link>
                            </nav>
                        </div>
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
}
