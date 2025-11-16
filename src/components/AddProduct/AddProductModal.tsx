import {type ProductFormData, productSchema} from "./schema/schema.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {memo, useEffect, useRef, useState} from "react";

import classes from './addProductModal.module.scss'
import type {Product} from "../../types/product.ts";
import {toast} from "react-toastify";
import * as React from "react";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddProduct: (data: ProductFormData, id?: string) => Promise<void>;
    editingProduct: Product | null;
}

const AddProductModal = memo(({isOpen, onClose, onAddProduct, editingProduct}: ProductModalProps) => {
    const isEditMode = !!editingProduct;
    const mouseDownTargetRef = useRef<EventTarget | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {errors, isSubmitting}
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        mode: 'onSubmit',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const imageFile = watch('image')

    useEffect(() => {
        if (isEditMode) {
            setImagePreview(editingProduct.image);
            reset({
                title: editingProduct?.title,
                description: editingProduct?.description,
                price: editingProduct?.price,
            })
        } else {
            setImagePreview(null)
            reset()
        }
    }, [isOpen, editingProduct, isEditMode, reset])

    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0];
            const newPreviewUrl = URL.createObjectURL(file);
            setImagePreview(newPreviewUrl);

            return () => {
                URL.revokeObjectURL(newPreviewUrl);
            };
        }
    }, [imageFile]);

    if (!isOpen) {
        return null;
    }

    const onSubmit: SubmitHandler<ProductFormData> = async (product) => {
        if (!isEditMode && (!product.image || product.image.length === 0)) {
            toast.error('Загрузите изображение')
            return;
        }

        try {
            await onAddProduct(product, editingProduct?.id);
            onClose();
        } catch (error) {
            console.error(error);
        }
    }

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        mouseDownTargetRef.current = event.target;
    };

    const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
        if (mouseDownTargetRef.current === event.target && event.currentTarget === event.target) {
            onClose();
        }
        mouseDownTargetRef.current = null;
    };

    return (
        <div className={classes.backdrop} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
                <header className={classes.modalHeader}>
                    <h2>{isEditMode ? 'Редактирование товара' : 'Добавить новый товар'}</h2>
                    <button onClick={onClose} className={classes.closeButton}>&times;</button>
                </header>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                    <div className={classes.formGroup}>
                        <label htmlFor="title">Название товара</label>
                        <input id="title"
                               className={errors.title ? classes.inputError : classes.input} {...register('title')} />
                        {errors.title && <p className={classes.error}>{errors.title.message}</p>}
                    </div>

                    <div className={classes.formGroup}>
                        <label htmlFor="description">Описание</label>
                        <textarea className={errors.description ? classes.inputError : classes.input}
                                  id="description" {...register('description')} rows={4}></textarea>
                        {errors.description && <p className={classes.error}>{errors.description.message}</p>}
                    </div>

                    <div className={classes.formGroup}>
                        <label htmlFor="price">Цена (₽)</label>
                        <input id="price" className={errors.price ? classes.inputError : classes.input}
                               type="text" {...register('price')} />
                        {errors.price && <p className={classes.error}>{errors.price.message}</p>}
                    </div>

                    {imagePreview && (
                        <div className={classes.currentImagePreview}>
                            <p>Превью изображения:</p>
                            <img src={imagePreview} alt="Превью" />
                        </div>
                    )}

                    <div className={classes.formGroup}>
                        <label htmlFor="image">
                            {isEditMode ? 'Загрузить новое изображение' : 'Изображение товара'}
                        </label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            className={`${classes.input} ${errors.image ? classes.inputError : ''}`}
                            {...register('image')}
                        />
                        {errors.image && <p className={classes.error}>{errors.image.message as string}</p>}
                    </div>

                    <div className={classes.formActions}>
                        <button type="submit" className={`${classes.button} ${classes.submitButton}`}
                                disabled={isSubmitting}>
                            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
})

export default AddProductModal;