import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, PageHeader } from '../../components';
import * as Forms from '../../forms';
import { useAuth } from '../../hooks';
import { BaseLayout } from '../../layouts';

const LoginModule = () => {
    const { credentials } = useAuth()
    const navigate = useNavigate();
    
    useEffect(() => {
        if (credentials) navigate('/', { replace: true })
    }, [credentials])
    
    return (
        <BaseLayout>
            <Container>
                <PageHeader 
                    subtitle="Aanmelden of registreren"
                    title="Meld je aan om verder te gaan"
                />
                <Forms.Login />
            </Container>
        </BaseLayout>
    )
}

export default LoginModule