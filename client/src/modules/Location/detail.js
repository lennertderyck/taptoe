import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Icon, LinksGroup, Map, PageHeader } from '../../components';
import { QUERY } from '../../graphql';
import useSplash from '../../hooks/useSplash';
import { formatLink } from '../../utils';
import classnames from 'classnames';
import { BaseLayout, LargeHeaderLayout } from '../../layouts';


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
        <BaseLayout>
            <div className="relative">
                <div className="absolute top-0 right-0 left-0 bottom-0 -z-10"> 
                    <Map height="100%" />
                </div>
                <div className="px-12 py-12">
                    <div className="bg-white rounded-xl max-w-7xl mx-auto shadow-lg p-10 h-fit">
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
                            <h4 className="text-gray-500"><strong>Vertantwoordelijke</strong></h4>
                            <ul>
                                { tribe.owners.map(owner => (
                                    <li key={ owner.id }>
                                        <span className="text-gray-500">{ owner.firstName } { owner.lastName }</span>
                                    </li>
                                ))}
                            </ul>
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
                        { !locationData.propterties && <p className="text-gray-500 italic">Geen eigenschappen voor deze locatie.</p> }
                    </div>
                </div>
            </Container>
        </BaseLayout>
    )
}

export default LocationDetailModule;