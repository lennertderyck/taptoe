import React from 'react';
import { Footer, Header } from '../components';

const BaseLayout = ({ children }) => {
    return (
        <div className="flex flex-col h-full">
            <Header large />
            <div className="flex-1">
                { children }
            </div>
            <Footer />
        </div>
    )
}

export default BaseLayout