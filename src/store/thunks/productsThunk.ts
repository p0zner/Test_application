import { createAsyncThunk } from '@reduxjs/toolkit';
import type {Product} from "../../types/product.ts";
import type {ProductFormData} from "../../components/Form/schema/schema.ts";
import {v4 as uuidv4} from "uuid";
import {toBase64} from "../../utils/image.utils.ts";

interface EditProductArgs {
    id: string;
    data: ProductFormData;
}

interface EditProductReturn {
    id: string;
    updatedData: Partial<Omit<Product, 'id'>>;
}

export const fetchProducts = createAsyncThunk<Product[]>(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const cachedProducts = localStorage.getItem('products');
            await new Promise(resolve => setTimeout(resolve, 1500));
            if (cachedProducts) {
                return JSON.parse(cachedProducts);
            }
            const response = await fetch('/bd.json');
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные');
            }
            const data: Product[] = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addProduct = createAsyncThunk<Product, ProductFormData>(
    'products/addProduct',
    async (productData) => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!productData.image || productData.image.length === 0) {
            throw new Error("Изображение не было предоставлено");
        }

        const imageFile = productData.image[0];
        const imageBase64 = await toBase64(imageFile);

        const newProduct: Product = {
            id: uuidv4(),
            title: productData.title,
            description: productData.description,
            price: productData.price,
            image: imageBase64,
        };
        return newProduct;
    }
);

export const editProduct = createAsyncThunk<EditProductReturn, EditProductArgs>(
    'products/editProduct',
    async ({ id, data }) => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const { image: imageFileList, ...otherData } = data;
        const updatedData: Partial<Omit<Product, 'id'>> = { ...otherData };

        if (imageFileList && imageFileList.length > 0) {
            const imageFile = imageFileList[0];
            updatedData.image = await toBase64(imageFile);
        }

        return { id, updatedData };
    }
);

export const deleteProduct = createAsyncThunk<string, string>(
    'products/deleteProduct',
    async (id) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return id;
    }
);