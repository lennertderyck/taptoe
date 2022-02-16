import { BaseLayout, LargeHeaderLayout } from '../../layouts';
import { Button, Container, Icon, LinkButton, LinksGroup, List, Map, PageHeader, PinButton } from '../../components';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import Popup from 'reactjs-popup';
import { formatGoogleMapsSearchLink, formatLink, generateStaticMapUri } from '../../utils';

import { ErrorBoundary } from 'react-error-boundary';
import { QUERY } from '../../graphql';
import classnames from 'classnames';
import { useQuery } from '@apollo/client';
import useSplash from '../../hooks/useSplash';

const LocationDetailModule = () => {
    const { stop } = useSplash()
    const { id: locationId } = useParams();
    const { data, loading, error } = useQuery(QUERY.LOCATION_BY_ID, {
        variables: { id: locationId }
    });
    
    useEffect(() => {
        if (data && !loading) stop()
    }, [data])
    
    if (!data) return <div>Loading...</div>
    
    const { readLocation: locationData } = data;
    const { tribe } = locationData;
    
    return (
        <ErrorBoundary>
            <BaseLayout>
                <div className="border-b-2">
                    <Container className="!mt-0 py-4">
                        <div className="flex items-center justify-between">
                            <LinkButton to={ '/tribes/' + tribe.id } icon="arrow-left">Bekijk andere locaties je tribe</LinkButton>
                            <LinkButton to={ 'edit' } iconAfter="settings-4">Locatie instellingen</LinkButton>
                        </div>
                    </Container>
                </div>
                <div className="relative">
                    <div className="absolute top-0 right-0 left-0 bottom-0 -z-10"> 
                        { locationData && <img 
                            src={ generateStaticMapUri(
                                locationData?.latitude, 
                                locationData?.longitude, 
                                (locationData?.latitude && locationData?.longitude) && 15
                            )} 
                            alt="" 
                            className="w-full h-full object-cover"
                        />}
                        {/* <Map 
                            height="100%" 
                            initialCoords={{
                                lat: locationData?.latitude,
                                lng: locationData?.longitude
                            }} 
                            initialZoom={ 15 }
                        /> */}
                    </div>
                    <div className="px-12 py-20">
                        <div className="bg-white rounded-xl max-w-7xl mx-auto shadow-lg p-10 h-fit relative">
                            <PageHeader
                                subtitle="verblijf"
                                title={ locationData.name }
                                className="!mb-0"
                                append={() => (
                                    <LinksGroup className="mt-4">
                                        {({ StyledLink }) => (
                                            <>
                                                <StyledLink><Link to={ '/tribes/' + tribe.id }>{ tribe.name }</Link></StyledLink>
                                                <StyledLink><a href={ 'mailto:' + tribe.email } >{ tribe.email }</a></StyledLink>
                                                <StyledLink><a href={ tribe.website } target="_blank" rel="noopener">{ formatLink(tribe.website) }</a></StyledLink>
                                            </>
                                        )}
                                    </LinksGroup>
                                )}
                            />
                            <div className="absolute top-0 right-0 p-2">
                                <PinButton model="Location" pinItemId={ locationId } />
                                {/* <Popup
                                  trigger={
                                  }
                                  position={['top center', 'bottom right', 'bottom left']}
                                  closeOnDocumentClick
                                >
                                    <div className="p-4">
                                        <Button theme="primary" onClick={() => {}}>Verwijder locatie</Button>
                                    </div>
                                </Popup> */}
                            </div>
                        </div>
                    </div>
                </div>
                <Container>
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-6">
                            <div className="mb-8">
                                <h3 className="text-xl font-medium font-display lowercase mb-4">Over</h3>
                                <p className={ classnames('text-gray-500', !locationData.description && 'italic') }>{ locationData.description || 'Geen beschrijving voor deze locatie.' }</p>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-xl font-medium font-display lowercase mb-4">Contact</h3>
                                <div className="grid grid-cols-2">
                                    <div className="col-span-1">
                                        <h4 className="text-gray-500"><strong>Vertantwoordelijke</strong></h4>
                                        <ul>
                                            { tribe.owners.map(owner => (
                                                <li key={ owner.id }>
                                                    <span className="text-gray-500">{ owner.firstName } { owner.lastName }</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col-span-1">
                                        <h4 className="text-gray-500"><strong>Adres</strong></h4>
                                        { locationData.address && (
                                            <a href={ formatGoogleMapsSearchLink(locationData.address) } target="_blank" rel="noopener">
                                                <p className="underline text-gray-500">{ locationData.address.street } { locationData.address.number }</p>
                                                <p className="underline text-gray-500">{ locationData.address.zip } { locationData.address.city }</p>
                                                <small className="font-display lowercase no-underline text-gray-400 flex items-center">
                                                    <span>Open in Google Maps</span>
                                                    <Icon name="arrow-right-up" size="1rem" className="ml-0.5 translate-y-0.5" color="currentColor" />
                                                </small>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-xl font-medium font-display lowercase mb-4">Reviews</h3>
                                <div className="rounded-xl p-5 bg-gray-100 flex items-center text-gray-500">
                                    <Icon name="pen-nib" size="1.8rem" color="currentColor" className="mr-5" />
                                    <p className="font-display font-base text-lg lowercase leading-6">Reviews worden<br />binnenkort beschikbaar</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <h3 className="text-xl font-medium font-display lowercase mb-4">overzicht</h3>
                            { !locationData.properties ? (
                                <>
                                    <p className="text-gray-500 italic">Geen eigenschappen voor deze locatie.</p>
                                    <div className="rounded-xl p-5 bg-gray-100 flex items-center text-gray-500 mt-4">
                                        <Icon name="road-map" size="1.8rem" color="currentColor" className="mr-5" />
                                        <p className="font-display font-base text-lg lowercase leading-6">Eigenschappen<br />zijn binnenkort beschikbaar</p>
                                    </div>
                                </>
                                ) : (
                                    <List>
                                        {Item => (
                                            <>
                                                <Item className="flex items-baseline justify-between text-gray-700">
                                                    <span>Capaciteit</span> <span>50 personen</span>
                                                </Item>
                                                <Item className="flex items-baseline justify-between text-gray-700">
                                                    <span>Kampvuur</span> <span>toegelaten</span>
                                                </Item>
                                                <Item className="flex items-baseline justify-between text-gray-700 line-through opacity-60">
                                                    <span>Leidingsactiviteiten</span> <span>niet toegelaten</span>
                                                </Item>
                                                <Item className="flex items-baseline justify-between text-gray-700">
                                                    <span>Bestek en borden</span> <span>ja</span>
                                                </Item>
                                                <Item className="flex items-baseline justify-between text-gray-700">
                                                    <span>Potten en pannen</span> <span>ja</span>
                                                </Item>
                                                <Item className="flex items-baseline justify-between text-gray-700">
                                                    <span>Douchekoppen</span> <span>3</span>
                                                </Item>
                                                <Item className="flex items-baseline justify-between text-gray-700">
                                                    <span>Wc's</span> <span>4</span>
                                                </Item>
                                                <Item className="flex items-baseline justify-between text-gray-700">
                                                    <span>Internet</span> <span>geen, onbeperkt of 2 GB per 24u</span>
                                                </Item>
                                                <Item className="flex items-baseline justify-between text-gray-700">
                                                    <span>Leeflokalen</span> <span>3</span>
                                                </Item>
                                                <Item className="flex items-baseline justify-between text-gray-700">
                                                    <span>Slaapzalen</span> <span>2</span>
                                                </Item>
                                                <Item className="flex items-baseline justify-between text-gray-700">
                                                    <span>Bedden</span> <span>neen</span>
                                                </Item>
                                                <Item className="flex items-baseline justify-between text-gray-700">
                                                    <span>Beddengoed</span> <span>neen</span>
                                                </Item>
                                                <Item className="flex items-baseline justify-between text-gray-700 line-through opacity-60">
                                                    <span>Nog een voorbeeld</span> <span>geen</span>
                                                </Item>
                                            </>
                                        )}
                                    </List>
                                )
                            }
                        </div>
                    </div>
                </Container>
            </BaseLayout>
        </ErrorBoundary>
    )
}

export default LocationDetailModule;