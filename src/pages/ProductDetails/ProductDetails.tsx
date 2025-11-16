import {useParams, useNavigate} from 'react-router-dom';
import {ArrowLeft, FilePenLine} from 'lucide-react';
import {useAppDispatch} from "../../store/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../store/hooks/useAppSelector.ts";
import {useCallback, useState} from "react";
import type {ProductFormData} from "../../components/AddProduct/schema/schema.ts";
import {toast} from "react-toastify";
import DeleteButton from "../../components/DeleteButton/DeleteButton.tsx";
import AddProductModal from "../../components/AddProduct/AddProductModal.tsx";
import {deleteProduct, editProduct} from "../../store/thunks/productsThunk.ts";
import {convertPrice} from "../../utils/price.utils.ts";
import Loader from "../../components/Loader/Loader.tsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import IconButton from "../../components/IconButton/IconButton.tsx";
import {selectProductById} from "../../store/selectors/selectProductById.ts";
import {useModal} from "../../hooks/useModal.ts";
import ImageModal from "../../components/ImageModal/ImageModal.tsx";

import classes from './productDetails.module.scss';

const ProductDetailPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {productId} = useParams<{ productId: string }>();

    const status = useAppSelector(state => state.products.status);

    const {isOpen, open, close} = useModal()
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const product = useAppSelector(state => selectProductById(state, productId || ''))

    const handleDelete = useCallback(async (id: string) => {
        try {
            await dispatch(deleteProduct(id)).unwrap()
            toast.success("Товар удален");
            navigate('/')
        } catch (error) {
            toast.error('Не удалось удалить товар')
        }
    }, [dispatch, navigate]);

    const handleEdit = async (data: ProductFormData, id?: string): Promise<void> => {
        if (id === undefined || !product) return Promise.reject('Id не найден')
        try {
            await dispatch(editProduct({id, data, currentImage: product.image})).unwrap()
            toast.success('Редактирование завершено успешно');
        } catch (error) {
            toast.error('Не удалось отредактировать товар')
        }
    }

    if (status === 'loading') {
        return <Loader/>
    }
    if (status === 'succeeded' && !product) {
        return <NotFoundPage/>;
    }

    return (
        <>
            <div className={classes.pageContainer}>
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
                )
                }
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