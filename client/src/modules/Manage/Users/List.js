import { useQuery } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup, Form, Icon, Input, List, OtpTokenPopup } from '../../../components';
import { QUERY } from '../../../graphql';
import { useAuth } from '../../../hooks';
import Popup from 'reactjs-popup';

const UsersList = () => {
    const [ otpRequestState, setOtpRequestState ] = useState(false)
    const { user: currentUser } = useAuth()
    const selectAllCheckboxRef = useRef()
    const [ selectedUsers, setSelectedUsers ] = useState([]);
    const [ selectAll, setSelectAll ] = useState(false)
    const usersState = useQuery(QUERY.USERS)
    
    const addItem = (id, data) => {
        setSelectedUsers(current => [
            ...current,
            { id, data }
        ])
    }
    
    const removeItem = (id) => {
        setSelectedUsers(current => current.filter(item => item.id !== id))
    }
    
    const handleListChange = ({ id, checked, data }) => {
        if (checked) {
            addItem(id, data)
        } else {
            removeItem(id)
        }
    }
    
    const handleSelectAll = () => {
        if (!selectAll) {
            const selectedData = usersState?.data?.readUsers?.map(user => ({
                id: user.id,
                data: user,
                checked: true
            }))
            
            setSelectedUsers(selectedData)
        } else {
            setSelectedUsers([])
        }
    }
    
    useEffect(() => {
        if (selectedUsers.length === usersState.data?.readUsers.length) {
            setSelectAll(true)
            selectAllCheckboxRef.current.indeterminate = false
        } else if (selectedUsers.length === 0) {
            setSelectAll(false)
            selectAllCheckboxRef.current.indeterminate = false
        } else {
            setSelectAll(false)
            selectAllCheckboxRef.current.indeterminate = true
        }
    }, [ selectedUsers ])
    
    return (
        <>
            <div className="border-b-2 border-gray-200 py-3 flex items-center justify-between">
                <div>
                    <input onInput={ handleSelectAll } type="checkbox" checked={ selectAll } ref={ selectAllCheckboxRef }/>
                    <span className="lowercase font-display text-gray-500 ml-3">{ selectAll && 'Alle' } { selectedUsers.length } gebruikers geselecteerd</span>
                </div>
            </div>
            <List
                onChange={ handleListChange }
            >
                {(ListItem) => (
                    <>
                        { usersState?.data?.readUsers?.map((user) => (
                            <ListItem 
                                selectable 
                                key={ user.id }
                                id={ user.id }
                                data={ user }
                                selected={ selectedUsers.find(s => s.id === user.id )}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-gray-700">
                                            { user.firstName } { user.lastName } 
                                        </h3>
                                        <h4 className="lowercase font-display text-gray-500 ">
                                            {( currentUser.id === user.id ) && <>
                                                <Icon name="check-double" className="text-tt-emerald-500 mr-1 inline" color="currentColor" />
                                                <span className="text-tt-emerald-500 font-display">huidige gebruiker</span>
                                            <span> &nbsp; | &nbsp; </span>
                                            </>}
                                            <span className="font-normal">{ user.email }</span> – <span>{ user.role.label }</span>
                                        </h4>
                                    </div>
                                    <div>
                                        <ButtonGroup>
                                            <Button icon="settings-4" />
                                            <Button icon="lock-password" onClick={() => setOtpRequestState(user)} />
                                        </ButtonGroup>
                                    </div>
                                </div>
                            </ListItem>
                        ))}
                    </>
                )}
            </List>
            <OtpTokenPopup 
                user={ otpRequestState }
                onClose={() => setOtpRequestState(false)}
            />
        </>
    )
}

export default UsersList