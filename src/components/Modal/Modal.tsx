import {memo, type ReactNode, useRef} from "react";

import classes from './modal.module.scss'
import * as React from "react";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const Modal = memo(({isOpen, onClose, title, children}: ProductModalProps) => {
    const mouseDownTargetRef = useRef<EventTarget | null>(null);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        mouseDownTargetRef.current = event.target;
    };

    const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
        if (mouseDownTargetRef.current === event.target && event.currentTarget === event.target) {
            onClose();
        }
        mouseDownTargetRef.current = null;
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className={classes.backdrop} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
                <header className={classes.modalHeader}>
                    <h2>{title}</h2>
                    <button onClick={onClose} className={classes.closeButton}>&times;</button>
                </header>
                <div className={classes.formContainer}>
                    {children}
                </div>
            </div>
        </div>
    );
})

export default Modal;