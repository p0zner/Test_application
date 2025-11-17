import {useCallback} from "react";
import {deleteProduct} from "../../store/thunks/productsThunk.ts";
import {toast} from "react-toastify";
import {useAppDispatch} from "../../store/hooks/useAppDispatch.ts";
import DeleteButton from "../DeleteButton/DeleteButton.tsx";
import type {Product} from "../../types/product.ts";

interface RemoveProductProps {
    product?: Product;
    iconSize?: number;
    displayMode?: 'overlay' | 'plain';
    onSuccess?: () => void;
}

const RemoveProduct = ({product, iconSize = 18, displayMode = 'plain', onSuccess}: RemoveProductProps) => {
    const dispatch = useAppDispatch();

    const handleDelete = useCallback(async (id: string) => {
        try {
            await dispatch(deleteProduct(id)).unwrap()
            if (onSuccess) {
                onSuccess()
            }
            toast.success("Товар удален");
        } catch (error) {
            toast.error('Не удалось удалить товар')
        }
    }, [dispatch, onSuccess]);

    return (
        product ? <DeleteButton id={product.id} onDelete={handleDelete} iconSize={iconSize} displayMode={displayMode}/> : null
    )
}

export default RemoveProduct;