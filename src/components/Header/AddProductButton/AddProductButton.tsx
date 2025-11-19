import classes from "@/components/Header/header.module.scss";
import {Plus} from "lucide-react";
import ProductModal from "@/components/ProductModal/ProductModal.tsx";
import {useModal} from "@/hooks/useModal.ts";
import {useCallback} from "react";
import type {ProductFormData} from "@/components/Form/schema/schema.ts";
import {addProduct} from "@/store/thunks/productsThunk.ts";
import {toast} from "react-toastify";
import {useAppDispatch} from "@/store/hooks/useAppDispatch.ts";

const AddProductButton = () => {
    const {isOpen, open, close} = useModal()
    const dispatch = useAppDispatch();

    const handleAdd = useCallback(async (data: ProductFormData) => {
        try {
            await dispatch(addProduct(data)).unwrap();
            toast.success('Товар успешно добавлен!')
        }  catch (error) {
            toast.error('Не удалось сохранить товар');
        }
    }, [dispatch]);

    return (
        <>
            <div>
                <button className={classes.addButton} onClick={open}>
                    <Plus/>
                    Добавить товар
                </button>
            </div>

            <ProductModal
                key="add-product"
                isOpen={isOpen}
                onClose={close}
                onSubmit={handleAdd}
                editingProduct={null}
            />
        </>
    )
}

export default AddProductButton;