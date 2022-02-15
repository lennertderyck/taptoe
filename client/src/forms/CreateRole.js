import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Button, ButtonGroup, Form, Input, InputGroup } from '../components';
import { MUTATE, QUERY } from '../graphql';

const CreateRole = ({ onReset, onSubmit, onReady, role, otherProps }) => {
    const roleState = useQuery(QUERY.ROLES);
    const [ updateOrCreateRole, roleUpdateState ] = useMutation(MUTATE.CREATE_OR_UPDATE_ROLE)
    
    const handleReset = () => {
        if (onReset instanceof Function) onReset()
        console.log('reset')
    }
    
    const handleSubmit = (data) => {
        if (onSubmit instanceof Function) onSubmit(data)
        else { // <- send data
            const { id, ...roleData } = data;
            
            updateOrCreateRole({ variables: { 
                role: roleData,
                id
            }})
        }
    }
    
    useEffect(() => {
        if (roleUpdateState.data && onReady instanceof Function) {
            onReady()
        }
    }, [roleUpdateState])
    
    return (
        <Form 
            defaultValues={{
                ...role,
                'includes[0]': role?.includes?.[0]?.id
            }}
            onSubmit={ handleSubmit } 
            loading={ roleUpdateState.loading }
            { ...otherProps }
        >
            <InputGroup>
                <Input block name="label" label="Rol label" placeholder="Bv. Moderator" />
                <Input block name="name" label="Rol code" placeholder="Bv. MOD" />
            </InputGroup>
            <Input 
                block
                label="Inclusief rechten" 
                type="select" 
                name="includes[0]"
                setValueAs={value => {
                    console.log({ value})
                    if (value === 'noRole') return undefined
                    else return value
                }}
            >
                <option value="noRole">Geen extra rechten</option>
                { roleState.data?.readRoles?.filter(r => r.id !== role?.id).map(role => (
                    <option key={ role.id } value={ role.id }>{ role.label }</option>
                ))}
            </Input>
            <ButtonGroup className="mt-6">
                <Button type="submit" theme="primary" loading={ roleUpdateState.loading }>Rol { role ? 'opslaan' : 'toevoegen'}</Button>
                <Button type="reset" onClick={ handleReset } disabled={ roleUpdateState.loading }>annuleren</Button>
            </ButtonGroup>
        </Form>
    )
}

export default CreateRole