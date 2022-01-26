import React, { useEffect, useState } from 'react';
import Overlay from './Overlay';
import { Icon } from '..';
import { ReactComponent as LogoSymbol } from '../../assets/logo_symbol_2.svg';

const Splash = ({ children, force }) => {
    const [ isLoading, setLoading ] = useState(true)
    
    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') {
            fetch('http://taptoe-socket.herokuapp.com/status')
                .then(res => res.json())
                .then(() => {
                    setLoading(false)
                })
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }
    }, [process.env.NODE_ENV])
    
    if (isLoading) return <Overlay>
        <LogoSymbol width="110px" className="mb-4 opacity-60" />
        <h2 className="font-display lowercase text-xl font-medium text-gray-500 hidden">Loading</h2>
        <div className="relative">   
            <div className="animate-spin">
                <Icon name="loader-4" size="1.8rem" color="currentColor" className="text-gray-300" />
            </div>
            {/* <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                <Icon name="loader-5" size="1.8rem" color="currentColor" className="text-gray-400 " />
            </div> */}
        </div>
    </Overlay>;
    
    return (
        <>
            { force && <Overlay>
                <LogoSymbol width="110px" className="mb-4 opacity-60" />
                <h2 className="font-display lowercase text-xl font-medium text-gray-500 hidden">Loading</h2>
                <div className="relative">   
                    <div className="animate-spin">
                        <Icon name="loader-4" size="1.8rem" color="currentColor" className="text-gray-300" />
                    </div>
                    {/* <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                        <Icon name="loader-5" size="1.8rem" color="currentColor" className="text-gray-400 " />
                    </div> */}
                </div>
            </Overlay>}
            { children }
        </>
    )
}

export default Splash