import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, PageHeader } from '..';

const ErrorFallBackComponent = ({ error, componentStack, resetErrorBoundary, isPage }) => {
    const [loading, setLoading] = useState(false);
    
    const handleReset = () => {
        setLoading(true);
        setTimeout(() => { 
            resetErrorBoundary();
        }, [2000]);
    }
    
    return (
        <Container>
            <div className="mb-8">
                <h4 className="font-display font-medium text-xl lowercase mb-3 text-tt-blue-500">Oeps</h4>
                <h2 className="text-4xl font-semibold text-tt-blue-700 mb-2">Er ging iets mis</h2>
                <p>We konden dit deel van de pagina niet laden</p>
                <div className="flex items-center mt-4">
                    <Button onClick={ handleReset } primary loading={ loading }>Opnieuw proberen</Button>
                </div>
            </div>
            
            <div className="text-gray-500 p-6 border-2 rounded-xl">
                <h3 className="text-xl font-medium font-display lowercase mb-2">Technische gegevens</h3>
                {console.log(error, componentStack)}
                <p>{error.message}</p>
                <p>{componentStack}</p>
            </div>
            
        </Container>
    )
}
export default ErrorFallBackComponent