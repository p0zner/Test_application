import {Link} from "react-router-dom";
import classes from './header.module.scss'
import {Plus} from "lucide-react";
import {useAppDispatch} from "../../store/hooks/useAppDispatch.ts";
import {useCallback} from "react";
import type {ProductFormData} from "../Form/schema/schema.ts";
import {toast} from "react-toastify";
import {addProduct} from "../../store/thunks/productsThunk.ts";
import {useModal} from "../../hooks/useModal.ts";
import ProductModal from "../ProductModal/ProductModal.tsx";

const Header = () => {
    const dispatch = useAppDispatch();
    const {isOpen, open, close} = useModal()

    const handleAdd = useCallback(async (data: ProductFormData) => {
        try {
            await dispatch(addProduct(data)).unwrap();
            toast.success('Товар успешно добавлен!')
        }  catch (error) {
            toast.error('Не удалось сохранить товар');
        }
    }, [dispatch]);

    return (
    <header className={classes.appHeader}>
        <Link to={`/`}>
            <h1 className={classes.appTitle}>Ягодки :)</h1>
        </Link>
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
    </header>
    )
}

export default Header;