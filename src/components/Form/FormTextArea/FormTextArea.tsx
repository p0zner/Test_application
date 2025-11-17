import classNames from "classnames";
import {forwardRef, type TextareaHTMLAttributes} from "react";

import classes from '../form.module.scss';

interface FormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    hasError?: boolean;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
    ({className, hasError, ...props}, ref) => {
        return (
            <textarea
                ref={ref}
                className={classNames(classes.input, hasError && classes.inputError, className)}
                {...props}
            />
        )
    }
)

export default FormTextArea;