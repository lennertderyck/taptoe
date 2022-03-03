import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Button, ButtonGroup, Form, Input, InputGroup, List } from '../components';
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
                id: role.id
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
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4">
                    <InputGroup>
                        <Input block name="label" label="Rol label" placeholder="Bv. Moderator" />
                    </InputGroup>
                    <InputGroup>
                        <Input block name="name" label="Rol code" placeholder="Bv. MOD" />
                    </InputGroup>
                    <InputGroup>
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
                    </InputGroup>
                    <ButtonGroup className="mt-6">
                        <Button type="submit" theme="primary" loading={ roleUpdateState.loading }>Rol { role ? 'opslaan' : 'toevoegen'}</Button>
                        <Button type="reset" onClick={ handleReset } disabled={ roleUpdateState.loading }>annuleren</Button>
                    </ButtonGroup>
                </div>
                <div className="col-span-8">
                    <List>
                        {(ListItem) => (<>
                            { roleState.data?.readAuthScopes?.map((scope, index) => (
                                <ListItem>
                                    <label className="flex items-center">
                                        <div className="flex-1 flex items-center">
                                            <Input type="checkbox" name={ `scopes` } value={ scope.id } className="mr-3" />
                                            <h3 className="lowercase font-display">{ scope.name }</h3>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-gray-700">{ scope.description }</h3>
                                        </div>
                                    </label>
                                </ListItem>
                            ))}
                        </>)}
                    </List>
                </div>
            </div>
        </Form>
    )
}

export default CreateRole