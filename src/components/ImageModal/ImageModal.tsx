import { memo } from 'react';
import { X } from 'lucide-react';
import classes from './imageModal.module.scss';

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    imageAlt: string;
}

const ImageModal = memo(({ isOpen, onClose, imageUrl, imageAlt }: ImageModalProps) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={classes.backdrop} onClick={onClose}>
            <button className={classes.closeButton} onClick={onClose} aria-label="Закрыть">
                <X size={32} />
            </button>

            <div className={classes.imageContainer} onClick={(e) => e.stopPropagation()}>
                <img src={imageUrl} alt={imageAlt} className={classes.image} />
            </div>
        </div>
    );
});

export default ImageModal;