import React from 'react'
import { useFormikContext } from "formik";
import { Input, InputType } from "../Input";

type FormikInputType = {
    name: string,
    placeholder?: string
} & InputType;

export const FormikInput: React.FC<FormikInputType> = ({ name, placeholder, ...props }) => {
    const formik = useFormikContext<any>();
    return <Input
        placeholder={placeholder}
        onChangeText={formik.handleChange(name)}
        isValid={formik.errors[name] === undefined}
        touched={formik.touched[name] as boolean}
        errorMessage={formik.errors[name] as string}
        value={formik.values[name]}
        onBlur={formik.handleBlur(name)}
        {...props}
    />
}