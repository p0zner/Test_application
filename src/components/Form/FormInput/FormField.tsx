import classNames from "classnames";
import {forwardRef, type InputHTMLAttributes} from "react";

import classes from '../form.module.scss';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({className, hasError, ...props}, ref) => {
        return (
            <input
                ref={ref}
                className={classNames(classes.input, hasError && classes.inputError, className)}
                {...props}
            />
        )
    }
)

export default FormInput;