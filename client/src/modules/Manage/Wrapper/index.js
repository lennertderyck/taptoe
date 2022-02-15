import classNames from 'classnames';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Devider, LinkButton } from '../../../components';
import { manageModules } from '../../../data/app';

const ManageWrapperModule = () => {
    return (
        <>
            <div className="border-b-2">
                <Container className="!mt-0 py-4 flex items-center">
                    <div className="flex items-center justify-between">
                        <LinkButton to={ '/manage' } icon="arrow-left">Terug naar overzicht</LinkButton>
                    </div>
                    <Devider className="mx-3 self-stretch" />
                    <div className="flex-1 flex overflow-scroll scrollbar-hide">
                        {
                            manageModules.map(module => (
                                <div key={ module.name } className={ classNames(module.disabled && 'opacity-50 pointer-events-none', 'mr-3 last:mr-0 relative') }>
                                    { module.notify && <div className="h-2.5 w-2.5 absolute top-0 right-0 bg-tt-emerald-500 z-10 rounded-full" />}
                                    <LinkButton 
                                        to={ module.path } 
                                        icon={ module.icon } 
                                        className={({ isActive }) => classNames(
                                            'w-full flex items-center justify-center'
                                        )}
                                    >
                                        { module.name }
                                    </LinkButton>
                                </div>
                            ))
                        }
                    </div>
                </Container>
            </div>
            <Outlet />
        </>
    )
}

export default ManageWrapperModule