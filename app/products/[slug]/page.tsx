import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ProductDetail from "@/app/components/ProductDetail";
import prisma from "@/lib/db";
import { getSiteUrl } from "@/lib/site-url";

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

function toAbsoluteUrl(pathOrUrl: string, siteUrl: string) {
    if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
        return pathOrUrl;
    }
    return `${siteUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

// SEO Metadata Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProduct(slug);
    const siteUrl = getSiteUrl();

    if (!product) {
        return {
            title: "Producto no encontrado - TecnaVision",
        };
    }

    const productPath = `/products/${product.slug}`;
    const imageUrl = toAbsoluteUrl(
        product.mainImage || "/web-app-manifest-512x512.png",
        siteUrl
    );
    const title = `${product.name} ${product.model} - TecnaVision`;
    const description = product.description || product.subtitle || "Producto TecnaVision";

    return {
        title,
        description,
        alternates: {
            canonical: productPath,
        },
        openGraph: {
            title,
            description,
            type: "website",
            url: productPath,
            images: [
                {
                    url: imageUrl,
                    alt: `${product.name} ${product.model}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
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
        <div className="bg-app-bg text-app-text antialiased selection:bg-primary selection:text-white">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <ProductDetail product={product} />
            </main>

            <Footer />
        </div>
    );
}
