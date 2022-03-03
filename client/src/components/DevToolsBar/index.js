import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Container, Icon } from '..';
import { devBarLinks } from '../../data/app';

const DevToolsBar = () => {
    const [ helpTextShown, setHelpTextShown ] = useState(false)
    
    const toggleHelpText = () => {
        setHelpTextShown(s => !s);
    }
    
    const closeHelpText = () => {
        setHelpTextShown(false);
    }
    
    useEffect(() => {
        window.addEventListener('scroll', closeHelpText)
        return () => {
            window.removeEventListener('scroll', closeHelpText)
        }
    })
    
    if (process.env.NODE_ENV !== 'development') return null
    else return (
        <div className="w-full p-3 sticky top-0 bg-gray-100">
            <Container standAlone>
                <div className="flex w-full justify-between">  
                    <div className="flex items-center">
                        <h4 className="font-display lowercase flex items-center cursor-pointer" onClick={ toggleHelpText }>
                            <Icon name="bug" color="currentColor" className="mr-2 text-tt-emerald-500 text-opacity-70" /> 
                            <span className="text-tt-emerald-500">Development tools</span>
                            <Icon 
                                name="arrow-down-s" 
                                size="1rem" 
                                color="currentColor" 
                                className={ classNames('ml-2 text-gray-500 text-opacity-70', { 'rotate-180': helpTextShown })} 
                            /> 
                        </h4>
                    </div>
                    <div className="flex">
                        { devBarLinks.map(link => (
                            <>
                                <a className="font-display lowercase text-gray-700 flex items-center" href={ link.url } target="_blank" rel="noopener">
                                    <span>{ link.label }</span>
                                    <Icon name="arrow-right" size="1rem" color="currentColor" className="ml-2 text-gray-500" />
                                </a>
                                <div className="border-r-2 border-gray-300 mx-3 last:hidden" />
                            </>
                        ))}
                    </div>
                </div>
                { helpTextShown && (
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Deze toolbar bevat alle nodige verwijzingen naar tools gebruikt bij de ontwikkeling van Taptoe.<br />
                            De developer-toolbar wordt enkel weergeven in een development-omgeving en automatisch verborgen in productie.
                        </p>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default DevToolsBar