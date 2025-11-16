import type {RootState} from "../store.ts";
import {createSelector} from "@reduxjs/toolkit";

const selectProductsItems = (state: RootState) => state.products.items;
const selectProductId = (_state: RootState, productId: string) => productId;

export const selectProductById = createSelector(
    [selectProductsItems, selectProductId],
    (items, productId) => items.find(item => item.id === productId)
)