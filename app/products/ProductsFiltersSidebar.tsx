"use client";

import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";

type CategoryFilterOption = {
    id: string;
    name: string;
    slug: string;
};

interface ProductsFiltersSidebarProps {
    categories: CategoryFilterOption[];
    resolutions: string[];
    features: string[];
    selectedCategories: string[];
    selectedResolutions: string[];
    selectedFeatures: string[];
    requestedQuery: string;
}

export default function ProductsFiltersSidebar({
    categories,
    resolutions,
    features,
    selectedCategories,
    selectedResolutions,
    selectedFeatures,
    requestedQuery,
}: ProductsFiltersSidebarProps) {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [isPending, startTransition] = useTransition();

    const selectedCategorySet = new Set(selectedCategories.map((value) => value.toLowerCase()));
    const selectedResolutionSet = new Set(selectedResolutions);
    const selectedFeatureSet = new Set(selectedFeatures);

    const applyFilters = () => {
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
        const params = new URLSearchParams();

        formData.getAll("category").forEach((value) => {
            const normalized = String(value).trim();
            if (normalized) params.append("category", normalized);
        });
        formData.getAll("resolution").forEach((value) => {
            const normalized = String(value).trim();
            if (normalized) params.append("resolution", normalized);
        });
        formData.getAll("feature").forEach((value) => {
            const normalized = String(value).trim();
            if (normalized) params.append("feature", normalized);
        });

        if (requestedQuery) params.set("q", requestedQuery);

        const query = params.toString();
        startTransition(() => {
            router.push(query ? `/products?${query}` : "/products");
        });
    };

    return (
        <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-app-border bg-app-bg-subtle/50 p-6 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
            <h3 className="text-lg font-bold mb-6 text-app-text">Filtros</h3>
            <form ref={formRef} onChange={applyFilters}>
                {requestedQuery && <input type="hidden" name="q" value={requestedQuery} />}

                <div className="mb-8">
                    <h4 className="text-xs font-bold text-app-text-sec mb-4 uppercase tracking-wider">Categorías</h4>
                    <div className="space-y-3">
                        {categories.map((item) => (
                            <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="category"
                                    value={item.slug}
                                    defaultChecked={selectedCategorySet.has(item.slug.toLowerCase())}
                                    disabled={isPending}
                                    className="size-4 rounded border-app-border bg-transparent text-primary focus:ring-primary focus:ring-offset-app-surface"
                                />
                                <span className="text-sm text-app-text group-hover:text-primary transition-colors">{item.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h4 className="text-xs font-bold text-app-text-sec mb-4 uppercase tracking-wider">Resolución</h4>
                    <div className="space-y-3">
                        {resolutions.map((item) => (
                            <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="resolution"
                                    value={item}
                                    defaultChecked={selectedResolutionSet.has(item)}
                                    disabled={isPending}
                                    className="size-4 rounded border-app-border bg-transparent text-primary focus:ring-primary focus:ring-offset-app-surface"
                                />
                                <span className="text-sm text-app-text group-hover:text-primary transition-colors">{item}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h4 className="text-xs font-bold text-app-text-sec mb-4 uppercase tracking-wider">Características</h4>
                    <div className="space-y-3">
                        {features.map((item) => (
                            <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="feature"
                                    value={item}
                                    defaultChecked={selectedFeatureSet.has(item)}
                                    disabled={isPending}
                                    className="size-4 rounded border-app-border bg-transparent text-primary focus:ring-primary focus:ring-offset-app-surface"
                                />
                                <span className="text-sm text-app-text group-hover:text-primary transition-colors">{item}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </form>
        </aside>
    );
}
