import {memo, useState} from 'react';
import {Trash2} from 'lucide-react';
import classes from './deleteButton.module.scss';
import * as React from "react";
import IconButton from "../IconButton/IconButton.tsx";
import classNames from "classnames";
import Loader from "../Loader/Loader.tsx";

interface DeleteButtonProps {
    id: string;
    onDelete: (id: string) => Promise<void>;
    iconSize?: number;
    displayMode?: 'overlay' | 'plain';
}

const DeleteButton = memo(({id, onDelete, iconSize = 18, displayMode = 'plain'}: DeleteButtonProps) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();

        setIsDeleting(true);
        try {
            await onDelete(id);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div
            className={classNames(
                classes.wrapper,
                {
                    [classes.overlayMode]: displayMode === 'overlay',
                },
            )}
        >
            <IconButton
                onClick={handleDelete}
                disabled={isDeleting}
                variant={'delete'}
            >
                <Trash2 size={iconSize}/>
            </IconButton>

            {isDeleting && (
                <div className={classes.deletingOverlay}>
                    <Loader size={20} thickness={3} loaderInButton />
                </div>
            )
            }
        </div>
    );
});

export default DeleteButton;