"use client";

import { useState } from "react";
import { Product, ProductVariant, Category } from "@prisma/client";
import Link from "next/link";

type ProductWithRelations = Product & {
    category: Category | null;
    variants: ProductVariant[];
};

interface ProductDetailProps {
    product: ProductWithRelations;
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
        product.variants.length > 0 ? product.variants[0].id : null
    );

    const selectedVariant = product.variants.find(v => v.id === selectedVariantId);

    // Merge logic: Variant overrides > Product base
    // Use fallback to product fields if variant doesn't have them (or if they are explicit nulls in logic, but here schema says optional strings)
    // Note: Schema says manual/datasheet are overrides. Name is mandatory for variant.

    const displayData = {
        name: selectedVariant ? `${product.name} (${selectedVariant.name})` : `${product.name} ${product.model}`,
        description: selectedVariant?.description || product.description || product.subtitle || "",
        manual: selectedVariant?.manual || null, // You might want a product level manual too if schema supports it, for now using variants or nothing? 
        // Wait, schema has no manual on Product? Let's check. 
        // Schema: Product has no manual field. Variant has manual. 
        // If no variant selected, we rely on hardcoded "Consultar" or similar?
        // Actually, the previous hardcoded page had manual buttons.
        datasheet: selectedVariant?.datasheet || null,
    };

    const images = {
        main: product.mainImage || "",
        night_vision: product.nightVisionImg || product.mainImage || "",
        app_demo: product.appDemoImg || product.mainImage || "",
    };

    const specs = {
        protection: product.protection || "N/A",
        compression: product.compression || "N/A",
        lens: product.lens || "N/A",
        power: product.power || "N/A",
        resolution_options: product.resolutionOpts || [],
    };

    const features = {
        ai_detection: product.aiDetection || [],
        guarantee: product.guarantee || "Consultar",
        support: product.support || "Soporte técnico",
    };

    return (
        <div className="bg-app-bg text-app-text antialiased selection:bg-primary selection:text-white">
            {/* Product Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-32">
                {/* Product Image */}
                <div className="relative">
                    <div className="aspect-square bg-app-surface rounded-3xl overflow-hidden shadow-sm border border-app-border flex items-center justify-center p-8">
                        <img
                            alt={`${product.name} view`}
                            className="object-contain w-full h-full mix-blend-multiply"
                            src={images.main}
                        />
                    </div>
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl opacity-50"></div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-center h-full space-y-8">
                    <div>
                        {product.badge && (
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
                                    {product.badge}
                                </span>
                            </div>
                        )}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-app-text leading-tight">
                            {product.name} <span className="text-primary">{product.model}</span>
                        </h1>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex text-primary">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`material-icons-outlined text-lg ${i < product.rating ? "" : "text-app-border"}`}>star</span>
                                ))}
                            </div>
                            <span className="text-sm font-medium text-app-text-sec">Grade A Security</span>
                        </div>

                        {/* Description depends on variant */}
                        <p className="text-lg text-app-text-sec leading-relaxed font-light transition-all duration-300">
                            {(selectedVariant?.description) ? (
                                <span className="font-medium text-primary block mb-1">
                                    [{selectedVariant.name}]
                                </span>
                            ) : null}
                            {displayData.description}
                        </p>
                    </div>

                    {/* Variants Selector */}
                    {product.variants.length > 0 && (
                        <div className="py-6 border-t border-b border-app-border">
                            <label className="block text-xs font-bold uppercase tracking-wider text-app-text-sec mb-4">
                                Seleccionar Versión
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {product.variants.map((variant) => (
                                    <button
                                        key={variant.id}
                                        onClick={() => setSelectedVariantId(variant.id)}
                                        className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${selectedVariantId === variant.id
                                                ? "bg-primary text-white border border-primary shadow-lg shadow-primary/30 transform scale-105"
                                                : "border border-app-border hover:border-primary hover:bg-app-bg-subtle"
                                            }`}
                                    >
                                        {variant.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Resolution Options (Legacy/Base) - Show if no variants or just as info */}
                    {product.variants.length === 0 && specs.resolution_options.length > 0 && (
                        <div className="py-6 border-t border-b border-app-border">
                            <label className="block text-xs font-bold uppercase tracking-wider text-app-text-sec mb-4">Resoluciones Soportadas</label>
                            <div className="flex flex-wrap gap-3">
                                {specs.resolution_options.map((res: string, i: number) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 rounded-lg text-xs font-medium border border-app-border bg-app-bg-subtle text-app-text-sec"
                                    >
                                        {res}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quote CTA */}
                    <div className="space-y-4" id="quote">
                        <button className="w-full bg-primary hover:bg-primary-dark text-white text-lg font-semibold py-5 px-8 rounded-2xl shadow-xl shadow-primary/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
                            <span className="material-icons-outlined">request_quote</span>
                            Solicitar Cotización {selectedVariant ? `(${selectedVariant.name})` : ""}
                        </button>

                        {(displayData.manual || displayData.datasheet) && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {displayData.manual && (
                                    <a href={displayData.manual} target="_blank" className="w-full bg-app-surface hover:bg-app-bg-subtle text-app-text border border-app-border font-semibold py-4 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm">
                                        <span className="material-icons-outlined text-app-text-sec group-hover:text-primary transition-colors">menu_book</span>
                                        Manual
                                    </a>
                                )}
                                {displayData.datasheet && (
                                    <a href={displayData.datasheet} target="_blank" className="w-full bg-app-surface hover:bg-app-bg-subtle text-app-text border border-app-border font-semibold py-4 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm">
                                        <span className="material-icons-outlined text-app-text-sec group-hover:text-primary transition-colors">description</span>
                                        Ficha Técnica
                                    </a>
                                )}
                            </div>
                        )}

                        <p className="text-center text-xs text-app-text-sec">
                            Respuesta garantizada en menos de 2 horas hábiles.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <span className="material-icons-outlined">verified_user</span>
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-app-text">Garantía Extendida</p>
                                <p className="text-xs text-app-text-sec mt-1">{features.guarantee}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <span className="material-icons-outlined">support_agent</span>
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-app-text">Soporte Dedicado</p>
                                <p className="text-xs text-app-text-sec mt-1">{features.support}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technology Features */}
            <div className="mb-32">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-app-text">Tecnología Superior</h2>
                    <p className="text-app-text-sec">Diseñada para operar en las condiciones más difíciles con la mayor inteligencia.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* AI Detection */}
                    <div className="bg-app-surface rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-app-border">
                        <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                            <span className="material-icons-outlined text-3xl">psychology</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-app-text">Detección AI</h3>
                        <p className="text-sm text-app-text-sec mb-6 leading-relaxed">
                            Algoritmos de aprendizaje profundo que clasifican objetivos humanos y vehiculares para filtrar alarmas irrelevantes.
                        </p>
                        <ul className="space-y-3">
                            {features.ai_detection.map((feature: string, i: number) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-medium text-app-text">
                                    <span className="material-icons-outlined text-primary text-lg">check</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Night Vision */}
                    <div className="bg-app-surface rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-app-border flex flex-col">
                        <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                            <span className="material-icons-outlined text-3xl">nightlight_round</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-app-text">Visión Nocturna EXIR</h3>
                        <p className="text-sm text-app-text-sec mb-6 leading-relaxed">
                            Tecnología infrarroja avanzada que proporciona una iluminación uniforme y de largo alcance hasta 30 metros en oscuridad total (0 Lux).
                        </p>
                        <div className="mt-auto rounded-xl overflow-hidden h-40 relative group">
                            <img
                                alt="Night vision sample"
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                src={images.night_vision}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <span className="absolute bottom-3 left-3 text-xs text-white font-medium px-2 py-1 bg-black/50 rounded backdrop-blur-sm">Modo Nocturno</span>
                        </div>
                    </div>

                    {/* Pro Specs */}
                    <div className="bg-app-surface rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-app-border">
                        <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                            <span className="material-icons-outlined text-3xl">settings_suggest</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-app-text">Especificaciones Pro</h3>
                        <p className="text-sm text-app-text-sec mb-6 leading-relaxed">
                            Hardware robusto preparado para integraciones profesionales y condiciones climáticas adversas.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-app-bg-subtle p-3 rounded-xl border border-app-border">
                                <p className="text-[10px] uppercase text-app-text-sec font-bold mb-1">Protección</p>
                                <p className="font-semibold text-primary">{specs.protection}</p>
                            </div>
                            <div className="bg-app-bg-subtle p-3 rounded-xl border border-app-border">
                                <p className="text-[10px] uppercase text-app-text-sec font-bold mb-1">Compresión</p>
                                <p className="font-semibold text-primary">{specs.compression}</p>
                            </div>
                            <div className="bg-app-bg-subtle p-3 rounded-xl border border-app-border">
                                <p className="text-[10px] uppercase text-app-text-sec font-bold mb-1">Lente</p>
                                <p className="font-semibold text-primary">{specs.lens}</p>
                            </div>
                            <div className="bg-app-bg-subtle p-3 rounded-xl border border-app-border">
                                <p className="text-[10px] uppercase text-app-text-sec font-bold mb-1">Energía</p>
                                <p className="font-semibold text-primary">{specs.power}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile App Showcase - Keeping Static as requested */}
            <section className="relative rounded-[2.5rem] overflow-hidden bg-gray-900 mb-24">
                {/* ... (Static content from original page) ... */}
                <div className="absolute inset-0">
                    <img
                        alt="Modern home interior blurred"
                        className="w-full h-full object-cover opacity-20"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG8WqNjY-Z-EYF-2MdxOL9_Qo8YGFXKIOh49yOBFQTeUiTpDxpiinWxcMgGKfbItBpggmjM5YigcH-JNhoah5NDUGzgoY4X3fzH2UFAYfvL5GEfogxohDEqVBZVlJSNJWDJjikS8uXnJCXGeKDjbtSAH8aNCwgvdr8dQMYwaoQDFLnkljj3iDvkjkp-SSNKob945CYsQUMcRtD0SM3S0D8tJHyt93KZFRQF0579UMdXwN5wLaNfhbQ3zKP3TmrECmuCZxI2PGWX1lw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-transparent"></div>
                </div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-10 md:p-20">
                    <div className="text-white space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-xs font-medium tracking-wide">Live Monitoring</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight">Control total en la palma de tu mano.</h2>
                        <p className="text-gray-400 text-lg font-light max-w-md">
                            Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
