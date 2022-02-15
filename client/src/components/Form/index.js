import React, { isValidElement, useEffect, useMemo } from 'react';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import {ErrorBoundary} from 'react-error-boundary'
import { ErrorFallBackComponent } from '..';

const Form = ({ children, onSubmit, onChange, defaultValues, test, loading, setValues }) => {
    const methods = useForm({
        defaultValues
    });
    
    console.log('Form render')
    
    // const watchedValues = methods.watch();
    
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
    
    useEffect(() => {
        const subscription = methods.watch((value) => {
            if (onChange instanceof Function) {
                onChange(value)
            }
        });
        return () => subscription.unsubscribe();
      }, []);

    
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