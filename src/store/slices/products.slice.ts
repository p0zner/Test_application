import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {addProduct, deleteProduct, editProduct, fetchProducts} from '../thunks/productsThunk.ts'
import type {Product} from "../../types/product.ts";

interface ProductsState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    status: 'idle',
    error: null,
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
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Что-то пошло не так';
            })
            .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.items.unshift(action.payload);
                localStorage.setItem('products', JSON.stringify(state.items));
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                const { id, updatedData, oldImageUrl } = action.payload;

                if (oldImageUrl && oldImageUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(oldImageUrl);
                }

                const index = state.items.findIndex(p => p.id === id);
                if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...updatedData };
                }
                localStorage.setItem('products', JSON.stringify(state.items));
            })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
                state.items = state.items.filter(p => p.id !== action.payload);
                localStorage.setItem('products', JSON.stringify(state.items));
            });
    },
});

export default productsSlice.reducer;