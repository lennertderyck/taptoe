import React, { useEffect, useState } from 'react';
import Overlay from './Overlay';
import { Icon } from '..';
import { ReactComponent as LogoSymbol } from '../../assets/logo_symbol_2.svg';
import Fade from 'react-reveal/Fade';

const Splash = ({ children, force }) => {
    const [ isLoading, setLoading ] = useState(true)
    const showLoader = force || isLoading;
    
    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') {
            fetch('https://taptoe-socket.herokuapp.com/status')
                .then(res => res.json())
                .then(() => {
                    setLoading(false)
                })
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 4000)
        }
    }, [process.env.NODE_ENV])
        
    return (
        <>
            {
                showLoader && <Overlay>
                    <div className="animate-pulse">
                        <LogoSymbol width="110px" className="mb-4 opacity-60" />
                    </div>
                    <h2 className="font-display lowercase text-xl font-medium text-gray-500 hidden">Loading</h2>
                    <div className="relative">   
                        <div className="animate-spin">
                            <Icon name="loader-4" size="1.5rem" color="currentColor" className="text-gray-200 animate-pulse" />
                        </div>
                        {/* <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                            <Icon name="loader-5" size="1.8rem" color="currentColor" className="text-gray-400 " />
                        </div> */}
                    </div>
                </Overlay>
            }
            
            {/* Hide only during loading, during force it should be shown */}
            <Fade when={ !isLoading && !force } spy={ isLoading } duration={ 350 } appear>
                { !isLoading && children }
            </Fade>
        </>
    )
}

export default Splash