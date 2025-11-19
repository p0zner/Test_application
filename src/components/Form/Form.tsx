import {type SubmitHandler, useForm} from "react-hook-form";
import {type ProductFormData, productSchema} from "./schema/schema.ts";
import type {Product} from "../../types/product.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import FormInput from "./FormInput/FormField.tsx";
import FormField from "./FormField/FormField.tsx";
import FormTextArea from "./FormTextArea/FormTextArea.tsx";

import classes from './form.module.scss';
import {toBase64} from "../../utils/image.utils.ts";

interface FormProps {
    onSubmit: SubmitHandler<ProductFormData>;
    editingProduct: Product | null;
    isSubmitting: boolean;
}

const Form = ({onSubmit, editingProduct, isSubmitting}: FormProps) => {
    const isEditMode = !!editingProduct;

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {errors},
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        mode: 'onSubmit',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const imageFile = watch('image');

    useEffect(() => {
        if (editingProduct) {
            setImagePreview(editingProduct.image);
            reset({
                title: editingProduct.title,
                description: editingProduct.description,
                price: editingProduct.price,
            });
        } else {
            setImagePreview(null);
            reset();
        }
    }, [editingProduct, reset]);

    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0]
            let isCancelled = false;

            toBase64(file)
                .then(base64String => {
                    if (!isCancelled) {
                        setImagePreview(base64String);
                    }
                })
                .catch(() => {
                    if (!isCancelled) {
                        setImagePreview(null);
                    }
                });
            return () => {
                isCancelled = true
            }
        }
    }, [imageFile]);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
            <FormField title="Название товара" htmlFor="title" error={errors.title}>
                <FormInput id="title" hasError={!!errors.title} {...register('title')} />
            </FormField>

            <FormField title="Описание" htmlFor="description" error={errors.description}>
                <FormTextArea id="description" hasError={!!errors.description} rows={4} {...register('description')} />
            </FormField>

            <FormField title="Цена (₽)" htmlFor="price" error={errors.price}>
                <FormInput
                    id="price"
                    type="text"
                    hasError={!!errors.price}
                    {...register('price')}
                />
            </FormField>

            {imagePreview && (
                <div className={classes.currentImagePreview}>
                    <p>Превью изображения:</p>
                    <img src={imagePreview} alt="Превью"/>
                </div>
            )}

            <FormField
                title={isEditMode ? 'Загрузить новое изображение' : 'Изображение товара'}
                htmlFor="image"
                error={errors.image}
            >
                <FormInput
                    id="image" type="file" accept="image/*"
                    hasError={!!errors.image} {...register('image')}
                />
            </FormField>

            <div className={classes.formActions}>
                <button type="submit" className={`${classes.button} ${classes.submitButton}`}
                        disabled={isSubmitting}>
                    {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                </button>
            </div>
        </form>
    )
}

export default Form;