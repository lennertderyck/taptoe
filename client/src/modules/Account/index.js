import { AddButton, Button, ButtonGroup, Container, Icon, PageHeader, RoleSelector } from '../../components';

import BaseLayout from '../../layouts/BaseLayout';
import { Link } from 'react-router-dom';
import { MUTATE, QUERY } from '../../graphql';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import useSplash from '../../hooks/useSplash';
import { formatPinType } from '../../utils';
import Popup from 'reactjs-popup';

const AccountModule = () => {
    const { data } = useQuery(QUERY.CURRENT_USER, {
        fetchPolicy: 'network-only'
    })
    const [ removedPinNotice, setRemovedPinNotice ] = useState(false)
    const [ unPin, pinDeleteState ] = useMutation(MUTATE.DELETE_PIN, {
        fetchPolicy: 'network-only'
    });
    
    useEffect(() => {
        console.log(pinDeleteState?.data?.deleteUserPin)
        if (pinDeleteState?.data?.deleteUserPin) setRemovedPinNotice()
    }, [ pinDeleteState.loading ])
    
    const handleNoticeOpen = (pin) => {
        setRemovedPinNotice(pin)
    }
    
    const handleNoticeClose = () => {
        setRemovedPinNotice()
    }
    
    useEffect(() => {
        console.log({ removedPinNotice })
    }, [removedPinNotice])
    
    if (!data) return (
        <BaseLayout>
            <p>Loading</p>
        </BaseLayout>
    )
    
    const { readUser } = data;
    const { firstName, lastName, email, tribes, pins } = readUser;
    
    return (
        <BaseLayout>
            <Container>
                <PageHeader
                    subtitle="Account"
                    title="Lennert De Ryck"
                />
                <div className="mt-12">
                    <h3 className="text-3xl font-medium font-display">tribes</h3>
                    <div className="mt-6 grid grid-cols-12 gap-6">
                        { tribes.map(tribe => (
                            <Link key={ tribe.id } to={ '/tribes/' + tribe.id } className="col-span-4 flex items-center">
                                <div className="rounded-xl p-3 bg-tt-emerald-700 w-fit mr-4">
                                    <Icon name="community" size="1.8rem" color="#fff" />
                                </div>
                                <div className="-translate-y-1">
                                    <h4 className="font-display font-medium text-lg text-gray-800 -mb-1">scouts</h4>
                                    <h3 className="font-medium text-lg text-gray-800">{ tribe.name }</h3>
                                </div>
                            </Link>
                        ))}
                        <Link to={ '/tribes/nieuw' } className="col-span-4 flex items-center w-fit">
                            <AddButton>tribe toevoegen</AddButton>
                        </Link>
                    </div>
                    
                    <h3 className="text-3xl font-medium font-display mt-12">bewaard</h3>
                    <div className="mt-6 grid grid-cols-12 gap-6">
                        { pins.map(pin => {
                            const formatted = formatPinType(pin.pinType);
                            const notFound = !pin?.pinItem?._id
                            
                            if (notFound) {
                                return (
                                    <div className="col-span-4 flex items-cente opacity-50 cursor-pointer" onClick={() => handleNoticeOpen(pin)}>
                                        <div className="rounded-xl p-3 bg-tt-blue-500 w-fit h-fit mr-4">
                                            <Icon name="pushpin" size="1.8rem" color="#fff" />
                                        </div>
                                        <div className="-translate-y-1">
                                            <h4 className="font-display font-medium text-lg text-gray-800 -mb-1 lowercase">onbekend</h4>
                                            <h3 className="font-medium text-lg text-gray-800">{ formatted.label } verwijderd</h3>
                                        </div>
                                    </div>
                                )
                            }
                            
                            const url = formatted.url + '/' + pin.pinItem._id
                            
                            return (
                                <Link key={ pin?.pinItem?._id } to={ url } className="col-span-4 flex items-center">
                                    <div className="rounded-xl p-3 bg-tt-blue-500 w-fit mr-4">
                                        <Icon name="pushpin" size="1.8rem" color="#fff" />
                                    </div>
                                    <div className="-translate-y-1">
                                        <h4 className="font-display font-medium text-lg text-gray-800 -mb-1 lowercase">{ formatted.label }</h4>
                                        <h3 className="font-medium text-lg text-gray-800">{ pin?.pinItem?.name || 'Niet gevonden' }</h3>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    <Popup open={ !!removedPinNotice } modal>
                        <div className="p-8 max-w-[600px]">
                            <h3 class="text-xl font-medium font-display lowercase mb-4">Item niet gevonden</h3>
                            <p className="text-gray-500 mb-4">We konden dit bewaarde item niet terugvinden. Mogelijks heeft de organisatie het gearchiveerd of verwijderd.</p>
                            <p className="text-gray-500">Je kan het item verwijderen uit je collectie.</p>
                            <ButtonGroup className="mt-6">
                                <Button theme="danger" outline onClick={() => unPin({
                                    variables: { id: removedPinNotice?.id }
                                })} loading={ pinDeleteState.loading }>Item verwijderen</Button>
                                <Button onClick={ handleNoticeClose } disabled={ pinDeleteState.loading }>Negeren { pinDeleteState.loading && 'loading'  }</Button>
                            </ButtonGroup>
                        </div>
                    </Popup>
                </div>
            </Container>
        </BaseLayout>
    )
}

export default AccountModule