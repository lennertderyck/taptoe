import { useLazyQuery } from '@apollo/client';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Form, Icon, Input, List } from '..'
import { QUERY } from '../../graphql';

const UserSearch = ({ onSelect, ...otherProps }) => {
    const [ search, setSearch ] = useState();
    const [ searchUser, searchUserState ] = useLazyQuery(QUERY.VALIDATE_USER)
    
    const handleQuerySearch = (data) => {
        if (!!data.query) setSearch(data.query)
        else setSearch()
    }
    
    const handleSelectResult = (result) => {
        setSearch()
        
        if (onSelect instanceof Function) onSelect(result)
    }
    
    useEffect(() => {
        if (!!search) {
            searchUser({ variables: {
                validationTypes: ['EMAIL', 'NAME'],
                value: search
            }})
        }
    }, [search])
    
    return (
        <div { ...otherProps }>
            <div className="flex flex-col items-center max-w-full">
                <Form onChange={ handleQuerySearch } className="w-full">
                    <Input name="query" type="search" placeholder="Zoek op email of naam" block autoComplete="off" />
                </Form>
                { !!search && (
                    <div className="mt-4 w-full">
                        { searchUserState?.data?.validateUser?.length > 0 && (
                            <div className="border-2 border-gray-200 rounded-2xl w-full px-4 py-1">
                                <List>
                                    {(ListItem) => (<>
                                        { searchUserState?.data?.validateUser?.map(result => (
                                            <ListItem contentClassName="hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectResult(result)}>
                                                <h3 className="text-gray-700">
                                                    { result.firstName } { result.lastName } 
                                                </h3>
                                                <h4 className="lowercase font-display text-gray-500 ">{ result.email }</h4>
                                            </ListItem>
                                        ))}
                                    </>)}
                                </List>
                            </div>
                        )}
                        { searchUserState.loading && (
                            <div className="w-full flex items-center justify-center mt-2">
                                <div className="animate-spin w-fit">
                                    <Icon name="refresh" color="currentColor" className="text-gray-500" />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserSearch