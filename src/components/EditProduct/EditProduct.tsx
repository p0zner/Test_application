import {FilePenLine} from "lucide-react";
import IconButton from "../IconButton/IconButton.tsx";
import ProductModal from "../ProductModal/ProductModal.tsx";
import type {ProductFormData} from "../Form/schema/schema.ts";
import {editProduct} from "../../store/thunks/productsThunk.ts";
import {toast} from "react-toastify";
import {useModal} from "../../hooks/useModal.ts";
import {useAppDispatch} from "../../store/hooks/useAppDispatch.ts";
import type {Product} from "../../types/product.ts";

interface EditProductProps {
    product?: Product;
}

const EditProduct = ({product}: EditProductProps) => {
    const dispatch = useAppDispatch();

    const {isOpen, open, close} = useModal()

    const handleEdit = async (data: ProductFormData, id?: string): Promise<void> => {
        if (id === undefined || !product) return Promise.reject('Id не найден')
        try {
            await dispatch(editProduct({id, data})).unwrap()
            toast.success('Редактирование завершено успешно');
        } catch (error) {
            toast.error('Не удалось отредактировать товар')
        }
    }

    return (
        <>
            <IconButton onClick={open}>
                <FilePenLine size={24}/>
            </IconButton>
            <ProductModal
                key={product?.id || 'editModal'}
                isOpen={isOpen}
                onClose={close}
                onSubmit={handleEdit}
                editingProduct={product || null}
            />
        </>
    )
}

export default EditProduct;