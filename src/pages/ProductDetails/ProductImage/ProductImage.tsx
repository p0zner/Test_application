import classes from "../productDetails.module.scss";
import ImageModal from "../../../components/ImageModal/ImageModal.tsx";
import type {Product} from "../../../types/product.ts";
import {useModal} from "../../../hooks/useModal.ts";

interface ProductImageProps {
    product: Product;
}

const ProductImage = ({product}: ProductImageProps) => {
    const {isOpen, open, close} = useModal()

    return (
        <>
        <div className={classes.imageContainer} onClick={open}>
            <img src={product.image} alt={product.title} className={classes.image}/>
        </div>
            <ImageModal
                isOpen={isOpen}
                onClose={close}
                imageUrl={product.image}
                imageAlt={product.title}
            />
        </>
    )
}

export default ProductImage