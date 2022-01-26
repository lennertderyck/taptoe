import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';

const Footer = () => {
    return (
        <footer className=" bg-gray-200 mt-40 pb-12 flex flex-col items-center">
            <div className="pt-20 relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2"> 
                    <Logo width="120px" />
                </div>
                <nav className="">
                    <ul>
                        <li className="inline">Over Taptoe ・ </li>
                        <li className="inline">Huur een locatie ・ </li>
                        <li className="inline">Wordt verhuurder ・ </li>
                        <li className="inline">Help ・ </li>
                        <li className="inline">Privacy</li>
                    </ul>
                </nav>
            </div>
        </footer>
    )
}

export default Footer