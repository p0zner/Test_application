export interface Product {
    id: string;
    title: string;
    description: string;
    price: string;
    image: string;
}

export interface ProductsState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}