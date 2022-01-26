import React from 'react';
import { Header } from '../components';

const BaseLayout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="mt-12 container mx-auto max-w-6xl px-12">
                { children }
            </div>
        </>
    )
}

export default BaseLayout