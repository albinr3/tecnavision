import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import ProductDetail from "@/app/components/ProductDetail";
import prisma from "@/lib/db";

// Define Props locally as Next.js types can be tricky
type Props = {
    params: Promise<{ slug: string }>;
};

// Helper to get product from DB
async function getProduct(slug: string) {
    return prisma.product.findUnique({
        where: { slug },
        include: { category: true },
    });
}

// SEO Metadata Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        return {
            title: "Producto no encontrado - TecnoVision",
        };
    }

    return {
        title: `${product.name} ${product.model} - TecnoVision`,
        description: product.description || product.subtitle || "",
    };
}

// Page Component
export default async function ProductPage({ params }: Props) {
    const { slug } = await params;

    // Fetch product with variants
    const product = await prisma.product.findUnique({
        where: { slug },
        include: {
            category: true,
            variants: true // Fetch variants
        },
    });

    if (!product) {
        notFound();
    }

    return (
        <div className="bg-background-light text-text-main antialiased selection:bg-primary selection:text-white">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <ProductDetail product={product} />
            </main>

            {/* Footer remains here or can be moved to component if needed, for now reusing the one in page or extracting */}
            <footer className="bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                        <div className="md:max-w-xs">
                            <div className="mb-6">
                                <img src="/logo.png" alt="TecnoVision" className="h-10 w-auto" />
                            </div>
                            <p className="text-sm text-text-sec-light dark:text-text-sec-dark leading-relaxed">
                                Soluciones de seguridad empresarial diseñadas para la tranquilidad moderna. Tecnología inteligente al servicio de tu protección.
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-800 mt-16 pt-8 text-center text-xs text-text-sec-light dark:text-text-sec-dark">
                        © 2025 TecnaVision Security Systems. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </div>
    );
}
