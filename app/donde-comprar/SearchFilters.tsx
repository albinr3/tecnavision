"use client";

import { useState, useEffect } from "react";

interface SearchFiltersProps {
    onSearch?: (name: string, location: string) => void;
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
    const [searchName, setSearchName] = useState("");
    const [location, setLocation] = useState("");
    const [provinces, setProvinces] = useState<string[]>([]);

    useEffect(() => {
        // Fetch all distributors to get unique provinces
        const fetchProvinces = async () => {
            try {
                const response = await fetch("/api/distributors");
                const distributors = await response.json();

                // Get unique provinces (state field)
                const uniqueProvinces = Array.from(
                    new Set(
                        distributors
                            .map((d: any) => d.state)
                            .filter((state: string | null) => state !== null && state !== "")
                    )
                ).sort();

                setProvinces(uniqueProvinces as string[]);
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        };

        fetchProvinces();
    }, []);

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchName, location);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-2xl shadow-xl shadow-primary/5 border border-gray-100">
            <div className="flex flex-col md:flex-row items-end gap-4">
                <label className="flex flex-col w-full md:flex-[2]">
                    <span className="text-text-main text-sm font-bold pb-2 ml-1">
                        Buscar por nombre
                    </span>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
                            search
                        </span>
                        <input
                            className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 pl-12 py-3.5 text-text-main placeholder:text-text-secondary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            placeholder="Ej. Seguridad Total"
                            type="text"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </label>
                <label className="flex flex-col w-full md:flex-1">
                    <span className="text-text-main text-sm font-bold pb-2 ml-1">
                        Provincia
                    </span>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
                            location_on
                        </span>
                        <select
                            className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 pl-12 py-3.5 text-text-main appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none cursor-pointer"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="">Todas las Provincias</option>
                            {provinces.map((province) => (
                                <option key={province} value={province}>
                                    {province}
                                </option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
                            expand_more
                        </span>
                    </div>
                </label>
                <button
                    className="w-full md:w-auto h-[50px] bg-primary hover:bg-primary-dark text-white font-bold px-8 rounded-xl transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    onClick={handleSearch}
                >
                    <span>Buscar</span>
                </button>
            </div>
        </div>
    );
}
