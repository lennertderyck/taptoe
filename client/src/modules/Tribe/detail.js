import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AddButton, Container, Icon, PageHeader } from '../../components';
import { QUERY } from '../../graphql';
import { useAuth } from '../../hooks';
import useSplash from '../../hooks/useSplash';
import { regex } from '../../utils';

const TribeDetailModule = () => {
    const { start, stop } = useSplash()
    const { id: tribeId } = useParams()
    const { user } = useAuth()
    const { data, loading } = useQuery(QUERY.TRIBE_BY_ID, {
        variables: { id: tribeId }
    }) 
    
    useEffect(() => {
       if (!data && loading) start() 
       else stop()
    }, [data])
    
    if (!data) return <div>Loading...</div>
    
    const { readTribe: tribeData } = data
    const hasWriteAcces = user.tribes.find(tribe => tribe.id === tribeId) ? true : false;
    const pageHeaderLinks = [
        tribeData.email,
        tribeData.website,
        // ...otherLinks // <- for when custom links are supported
    ]
    
    return (
        <Container>
            <PageHeader
                subtitle={ tribeData.verified ? tribeData.verified.type : 'organisatie'}
                title={ tribeData.name }
                append={() => (
                    <nav className="mt-4 text-tt-emerald-500">
                        { pageHeaderLinks.map((link, index) => {
                            const isMail = regex.email.test(link);
                            const formattedLink = isMail ? link : new URL(link).host;
                            
                            return (<>
                                <a 
                                    key={ link } 
                                    href={ (isMail ? 'mailto:' : '') + link }
                                    className="hover:underline"
                                >{ formattedLink }</a>
                                { index !== pageHeaderLinks.length - 1 && <span className="mx-1">&nbsp;|&nbsp;</span> }
                            </>)
                        })}
                    </nav>
                )}
            />
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-6">
                    <div className="mb-8">
                        <h3 className="text-xl font-medium font-display lowercase mb-4">Over</h3>
                        <p className="text-gray-500">{ tribeData.description }</p>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-xl font-medium font-display lowercase mb-4">Contact</h3>
                        <h4 className="text-gray-500"><strong>Vertantwoordelijke</strong></h4>
                        <ul>
                            { tribeData.owners.map(owner => (
                                <li key={ owner.id }>
                                    <span className="text-gray-500">{ owner.firstName } { owner.lastName }</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-span-6">
                    <h3 className="text-xl font-medium font-display lowercase mb-4">Locaties</h3>
                    { !tribeData.locations && <>
                        <p className="text-gray-500">{ hasWriteAcces ? 'Je hebt nog geen locaties toegevoegd' : 'Deze tribe heeft nog geen locaties toegevoegd.' }</p>
                        { hasWriteAcces && <Link to={ '/tribes/nieuw' } className="col-span-4 flex items-center w-fit mt-4">
                            <AddButton>locatie toevoegen</AddButton>
                        </Link>}
                    </>}
                    { tribeData?.locations?.map(location => (<></>))}
                </div>
            </div>
        </Container>
    )
}

export default TribeDetailModule