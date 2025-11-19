import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {addProduct, deleteProduct, editProduct, fetchProducts} from '../thunks/productsThunk.ts'
import type {Product, ProductsState} from "@/types/product.ts";



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
        const saveToLocalStorage = (state: ProductsState) => {
            localStorage.setItem('products', JSON.stringify(state.items))
        };

        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
                saveToLocalStorage(state)
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Что-то пошло не так';
            })
            .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.items.unshift(action.payload);
                saveToLocalStorage(state);
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                const {id, updatedData} = action.payload;
                const index = state.items.findIndex(p => p.id === id);
                if (index !== -1) {
                    state.items[index] = {...state.items[index], ...updatedData};
                }
                saveToLocalStorage(state)
            })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
                state.items = state.items.filter(p => p.id !== action.payload)
                saveToLocalStorage(state);
            });
    },
});

export default productsSlice.reducer;