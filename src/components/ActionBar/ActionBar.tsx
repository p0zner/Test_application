import IconButton from "../IconButton/IconButton.tsx";
import {editProduct} from "../../store/thunks/productsThunk.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store/hooks/useAppDispatch.ts";
import {ArrowLeft, FilePenLine} from "lucide-react";
import type {Product} from "../../types/product.ts";

import classes from './actionBar.module.scss';
import {useModal} from "../../hooks/useModal.ts";
import type {ProductFormData} from "../Form/schema/schema.ts";
import RemoveProduct from "../RemoveProduct/RemoveProduct.tsx";
import ProductModal from "../ProductModal/ProductModal.tsx";

interface ActionBarProps {
    product?: Product;
}

const ActionBar = ({product}: ActionBarProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
            <div className={classes.actionBar}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowLeft size={24}/>
                </IconButton>
                <div className={classes.deleteOrEditButtons}>
                    <IconButton onClick={open}>
                        <FilePenLine size={24}/>
                    </IconButton>
                    <RemoveProduct product={product} onSuccess={() => navigate('/')} iconSize={24}/>
                </div>
            </div>
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

export default ActionBar;