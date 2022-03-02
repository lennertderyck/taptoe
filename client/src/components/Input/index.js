import React, { useEffect } from 'react';
import { Icon } from '..';
import Field from './fieldTypes/input';
import Select from './fieldTypes/select';
import Checkbox from './fieldTypes/checkbox';
import Wrapper from './Wrapper';
import { useFormContext } from "react-hook-form";
import LabelContainer from './LabelContainer';

const InputWrapper = ({ children, block, disabled, icon }) => {
    return (
        <Wrapper
            {...{ block, disabled }}
        >
            { icon && <Icon name={ icon } color="#000" className="mr-4" />}
            { children }
        </Wrapper>
    )
}

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
        icon,
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
            'select': (
                <InputWrapper { ...fieldProperties }>
                    <Select
                        { ...fieldProperties }
                        className="text-lg font-body placeholder:text-gray-400"
                    >{ otherProps.children }</Select>
                </InputWrapper>
            ),
            'checkbox': (
                <Checkbox 
                    { ...fieldProperties }
                />
            )
        }[type] || (
            <InputWrapper { ...fieldProperties }>
                <Field
                    { ...fieldProperties }
                    className="text-lg font-body placeholder:text-gray-400"
                />
            </InputWrapper>
        )
    }
    
    return (
        <LabelContainer
            {...{ block }}
        >
            { label && <h4 className="mb-2">{ label }</h4>}
                { renderField(type, otherProps) }
        </LabelContainer>
    )
}

export default Input