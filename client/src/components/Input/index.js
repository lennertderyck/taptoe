import React, { useEffect } from 'react';
import { Icon } from '..';
import Field from './fieldTypes/input';
import Select from './fieldTypes/select';
import Wrapper from './Wrapper';
import { useFormContext } from "react-hook-form";
import LabelContainer from './LabelContainer';

const Input = ({ icon, label, name = '', block, type, setValueAs, ...otherProps }) => {
    const { register, unregister } = useFormContext();
    
    useEffect(() => (
        () => {
            unregister(name);
        }
    ), [])
    
    const disabled = otherProps.disabled || false
    const fieldProperties = {
        block, 
        type,
        disabled,
        ...otherProps,
        ...register(name, {
            required: otherProps.required,
            validate: otherProps.validate,
            disabled: otherProps.disabled,
            setValueAs,
            shouldUnregister: true,
            valueAsNumber: type === 'number'
        })
    }
    
    const renderField = (type, otherProps) => {
        return {
            'select': <Select
                { ...fieldProperties }
                className="text-lg font-body placeholder:text-gray-400"
            >{ otherProps.children }</Select>
        }[type] || (
            <Field
                { ...fieldProperties }
                className="text-lg font-body placeholder:text-gray-400"
            />
        )
    }
    
    return (
        <LabelContainer
            {...{ block }}
        >
            { label && <h4 className="mb-2">{ label }</h4>}
            <Wrapper
                {...{ block, disabled }}
            >
                { icon && <Icon name={ icon } color="#000" className="mr-4" />}
                { renderField(type, otherProps) }
            </Wrapper>
            {/* {meta.touched && meta.error && (
                <div className="error">{meta.error}</div>
            )} */}
        </LabelContainer>
    )
}

export default Input