import IconButton from "../IconButton/IconButton.tsx";
import {deleteProduct, editProduct} from "../../store/thunks/productsThunk.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store/hooks/useAppDispatch.ts";
import {useCallback} from "react";
import {ArrowLeft, FilePenLine} from "lucide-react";
import DeleteButton from "../DeleteButton/DeleteButton.tsx";
import type {Product} from "../../types/product.ts";

import classes from './actionBar.module.scss';
import {useModal} from "../../hooks/useModal.ts";
import AddProductModal from "../AddProduct/AddProductModal.tsx";
import type {ProductFormData} from "../AddProduct/schema/schema.ts";

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

    const handleDelete = useCallback(async (id: string) => {
        try {
            await dispatch(deleteProduct(id)).unwrap()
            toast.success("Товар удален");
            navigate('/')
        } catch (error) {
            toast.error('Не удалось удалить товар')
        }
    }, [dispatch, navigate]);

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
                    {product && <DeleteButton id={product.id} onDelete={handleDelete} iconSize={24}/>}
                </div>
            </div>
            <AddProductModal
                key={product?.id || 'editModal'}
                isOpen={isOpen}
                onClose={close}
                onAddProduct={handleEdit}
                editingProduct={product || null}
            />
        </>
    )
}

export default ActionBar;