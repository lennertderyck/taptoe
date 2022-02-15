import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { Form, Input } from '..';
import { QUERY } from '../../graphql';
import Wrapper from '../Input/Wrapper';

const RoleSelector = ({ onChange }) => {
    const [ isOpen, setOpen ] = useState(false)
    const [ selectedRole, setRole ] = useState(null);
    const { data, error, loading, refetch } = useQuery(QUERY.ROLES)
    
    const handleSelect = (role) => {
        setOpen(false)
        setRole(role)
        if (onChange instanceof Function) onChange(role)
    }
    
    return <div className="relative">
        <Wrapper className="cursor-pointer" block outline onClick={() => setOpen(s => !s)}>
            { loading && <p className="text-gray-500">Rollen ophalen</p>}
            { error && <p className="text-gray-500">We konden geen rollen ophalen</p>}
            { data && !selectedRole && <p className="text-gray-500">Kies een rol</p>}
            { data && selectedRole && <p className="text-gray-500">{ selectedRole.label }</p>}
        </Wrapper>
        { isOpen && <div className="absolute top-0 left-0 right-0 z-10">
            <div className="bg-white border-2 rounded-2xl overflow-hidden px-3">
                { data && data.readRoles.map(role => (
                    <button 
                        className={ classNames('block border-b-2 last:border-b-0 py-3 px-2 w-full text-left hover:bg-gray-100', selectedRole?.id === role.id && 'bg-gray-100')}
                        onClick={() => handleSelect(role)}
                    >{ role.label }</button>
                ))}
            </div>
        </div>}
    </div>
    
    return (
        <Popup
            trigger={
                <Wrapper className="w-fit">
                    { loading && <p className="text-gray-500">Rollen ophalen</p>}
                    { error && <p className="text-gray-500">We konden geen rollen ophalen</p>}
                    { data && !selectedRole && <p className="text-gray-500">Kies een rol</p>}
                    { data && selectedRole && <p className="text-gray-500">{ selectedRole.label }</p>}
                </Wrapper>
            }
            position={['top center', 'bottom right', 'bottom left']}
            closeOnDocumentClick
            disabled={ loading }
            className="w-fit"
        >
            <div className="">
                { data && data.readRoles.map(role => (
                    <button 
                        className={ classNames('block border-b-2 last:border-b-0 py-3 px-4 w-full text-left', selectedRole?.id === role.id && 'bg-gray-100')}
                        onClick={() => handleSelect(role)}
                    >{ role.label }</button>
                ))}
            </div>
        </Popup>
    )
}

export default RoleSelector