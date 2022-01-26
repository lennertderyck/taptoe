import React from 'react';
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const Form = ({ children, onSubmit, initialValues, test }) => {
    const methods = useForm();

    return (
        <FormProvider { ...methods }>
            <form
                onSubmit={methods.handleSubmit((values) => {
                    if (test) {
                        console.log('submitted', values);
                        alert(JSON.stringify(values, null, 2))
                    } else {
                        onSubmit && onSubmit(values)
                    }
                })}
            >
                { children }
                <button type="submit" className="hidden">submit</button>
            </form>
        </FormProvider>
    )
}

export default Form