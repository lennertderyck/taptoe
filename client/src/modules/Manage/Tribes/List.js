import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { QUERY } from '../../../graphql';
import { Button, ButtonGroup, Icon, List, SymbolButton } from '../../../components';
import { Link, useNavigate } from 'react-router-dom';

const TribesList = () => {
    const [ tribeDetail, setTribeDetail ] = useState(false)
    const tribesState = useQuery(QUERY.TRIBES)
    
    const handleTribeDetailView = (id) => {
        if (tribeDetail === id) {
            setTribeDetail(false)
        } else {
            setTribeDetail(id)
        }
    }
    
    return (
        <List>
            {(ListItem) => (<>
                {tribesState.data?.readTribes?.map(tribe => {
                    const maxLocationsToShow = 3;
                    const moreThanMaxLocations = tribe.locations.length > maxLocationsToShow;
                    const locationsSliceAmount = moreThanMaxLocations ? maxLocationsToShow - 1 : maxLocationsToShow;
                    
                    return (
                        <ListItem>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-gray-700">
                                        { tribe.name }         
                                    </h3>
                                    <h4 className="lowercase font-display text-gray-500">
                                        { tribe.verified?.type || 'Organisatie' } – <a href={ 'mailto:' + tribe.email } className="underline">{ tribe.email }</a>
                                    </h4>
                                </div>
                                <div>
                                    <ButtonGroup>
                                        <Button icon="more" onClick={() =>handleTribeDetailView(tribe.id)} />
                                        <Button icon="arrow-right-up" onClick={() => window.open('/tribes/' + tribe.id)} />
                                    </ButtonGroup>
                                </div>
                            </div>
                            { tribeDetail === tribe.id && (
                                <div className="mt-3 text-gray-700 p-6 rounded-xl border-2 border-gray-200">
                                    <div className="grid grid-cols-12 gap-6">
                                        <div className="col-span-3">
                                            <h4 className="lowercase font-display text-gray-700">Verificatie</h4>
                                            <p className="text-gray-500">
                                                { tribe.verified?.type || 'Niet geverifieerd' }
                                            </p>
                                        </div>
                                        
                                        <div className="col-span-3">
                                            <h4 className="lowercase font-display text-gray-700">Website</h4>
                                            <a href={ tribe.website } target="_blank" rel="noopener" className="text-gray-500 underline">
                                                { new URL(tribe.website).hostname }
                                            </a>
                                        </div>
                                        
                                        <div className="col-span-3">
                                            <h4 className="lowercase font-display text-gray-700">Vertantwoordelijke</h4>
                                            <p className="text-gray-500">
                                                { tribe.owners.map(owner => { return `${ owner.firstName } ${ owner.lastName }` }).join(', ') }
                                            </p>
                                        </div>
                                    </div>
                                    <hr className="my-6" />
                                    <div className="grid grid-cols-12 gap-6">
                                        {( tribe.locations?.length === 0 ) && (
                                            <div className="col-span-12">
                                                <p className="text-gray-500 italic">Geen locaties om weer te geven voor deze tribe.</p>
                                            </div>
                                        )}
                                        { tribe.locations.slice(0, locationsSliceAmount).map((location) => (
                                            <div
                                                className="col-span-4"
                                                key={ location.id }
                                            >
                                                <Link 
                                                    to={ '/locaties/' + location.id }
                                                    className="flex items-center w-fit mb-4 last:mb-0"
                                                >
                                                    <div className="rounded-xl p-2 bg-tt-emerald-500 w-fit mr-4">
                                                        <Icon name="home-5" size="1.5rem" color="#fff" />
                                                    </div>
                                                    <div className="">
                                                        <h4 className="font-display text-gray-700 -mb-1 lowercase">{ location.address.city }</h4>
                                                        <h3 className="font-medium text-gray-500">{ location.name }</h3>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                        
                                        { moreThanMaxLocations && (
                                            <div 
                                                className="col-span-4 flex items-center w-fit mb-4 last:mb-0"
                                            >
                                                <div className="rounded-xl p-2 border-2 border-gray-200 w-fit mr-4">
                                                    <Icon name="arrow-right" size="1.5rem" color="currentColor" className="text-gray-700" />
                                                </div>
                                                <div className="">
                                                    <h4 className="font-display text-gray-700 -mb-1 lowercase">meer</h4>
                                                    <h3 className="font-medium text-gray-500">Nog 3 locaties</h3>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </ListItem>
                    )
                })}
            </>)}
        </List>
    )
}

export default TribesList