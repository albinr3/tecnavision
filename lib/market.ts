export const SUPPORTED_MARKETS = ["RD", "US"] as const;

export type AppMarket = (typeof SUPPORTED_MARKETS)[number];

const DEFAULT_MARKET: AppMarket = "US";

export function isAppMarket(value: string): value is AppMarket {
    return SUPPORTED_MARKETS.includes(value as AppMarket);
}

export function normalizeMarket(value: string | null | undefined): AppMarket | null {
    if (!value) {
        return null;
    }

    const normalized = value.trim().toUpperCase();
    return isAppMarket(normalized) ? normalized : null;
}

export function getActiveMarket(): AppMarket {
    const fromSiteMarket = normalizeMarket(process.env.SITE_MARKET);
    if (fromSiteMarket) {
        return fromSiteMarket;
    }

    const fromPublicMarket = normalizeMarket(process.env.NEXT_PUBLIC_SITE_MARKET);
    if (fromPublicMarket) {
        return fromPublicMarket;
    }

    return DEFAULT_MARKET;
}

export function parseMarketQuery(marketValue: string | null): { market?: AppMarket; error?: string } {
    if (marketValue === null) {
        return {};
    }

    const parsed = normalizeMarket(marketValue);
    if (!parsed) {
        return { error: "Invalid market. Allowed values: RD, US." };
    }

    return { market: parsed };
}

export function sanitizeAvailableMarkets(
    rawMarkets: unknown,
    options?: { defaultIfMissing?: AppMarket[] }
): AppMarket[] {
    if (rawMarkets === undefined || rawMarkets === null) {
        return options?.defaultIfMissing ? [...options.defaultIfMissing] : [];
    }

    const values = Array.isArray(rawMarkets) ? rawMarkets : [rawMarkets];
    const deduped = new Set<AppMarket>();

    for (const value of values) {
        if (typeof value !== "string") {
            continue;
        }

        const parsed = normalizeMarket(value);
        if (parsed) {
            deduped.add(parsed);
        }
    }

    return Array.from(deduped);
}