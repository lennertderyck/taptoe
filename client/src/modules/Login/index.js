import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Container, PageHeader } from '../../components';
import * as Forms from '../../forms';
import { useAuth } from '../../hooks';
import { BaseLayout } from '../../layouts';

const LoginModule = () => {
    const [ loginResponse, setLoginResponse ] = useState()
    const [ otpToken, setOtpToken ] = useState();
    const [ searchParams, setSearchParams ] = useSearchParams()
    const { credentials } = useAuth()
    const navigate = useNavigate();
    
    useEffect(() => {
        const urlOtpToken = new URL(window.location).searchParams.get('token')
        if (urlOtpToken) {
            setOtpToken(urlOtpToken)
            setSearchParams({})
        }
    }, [])
    
    useEffect(() => {
        if (credentials) navigate('/', { replace: true })
    }, [credentials])
    
    
    if (otpToken && loginResponse?.error) return <div>
        <h3>Deze code was niet geldig</h3>
        <p>Vraag bij de eigenaar een nieuwe code aan.</p>
    </div>;
    
    return (
        <BaseLayout>
            <Container>
                <PageHeader 
                    subtitle="Aanmelden of registreren"
                    title="Meld je aan om verder te gaan"
                />
                <Forms.Login otpToken={ otpToken } onReady={ setLoginResponse } />
            </Container>
        </BaseLayout>
    )
}

export default LoginModule