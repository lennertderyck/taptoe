import React, { isValidElement, useEffect, useMemo } from 'react';
import { useForm, FormProvider, useFormContext, useWatch } from "react-hook-form";
import {ErrorBoundary} from 'react-error-boundary'
import { ErrorFallBackComponent } from '..';

const Form = ({ children, onSubmit, onChange, defaultValues, test, loading, setValues, ...otherProps }) => {
    const methods = useForm({
        defaultValues
    });
    const watchedValues = useWatch({
        control: methods.control
    })
    
    const handleSubmit = (values) => {
        if (test) {
            console.log('submitted', values);
            alert(JSON.stringify(values, null, 2))
        } else if (!loading) {
            onSubmit && onSubmit(values, methods)
        }
    }
    
    useEffect(() => {
        if (setValues) {
            Object.entries(setValues).forEach(([key, value]) => {
                methods.setValue(key, value);
            })
        }
    }, [setValues])
    
    useEffect(() => {
        // const subscription = methods.watch((value) => {
            if (onChange instanceof Function) {
                onChange(watchedValues, methods)
            }
        // });
        // return () => subscription.unsubscribe();
    }, [watchedValues]);

    
    return (
        <ErrorBoundary FallbackComponent={ ErrorFallBackComponent }>
            <FormProvider { ...methods }>
                <form
                    onSubmit={methods.handleSubmit(handleSubmit)}
                    { ...otherProps }
                >
                    { children instanceof Function ? children(watchedValues, methods) : children }
                    <button type="submit" className="hidden">submit</button>
                </form>
            </FormProvider>
        </ErrorBoundary>
    )
}

export default Form