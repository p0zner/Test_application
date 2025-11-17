import {useParams} from 'react-router-dom';
import {useAppSelector} from "../../store/hooks/useAppSelector.ts";
import {useState} from "react";
import {convertPrice} from "../../utils/price.utils.ts";
import Loader from "../../components/Loader/Loader.tsx";
import {selectProductById} from "../../store/selectors/selectProductById.ts";
import ImageModal from "../../components/ImageModal/ImageModal.tsx";

import classes from './productDetails.module.scss';
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import ActionBar from "../../components/ActionBar/ActionBar.tsx";

const ProductDetailPage = () => {
    const {productId} = useParams<{ productId: string }>();

    const status = useAppSelector(state => state.products.status);

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const product = useAppSelector(state => selectProductById(state, productId || ''))

    if (status === 'loading') {
        return <Loader/>
    }
    if (status === 'succeeded' && !product) {
        return <NotFoundPage title="Товар не найден"/>
    }

    return (
        <>
            <div className={classes.pageContainer}>
                <ActionBar product={product}/>
                {product && (
                    <>
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
                        <ImageModal
                            isOpen={isImageModalOpen}
                            onClose={() => setIsImageModalOpen(false)}
                            imageUrl={product.image}
                            imageAlt={product.title}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default ProductDetailPage;