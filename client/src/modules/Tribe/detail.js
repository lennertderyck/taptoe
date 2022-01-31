import { useQuery } from '@apollo/client';
import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AddButton, Button, Container, Icon, LinkButton, PageHeader, VerifyTag } from '../../components';
import { QUERY } from '../../graphql';
import { useAuth, useHelp } from '../../hooks';
import useSplash from '../../hooks/useSplash';
import { regex } from '../../utils';

const TribeDetailModule = () => {
    const { stop } = useSplash()
    const { openHelp } = useHelp()
    const { id: tribeId } = useParams()
    const { user } = useAuth()
    const { data, loading } = useQuery(QUERY.TRIBE_BY_ID, {
        variables: { id: tribeId }
    }) 
    
    useEffect(() => {
       if (data && !loading) stop()
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
        <>
            <div className="border-b-2">
                <Container className="!mt-0 py-4">
                    <LinkButton to="/account" icon="arrow-left">Bekijk je andere tribes</LinkButton>
                </Container>
            </div>
            <Container>
                <PageHeader
                    subtitle={<h4 className="font-display font-medium text-xl lowercase mb-3 text-tt-blue-500 flex items-center">
                        <span>{ tribeData?.verified?.type ||  'Organisatie' }</span>
                        <VerifyTag 
                            className="ml-0 hover:ml-2"
                            onClick={() => openHelp('faq-local-3', true)}
                        />
                    </h4>}
                    title={ tribeData.name }
                    append={() => (
                        <nav className="mt-4 text-tt-emerald-500">
                            { pageHeaderLinks.map((link, index) => {
                                const isMail = regex.email.test(link);
                                const formattedLink = isMail ? link : new URL(link).host;
                                
                                return (<Fragment key={ link }>
                                    <a 
                                        href={ (isMail ? 'mailto:' : '') + link }
                                        className="hover:underline"
                                    >{ formattedLink }</a>
                                    { index !== pageHeaderLinks.length - 1 && <span className="mx-1">&nbsp;|&nbsp;</span> }
                                </Fragment>)
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
                        { !tribeData.locations && <p className="text-gray-500">{ hasWriteAcces ? 'Je hebt nog geen locaties toegevoegd' : 'Deze tribe heeft nog geen locaties toegevoegd.' }</p>}
                        { hasWriteAcces && <Link to={ '/locaties/nieuw/' + tribeId } className="col-span-4 flex items-center w-fit my-4">
                            <AddButton>locatie toevoegen</AddButton>
                        </Link>}
                        { tribeData?.locations?.map(location => (
                            <Link 
                                key={ location.id }
                                to={ '/locaties/' + location.id }
                                className="flex items-center w-fit mb-4 last:mb-0"
                            >
                                <div className="rounded-xl p-3 bg-tt-emerald-500 w-fit mr-4">
                                    <Icon name="home-5" size="1.8rem" color="#fff" />
                                </div>
                                <div className="-translate-y-1">
                                    <h4 className="font-display font-medium text-lg text-gray-800 -mb-1 lowercase">{ location.address.city }</h4>
                                    <h3 className="font-medium text-lg text-gray-800">{ location.name }</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    )
}

export default TribeDetailModule