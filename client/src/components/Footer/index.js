import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as LogoJung } from '../../assets/logos_credits/logo_jung_hinged.svg';
import useHelp from '../../hooks/useHelp';


const Footer = () => {
    const { openHelp } = useHelp()

    return (
        <footer className=" bg-gray-200 mt-40 pb-6 flex flex-col items-center">
            <div className="pt-20 relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2"> 
                    <Logo width="120px" />
                </div>
                <nav className="text-lg">
                    <ul>
                        <li className="inline">Over Taptoe ・ </li>
                        <li className="inline">Huur een locatie ・ </li>
                        <li className="inline">Wordt verhuurder ・ </li>
                        <li className="inline cursor-pointer" onClick={() => openHelp()} >Help ・ </li>
                        <li className="inline">Privacy</li>
                    </ul>
                </nav>
                <div className="mt-4 text-gray-400 text-center">
                    Design &amp; development door <a href="https://jung.gent?ref=taptoe" target="_blank" rel="noopener">
                        <LogoJung height="20px" className="inline-block mx-1 text-gray-400" fill="currentColor" />
                    </a> en <a href="https://stefverlinde.be?ref=taptoe" target="_blank" rel="noopener">Stef Verlinde</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer