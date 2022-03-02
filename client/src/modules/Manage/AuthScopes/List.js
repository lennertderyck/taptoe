import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, Input, List, SymbolButton } from '../../../components';
import { authScopeTypes } from '../../../data/app';
import { MUTATE, QUERY } from '../../../graphql';
import { alphaNumeric } from '../../../utils/regex';

const AuthScopesList = () => {
    const [ deleteAuthScope, deletedAuthScopeState ] = useMutation(MUTATE.DELETE_AUTHSCOPE)
    const [ createAuthScope, createdAuthScopeState ] = useMutation(MUTATE.CREATE_OR_UPDATE_AUTHSCOPE)
    const authScopesState = useQuery(QUERY.AUTH_SCOPES)
    const [ newScopeSuggestion, setNewScopeSuggestion ] = useState();
    
    const handleChange = (values) => {
        if (values.type && !!values.name) {
            setNewScopeSuggestion(values)
        } else {
            setNewScopeSuggestion()
        }
    }
    
    const handleSubmit = (data, methods) => {
        const generatedName = data.type + ':' + data.name.replace(alphaNumeric, '-').substring(0, 30).toLowerCase()
        
        createAuthScope({ variables: { authScope: {
            name: generatedName,
            description: data.description,
        }}})
        
        methods.reset()
    }
    
    const handleDelete = (id) => {
        deleteAuthScope({
            variables: { id },
        })
    }
    
    useEffect(() => {
        if (authScopesState.data && !createdAuthScopeState.loading) {
            authScopesState.refetch();
        }
        if (deletedAuthScopeState.data && !deletedAuthScopeState.loading) {
            authScopesState.refetch();
        }
    }, [ 
        createdAuthScopeState.data, 
        createdAuthScopeState.loading,
        deletedAuthScopeState.data,
        deletedAuthScopeState.loading
    ])
    
    return (
        <List>
            {(ListItem) => (
                <>
                    <ListItem>
                        <h4 class="lowercase font-display font-medium text-lg text-gray-800 -mb-1">Scope toevoegen</h4>
                        <Form 
                            defaultValues={{
                                type: 'read'
                            }}
                            onSubmit={ handleSubmit }
                            onChange={ handleChange }
                        >
                            <div className="flex items-center">
                                <div className="">
                                    <Input type="select" name="type">
                                        { authScopeTypes.map((type, index) => (
                                            <option
                                                key={ index } 
                                                value={ type.name }
                                            >{ type.name }</option>
                                        ))}
                                    </Input>
                                </div>
                                <div className="mx-2">:</div>
                                <div className="flex-1 mr-6">
                                    <Input type="text" name="name" block placeholder="Collectie/scope naam (bv. 'locations')" />
                                </div>
                                <div className="flex-1 mr-6">
                                    <Input type="text" name="description" block placeholder="Omschrijving" />
                                </div>
                                <div>
                                    <ButtonGroup>
                                        <Button icon="add" type="submit" />
                                    </ButtonGroup>
                                </div>
                            </div>
                        </Form>
                    </ListItem>
                    <ListItem>
                        <div className="flex items-center">
                            <div className="flex-1">
                                <h3 className="text-gray-500">Toestemming</h3>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-gray-500">Omschrijving</h3>
                            </div>
                            <div className="invisible">
                                <ButtonGroup>
                                    <Button icon="delete-bin-6" />
                                </ButtonGroup>
                            </div>
                        </div>
                    </ListItem>
                    {newScopeSuggestion && <ListItem>
                        <div className="flex items-center opacity-60">
                            <div className="flex-1">
                                <h3 className="lowercase font-display italic">{ newScopeSuggestion.type }:{ newScopeSuggestion.name?.replace(alphaNumeric, '-').substring(0, 30).toLowerCase() }</h3>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-gray-700 italic">{ newScopeSuggestion.description }</h3>
                            </div>
                            <div className="invisible">
                                <ButtonGroup>
                                    <Button icon="delete-bin-6" />
                                </ButtonGroup>
                            </div>
                        </div>
                    </ListItem>}
                    {authScopesState.data && authScopesState.data.readAuthScopes.map((scope, index) => (
                        <ListItem>
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <h3 className="lowercase font-display">{ scope.name }</h3>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-gray-700">{ scope.description }</h3>
                                </div>
                                <div>
                                    <ButtonGroup>
                                        <Button icon="delete-bin-6" onClick={() => handleDelete(scope.id) } />
                                    </ButtonGroup>
                                </div>
                            </div>
                        </ListItem>
                    ))}
                </>
            )}
        </List>
    )
}

export default AuthScopesList