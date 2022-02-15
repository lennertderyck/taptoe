import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Icon, PageHeader } from '../../../components';
import { manageModules } from '../../../data/app';

const ManageOverviewModule = () => {
    return (
        <>
            <Container>
                <PageHeader
                    subtitle="Beheer"
                    title="Overzicht"
                />
            </Container>
            <div className="grid grid-cols-12 gap-6 px-12">
                {
                    manageModules.map(module => (
                        <div 
                            key={ module.name } 
                            className={ classNames(
                                module.disabled ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-100', 
                                'col-span-4 border-2 border-gray-200 rounded-2xl relative') 
                            }
                        >
                            { module.notify && <div className="h-4 w-4 absolute -top-1 -right-1 bg-tt-emerald-500 z-10 rounded-full" />}
                            <Link to={ module.path } className="w-full flex items-center justify-center p-9">
                                <Icon name={ module.icon } className="text-gray-500 mr-3" size="1.5rem" color="currentColor" />
                                <h3 className="text-xl font-medium font-display lowercase text-gray-700 -translate-y-0.5">{ module.name }</h3>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ManageOverviewModule