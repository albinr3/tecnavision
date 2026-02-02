"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Category, Product, ProductVariant } from "@prisma/client";
import { toast } from "sonner";

// Extend Product type to include variants
type ProductWithVariants = Product & {
    variants?: ProductVariant[];
};

interface ProductFormProps {
    categories: Category[];
    initialData?: ProductWithVariants;
}

export default function ProductForm({ categories, initialData }: ProductFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [name, setName] = useState(initialData?.name || "");
    const [model, setModel] = useState(initialData?.model || "");
    const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [badge, setBadge] = useState(initialData?.badge || "");
    const [category, setCategory] = useState(initialData?.categoryId || "");
    const [mainImage, setMainImage] = useState(initialData?.mainImage || "");

    // Specs
    const [specs, setSpecs] = useState([
        { key: "Protección", value: initialData?.protection || "" },
        { key: "Compresión", value: initialData?.compression || "" },
        { key: "Lente", value: initialData?.lens || "" },
        { key: "Energía", value: initialData?.power || "" },
    ]);
    const [resolutionOptions, setResolutionOptions] = useState(initialData?.resolutionOpts?.join(", ") || "4 Megapixel, 6 Megapixel, 8 MP (4K Ultra)");

    // Features
    const [aiFeatures, setAiFeatures] = useState(initialData?.aiDetection?.join(", ") || "Cruce de línea, Intrusión de área, Reconocimiento facial");
    const [guarantee, setGuarantee] = useState(initialData?.guarantee || "3 años de cobertura");
    const [support, setSupport] = useState(initialData?.support || "Línea directa B2B");

    // Variants
    const [variants, setVariants] = useState<Partial<ProductVariant>[]>(initialData?.variants || []);

    const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
        const updated = [...specs];
        updated[index][field] = value;
        setSpecs(updated);
    };

    const addSpec = () => {
        setSpecs([...specs, { key: "", value: "" }]);
    };

    const removeSpec = (index: number) => {
        setSpecs(specs.filter((_, i) => i !== index));
    };

    // Variants Handlers
    const addVariant = () => {
        setVariants([...variants, { name: "", description: "", manual: "", datasheet: "" }]);
    };

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handleVariantChange = (index: number, field: keyof ProductVariant, value: string) => {
        const updated = [...variants];
        updated[index] = { ...updated[index], [field]: value };
        setVariants(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !model) {
            const msg = "Por favor completa el nombre y modelo del producto.";
            setError(msg);
            toast.warning(msg);
            return;
        }

        setIsSubmitting(true);
        setError(null);
        const loadingToast = toast.loading(initialData ? "Actualizando producto..." : "Creando producto...");

        try {
            const url = initialData ? `/api/products/${initialData.slug}` : "/api/products";
            const method = initialData ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    model,
                    subtitle,
                    description,
                    badge: badge || null,
                    mainImage: mainImage || null,
                    categoryId: category || null,
                    protection: specs.find(s => s.key.toLowerCase().includes("protec"))?.value || null,
                    compression: specs.find(s => s.key.toLowerCase().includes("compres"))?.value || null,
                    lens: specs.find(s => s.key.toLowerCase().includes("lente"))?.value || null,
                    power: specs.find(s => s.key.toLowerCase().includes("energ"))?.value || null,
                    resolutionOpts: resolutionOptions.split(",").map(r => r.trim()).filter(Boolean),
                    aiDetection: aiFeatures.split(",").map(f => f.trim()).filter(Boolean),
                    guarantee,
                    support,
                    variants // Include variants in payload
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to save product");
            }

            toast.dismiss(loadingToast);
            toast.success(initialData ? "¡Producto actualizado!" : "¡Producto creado exitosamente!");
            router.push("/admin/products");
            router.refresh();
        } catch (err) {
            toast.dismiss(loadingToast);
            const msg = err instanceof Error ? err.message : "Error al guardar el producto";
            setError(msg);
            toast.error(msg);
            setIsSubmitting(false);
        }
    };

    return (
        <form id="product-form" onSubmit={handleSubmit} className="mx-auto max-w-5xl flex flex-col gap-6">
            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-500">error</span>
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            )}

            {/* Section 1: General Info */}
            <div className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6">
                <h3 className="text-lg font-bold text-app-text mb-5 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">info</span>
                    Información General
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-app-text">
                            Nombre del Producto <span className="text-red-500">*</span>
                        </span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                            placeholder="Ej. Bullet Cam"
                            required
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-app-text">
                            Modelo <span className="text-red-500">*</span>
                        </span>
                        <input
                            type="text"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                            placeholder="Ej. Pro AI"
                            required
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-app-text">Badge (Opcional)</span>
                        <input
                            type="text"
                            value={badge}
                            onChange={(e) => setBadge(e.target.value)}
                            className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                            placeholder="Ej. Enterprise Series, Best Seller"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-app-text">Categoría</span>
                        <div className="relative">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 appearance-none"
                            >
                                <option value="">Seleccionar categoría...</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#645e8d]">
                                <span className="material-symbols-outlined text-lg">expand_more</span>
                            </div>
                        </div>
                    </label>
                </div>
            </div>

            {/* Section 2: Description */}
            <div className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6">
                <h3 className="text-lg font-bold text-app-text mb-5 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">description</span>
                    Descripción
                </h3>
                <label className="flex flex-col gap-2 mb-4">
                    <span className="text-sm font-medium text-app-text">Subtítulo</span>
                    <input
                        type="text"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                        placeholder="Ej. Vigilancia de última generación para entornos exigentes."
                    />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-app-text">Descripción Completa</span>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-32 p-4 text-sm text-app-text border border-app-border rounded-lg focus:border-primary focus:ring-0 resize-y outline-none placeholder:text-app-text-sec/70"
                        placeholder="Escribe una descripción detallada del producto aquí..."
                    />
                </label>
            </div>

            {/* Section 3: Specs & Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Specs */}
                <div className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg font-bold text-app-text flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">memory</span>
                            Especificaciones
                        </h3>
                        <button
                            type="button"
                            onClick={addSpec}
                            className="text-xs font-semibold text-primary hover:text-blue-700 flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-sm">add</span> Añadir
                        </button>
                    </div>
                    <div className="flex flex-col gap-3">
                        {specs.map((spec, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                <input
                                    type="text"
                                    value={spec.key}
                                    onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                                    className="w-full sm:w-1/3 rounded-lg border border-app-border bg-app-bg-subtle h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                    placeholder="Característica"
                                />
                                <input
                                    type="text"
                                    value={spec.value}
                                    onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                                    className="w-full sm:flex-1 rounded-lg border border-app-border bg-app-surface h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                    placeholder="Valor"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeSpec(index)}
                                    className="self-end sm:self-auto p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                </button>
                            </div>
                        ))}
                    </div>
                    <label className="flex flex-col gap-2 mt-4">
                        <span className="text-sm font-medium text-app-text">Opciones de Resolución (separadas por coma)</span>
                        <input
                            type="text"
                            value={resolutionOptions}
                            onChange={(e) => setResolutionOptions(e.target.value)}
                            className="w-full rounded-lg border border-app-border bg-app-surface h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                            placeholder="4 Megapixel, 6 Megapixel, 8 MP (4K Ultra)"
                        />
                    </label>
                </div>

                {/* Features */}
                <div className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6">
                    <h3 className="text-lg font-bold text-app-text mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">tune</span>
                        Características
                    </h3>
                    <div className="flex flex-col gap-4">
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-app-text">Funciones IA (separadas por coma)</span>
                            <input
                                type="text"
                                value={aiFeatures}
                                onChange={(e) => setAiFeatures(e.target.value)}
                                className="w-full rounded-lg border border-app-border bg-app-surface h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                placeholder="Cruce de línea, Intrusión de área"
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-app-text">Garantía</span>
                            <input
                                type="text"
                                value={guarantee}
                                onChange={(e) => setGuarantee(e.target.value)}
                                className="w-full rounded-lg border border-app-border bg-app-surface h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                placeholder="3 años de cobertura"
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-app-text">Soporte</span>
                            <input
                                type="text"
                                value={support}
                                onChange={(e) => setSupport(e.target.value)}
                                className="w-full rounded-lg border border-app-border bg-app-surface h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                placeholder="Línea directa B2B"
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* Section 4: Variants (New) */}
            <div className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold text-app-text flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">style</span>
                        Variantes del Producto
                    </h3>
                    <button
                        type="button"
                        onClick={addVariant}
                        className="text-xs font-semibold text-primary hover:text-blue-700 flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-sm">add</span> Añadir Variante
                    </button>
                </div>
                {variants.length === 0 ? (
                    <p className="text-sm text-app-text-sec italic text-center py-4 bg-app-bg-subtle rounded-lg">
                        No hay variantes definidas. Se usará la configuración base del producto.
                    </p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {variants.map((variant, index) => (
                            <div key={index} className="border border-app-border rounded-lg p-4 bg-app-bg-subtle relative">
                                <button
                                    type="button"
                                    onClick={() => removeVariant(index)}
                                    className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600 rounded-full hover:bg-app-surface transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-app-text">Nombre (ej. 4MP)</span>
                                        <input
                                            type="text"
                                            value={variant.name || ""}
                                            onChange={(e) => handleVariantChange(index, "name", e.target.value)}
                                            className="w-full rounded-md border border-app-border bg-app-surface h-9 px-3 text-sm"
                                            placeholder="Nombre de la variante"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-app-text">Descripción Corta</span>
                                        <input
                                            type="text"
                                            value={variant.description || ""}
                                            onChange={(e) => handleVariantChange(index, "description", e.target.value)}
                                            className="w-full rounded-md border border-app-border bg-app-surface h-9 px-3 text-sm"
                                            placeholder="Detalle diferencial"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-app-text">URL Manual (Opcional)</span>
                                        <input
                                            type="text"
                                            value={variant.manual || ""}
                                            onChange={(e) => handleVariantChange(index, "manual", e.target.value)}
                                            className="w-full rounded-md border border-app-border bg-app-surface h-9 px-3 text-sm"
                                            placeholder="https://..."
                                        />
                                    </label>
                                    <label className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-app-text">URL Datasheet (Opcional)</span>
                                        <input
                                            type="text"
                                            value={variant.datasheet || ""}
                                            onChange={(e) => handleVariantChange(index, "datasheet", e.target.value)}
                                            className="w-full rounded-md border border-app-border bg-app-surface h-9 px-3 text-sm"
                                            placeholder="https://..."
                                        />
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Section 5: Image */}
            <div className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6">
                <h3 className="text-lg font-bold text-app-text mb-5 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">imagesmode</span>
                    Imagen Principal
                </h3>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-app-text">URL de la Imagen</span>
                    <input
                        type="url"
                        value={mainImage}
                        onChange={(e) => setMainImage(e.target.value)}
                        className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                        placeholder="https://example.com/image.jpg"
                    />
                </label>
                {mainImage && (
                    <div className="mt-4 w-32 h-32 rounded-lg overflow-hidden border border-app-border">
                        <img src={mainImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

            {/* Mobile Submit */}
            <div className="md:hidden flex flex-col gap-3 pt-4 pb-8">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full h-12 items-center justify-center rounded-lg bg-primary text-white font-bold shadow-sm disabled:opacity-50"
                >
                    {isSubmitting ? "Guardando..." : (initialData ? "Guardar Cambios" : "Publicar Producto")}
                </button>
                <Link
                    href="/admin/products"
                    className="flex w-full h-12 items-center justify-center rounded-lg border border-app-border bg-app-surface text-app-text font-bold"
                >
                    Descartar
                </Link>
            </div>
        </form>
    );
}
