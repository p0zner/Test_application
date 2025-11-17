import {useParams} from 'react-router-dom';
import {useAppDispatch} from "../../store/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../store/hooks/useAppSelector.ts";
import {useState} from "react";
import type {ProductFormData} from "../../components/AddProduct/schema/schema.ts";
import {toast} from "react-toastify";
import AddProductModal from "../../components/AddProduct/AddProductModal.tsx";
import {editProduct} from "../../store/thunks/productsThunk.ts";
import {convertPrice} from "../../utils/price.utils.ts";
import Loader from "../../components/Loader/Loader.tsx";
import {selectProductById} from "../../store/selectors/selectProductById.ts";
import {useModal} from "../../hooks/useModal.ts";
import ImageModal from "../../components/ImageModal/ImageModal.tsx";

import classes from './productDetails.module.scss';
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import ActionBar from "../../components/ActionBar/ActionBar.tsx";

const ProductDetailPage = () => {
    const dispatch = useAppDispatch();
    const {productId} = useParams<{ productId: string }>();

    const status = useAppSelector(state => state.products.status);

    const {isOpen, close} = useModal()
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const product = useAppSelector(state => selectProductById(state, productId || ''))

    const handleEdit = async (data: ProductFormData, id?: string): Promise<void> => {
        if (id === undefined || !product) return Promise.reject('Id не найден')
        try {
            await dispatch(editProduct({id, data})).unwrap()
            toast.success('Редактирование завершено успешно');
        } catch (error) {
            toast.error('Не удалось отредактировать товар')
        }
    }

    if (status === 'loading') {
        return <Loader/>
    }
    if (status === 'succeeded' && !product) {
        return <NotFoundPage title="Товар не найден" />
    }

    return (
        <>
            <div className={classes.pageContainer}>
                <ActionBar product={product}/>
                {product && (
                    <div className={classes.contentGrid}>
                        <div className={classes.imageContainer} onClick={() => setIsImageModalOpen(true)}>
                            <img src={product.image} alt={product.title} className={classes.image}/>
                        </div>
                        <div className={classes.infoContainer}>
                            <h1 className={classes.title}>{product.title}</h1>
                            <p className={classes.description}>{product.description}</p>
                            <div className={classes.price}>{convertPrice(product.price)} ₽</div>
                        </div>
                    </div>
                )}
                {product && (
                    <ImageModal
                        isOpen={isImageModalOpen}
                        onClose={() => setIsImageModalOpen(false)}
                        imageUrl={product.image}
                        imageAlt={product.title}
                    />
                )}
                <AddProductModal
                    key={product?.id || 'editModal'}
                    isOpen={isOpen}
                    onClose={close}
                    onAddProduct={handleEdit}
                    editingProduct={product || null}
                />
            </div>
        </>
    );
};

export default ProductDetailPage;