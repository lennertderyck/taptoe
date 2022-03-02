import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Icon, PageHeader, TribeTransferPopup, UserSearch } from '../../components';
import { MUTATE, QUERY } from '../../graphql';
import useSplash from '../../hooks/useSplash';
import { BaseLayout } from '../../layouts';
import * as Form from '../../forms';

const LocationEditModule = () => {
    const [ showTransferPopup, setShowTranfserPopup ] = useState(false);
    const navigate = useNavigate()
    const { stop, start } = useSplash()
    const { id } = useParams()
    const [ deleteLocation, deleteLocationState ] = useMutation(MUTATE.DELETE_LOCATION)
    const currentLocationState = useQuery(QUERY.LOCATION_BY_ID, {
        variables: { id }
    });
    const dataSink = {};
    
    const handleDelete = () => {
        start()
        deleteLocation({ variables: { id } })
    }
    
    useEffect(() => {
        if (currentLocationState.data) stop()
    }, [currentLocationState.data])
    
    useEffect(() => {
        if (deleteLocationState.error) stop()
        else if (deleteLocationState.data) {
            navigate(
                currentLocationState.data?.readLocation?.tribe ? 
                    '/tribes/' + currentLocationState.data?.readLocation?.tribe?.id : 
                    '/account'
            );
            stop();
        }
    }, [deleteLocationState.data, deleteLocationState.error])
    
    if (!currentLocationState.data) return null;
    
    const { name, tribe } = currentLocationState.data.readLocation;
    
    return (
        <>
            <BaseLayout>
                <Container>
                    <PageHeader
                        subtitle="Locatie bewerken"
                        title={ name }
                    />
                    <Form.CreateLocation location={ currentLocationState?.data?.readLocation } />
                    <hr className="my-12" />
                    <h3 class="text-xl font-medium font-display lowercase mb-4">Gevaarlijke acties</h3>
                    <div className="rounded-2xl border-2 divide-y-2">
                        <div className="flex items-center justify-between p-6">
                            <div className="mr-4">
                                <h4 className="font-display lowercase font-medium text-lg mb-1 text-gray-700">Verwijder locatie</h4>
                                <p className="text-gray-500">Deze locatie zal gearchiveerd worden. Locaties kunnen niet permanent verwijderd worden aangezien hier reservaties aan gekoppeld zijn.</p>
                            </div>
                            <div className="grow"> 
                                <Button onClick={ handleDelete } theme="danger" outline>Locatie verwijderen</Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-6">
                            <div className="mr-4">
                                <h4 className="font-display lowercase font-medium text-lg mb-1 text-gray-700">Locatie overdragen</h4>
                                <p className="text-gray-500">Locatie koppelen aan nieuwe eigenaar. Hierdoor vervalt de verificatie en raken alle huidige eigenaars hun toegang kwijt.</p>
                            </div>
                            <div className="grow"> 
                                <Button onClick={() => setShowTranfserPopup(true) } theme="danger" outline>Locatie overdragen</Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-6">
                            <div className="mr-4">
                                <h4 className="font-display lowercase font-medium text-lg mb-1 text-gray-700">Zichtbaarheid</h4>
                                <p className="text-gray-500">Verberg je locatie op kaarten, in lijsten en zoekresulaten. Je locatie blijft wel zichtbaar voor al reeds geregistreerde huurders.</p>
                            </div>
                            <div className="grow"> 
                                <Button theme="danger" outline>Zichtbaarheid aanpassen</Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </BaseLayout>
            <TribeTransferPopup open={ showTransferPopup } onClose={() => setShowTranfserPopup(false)} tribe={ currentLocationState.data.readLocation } />
        </>
    )
}

export default LocationEditModule