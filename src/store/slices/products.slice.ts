import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {addProduct, deleteProduct, editProduct, fetchProducts} from '../thunks/productsThunk.ts'
import type {Product} from "../../types/product.ts";

interface ProductsState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    blobUrlCounts: Record<string, number>;
}

const initialState: ProductsState = {
    items: [],
    status: 'idle',
    error: null,
    blobUrlCounts: {},
};

const incrementUrlCount = (state: ProductsState, url: string) => {
    if (url.startsWith('blob:')) {
        state.blobUrlCounts[url] = (state.blobUrlCounts[url] || 0) + 1;
    }
};

const decrementUrlCount = (state: ProductsState, url: string) => {
    if (url.startsWith('blob:')) {
        state.blobUrlCounts[url] = (state.blobUrlCounts[url] || 1) - 1;
        if (state.blobUrlCounts[url] === 0) {
            URL.revokeObjectURL(url);
            delete state.blobUrlCounts[url]; // Удаляем из объекта, чтобы он не рос бесконечно
        }
    }
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;

                state.blobUrlCounts = {}
                action.payload.forEach(product => incrementUrlCount(state, product.image))
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Что-то пошло не так';
            })
            .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.items.unshift(action.payload);
                incrementUrlCount(state, action.payload.image)
                localStorage.setItem('products', JSON.stringify(state.items));
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                const { id, updatedData } = action.payload;
                const index = state.items.findIndex(p => p.id === id);
                if (index !== -1) {
                    const oldProduct = state.items[index];
                    if (updatedData.image && updatedData.image !== oldProduct.image) {
                        decrementUrlCount(state, oldProduct.image)
                        incrementUrlCount(state, updatedData.image)
                    }
                    state.items[index] = { ...state.items[index], ...updatedData };
                }
                localStorage.setItem('products', JSON.stringify(state.items));
            })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
                const index = state.items.findIndex(p => p.id === action.payload);
                if (index !== -1) {
                    const deletedProduct = state.items[index];
                    decrementUrlCount(state, deletedProduct.image);
                    state.items.splice(index, 1)
                }
                localStorage.setItem('products', JSON.stringify(state.items));
            });
    },
});

export default productsSlice.reducer;