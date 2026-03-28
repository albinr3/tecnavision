import type { AppMarket } from "@/lib/market";

type LocalizableProduct = {
    name: string;
    description: string | null;
    title_es: string | null;
    title_en: string | null;
    description_es: string | null;
    description_en: string | null;
};

function pickPreferredText(preferred: string | null | undefined, fallback: string | null | undefined) {
    const preferredText = preferred?.trim();
    if (preferredText) {
        return preferredText;
    }

    return fallback ?? null;
}

export function getLocalizedProductName(product: LocalizableProduct, market: AppMarket) {
    if (market === "RD") {
        return pickPreferredText(product.title_es, product.name) ?? product.name;
    }

    return pickPreferredText(product.title_en, product.name) ?? product.name;
}

export function getLocalizedProductDescription(product: LocalizableProduct, market: AppMarket) {
    if (market === "RD") {
        return pickPreferredText(product.description_es, product.description);
    }

    return pickPreferredText(product.description_en, product.description);
}

export function getLocalizedProductText(product: LocalizableProduct, market: AppMarket) {
    return {
        name: getLocalizedProductName(product, market),
        description: getLocalizedProductDescription(product, market),
    };
}