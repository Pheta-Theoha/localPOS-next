// CategoryContext.tsx
"use client";

import React, { createContext, useState, ReactNode, useContext } from 'react';

interface CategoryContextType {
    category: string | null;
    setCategory: (category: string | null) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategory must be used within a CategoryProvider");
    }
    return context;
};

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const [category, setCategory] = useState<string | null>(null);

    return (
        <CategoryContext.Provider value={{ category, setCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};
