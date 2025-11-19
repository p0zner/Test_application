import { createContext, useContext } from 'react';
import type {Product} from "../types/product.ts";

export const ProductDetailContext = createContext<Product | null>(null);

export const useProductDetail = () => {
    const context = useContext(ProductDetailContext);
    if (!context) {
        throw new Error('Хук useProductDetail должен использоваться внутри ProductDetailContext.Provider');
    }
    return context;
};