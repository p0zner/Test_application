import type {FieldError} from "react-hook-form";
import type {ReactNode} from "react";

import classes from '../form.module.scss'

interface FormFieldProps {
    title: string;
    htmlFor: string;
    error?: FieldError;
    children: ReactNode;
}

const FormField = ({title, htmlFor, error, children}: FormFieldProps) => {
    return (
        <div className={classes.formGroup}>
            <label htmlFor={htmlFor} className={classes.label}>
                {title}
            </label>
            {children}
            {error && <p className={classes.error}>{error.message}</p>}
        </div>
    )
}

export default FormField;