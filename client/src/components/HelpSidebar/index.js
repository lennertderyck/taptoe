import React from 'react';
import tw from 'tailwind-styled-components';
import { useHelp } from '../../hooks';
import Aside from './Aside';

const Backdrop = tw.div`
    fixed top-0 left-0 right-0 bottom-0
    z-40
    bg-black
    bg-opacity-25
`;

const HelpSidebar = () => {
    const { isOpen, closeHelp } = useHelp()
    
    if (!isOpen) {
        return null;
    }
    
    else return (
        <>
            <Aside>
                <div className="p-8">
                    <h2 className="text-2xl font-display lowercase mb-8">Help</h2>
                    <button onClick={ closeHelp }>x</button>
                    <ul>
                        <li>- user klikt op onderwerp link + id</li>
                        <li>- sidebar opent met artikel</li>
                        <li>- geen artikel -> standaard voorgestelde artikelen</li>
                    </ul>
                </div>
            </Aside>
            <Backdrop />
        </>
    )
}

export default HelpSidebar