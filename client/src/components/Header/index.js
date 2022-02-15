import React, { useEffect } from 'react';
import { ButtonGroup, Form, Icon, Input } from '..';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import AccountButton from './AccountButton';
import HeaderBackdrop from './HeaderBackdrop';
import { useAppStore, useAuth } from '../../hooks';
import { manageModules } from '../../data/app';

const NativeHeader = tw.header`
    ${props => !props.large ? 'sticky top-0 left-0 right-0' : 'relative'}
    pl-8 pr-4 pt-4 pb-4 
    ${props => props.large && 'pb-32'}
    border-b-2 border-gray-200 
    bg-white
    ${props => props.large ? 'z-0' : 'z-20'}
`;

const Header = ({ large }) => {
    const { user } = useAuth()
    // const [ state, update, get ] = useAppStore()
    
    const handleSearchInput = (formData) => {
        // update('showSpotlightSearch', true)
    }
    
    const adminPanelNotifyAvailable = manageModules.some((module) => module.notify)
    
    // TODO: show a modal when user is starting to type and focus on the input
    
    return (
        <NativeHeader { ...{ large }}>
            <HeaderBackdrop { ...{ large }} />
            <div className="z-10 w-full flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/">
                        <h1
                            className="font-display text-3xl font-semibold mr-8"
                        >taptoe</h1>
                    </Link>
                    
                    <div className="" onClick={ handleSearchInput }>
                        <Form
                            onChange={ handleSearchInput }
                        >
                            <Input
                                icon="search"
                                name="query"
                                type="search"
                                block
                                placeholder="Plaats, verenging, etc."
                            />
                        </Form>
                    </div>
                </div>
                <div className="flex items-center">
                    <ButtonGroup>
                        <AccountButton />
                        {( user?.role?.name === 'ADMIN' || user?.role?.includes?.[0]?.name === 'ADMIN' )&& (
                            <Link
                                className="text-lg text-tt-emerald-700 bold bg-gray-100 px-4 py-2 rounded-xl flex items-center font-display lowercase relative"
                                to="/manage"
                            >   
                                { adminPanelNotifyAvailable && <div className="h-3 w-3 absolute -top-0.5 -right-0.5 bg-tt-emerald-500 z-10 rounded-full" />}
                                <Icon name="flashlight" className="text-tt-emerald-700 mr-3" color="currentColor" />
                                <span>Beheer</span>
                            </Link>
                        )}
                    </ButtonGroup>
                </div>
            </div>
        </NativeHeader>
    )
}

export default Header