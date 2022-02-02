import React, { isValidElement, useEffect } from 'react';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import {ErrorBoundary} from 'react-error-boundary'
import { ErrorFallBackComponent } from '..';

const Form = ({ children, onSubmit, defaultValues, test, loading, setValues }) => {
    const methods = useForm({
        defaultValues
    });
    
    const handleSubmit = (values) => {
        if (test) {
            console.log('submitted', values);
            alert(JSON.stringify(values, null, 2))
        } else if (!loading) {
            onSubmit && onSubmit(values)
        }
    }
    
    useEffect(() => {
        if (setValues) {
            Object.entries(setValues).forEach(([key, value]) => {
                methods.setValue(key, value);
            })
        }
    }, [setValues])
    
    return (
        <ErrorBoundary FallbackComponent={ ErrorFallBackComponent }>
            <FormProvider { ...methods }>
                <form
                    onSubmit={methods.handleSubmit(handleSubmit)}
                >
                    { children instanceof Function ? children(methods) : children }
                    <button type="submit" className="hidden">submit</button>
                </form>
            </FormProvider>
        </ErrorBoundary>
    )
}

export default Form