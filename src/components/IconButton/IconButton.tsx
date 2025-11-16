import {memo, type ReactNode} from 'react';
import classNames from 'classnames';
import classes from './iconButton.module.scss'
import * as React from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'default' | 'delete';
}

const IconButton = memo(({ children, className, variant = 'default', ...props }: IconButtonProps) => {
    return (
        <button
            className={classNames(
                classes.iconButton,
                {
                    [classes.deleteVariant]: variant === 'delete',
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
});

export default IconButton;