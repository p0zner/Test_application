import { useState } from 'react';
import type {SubmitHandler} from 'react-hook-form';
import { toast } from 'react-toastify';

import Modal from '../Modal/Modal';
import Form from "../Form/Form.tsx";
import type {ProductFormData} from "../Form/schema/schema.ts";
import type {Product} from "../../types/product.ts";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ProductFormData, id?: string) => Promise<void>;
    editingProduct: Product | null;
}

const ProductModal = ({ isOpen, onClose, onSubmit, editingProduct }: ProductModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit: SubmitHandler<ProductFormData> = async (data) => {
        if (!editingProduct && (!data.image || data.image.length === 0)) {
            toast.error("Изображение обязательно для нового товара.");
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(data, editingProduct?.id);
            onClose();
        } catch (error) {
            console.error("Ошибка сохранения", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editingProduct ? 'Редактировать товар' : 'Добавить новый товар'}
        >
            <Form
                onSubmit={handleFormSubmit}
                editingProduct={editingProduct}
                isSubmitting={isSubmitting}
            />
        </Modal>
    );
};

export default ProductModal;