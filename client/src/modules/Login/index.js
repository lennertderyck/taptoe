import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Container, Padded, PageHeader } from '../../components';
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
                <Padded xl className="rounded-2xl border-2 border-gray-200 max-w-[600px] mx-auto block">
                    <PageHeader 
                        subtitle="Account"
                        title="Aanmelden of registreren"
                    />
                    <Forms.Login otpToken={ otpToken } onReady={ setLoginResponse } />
                </Padded>
            </Container>
        </BaseLayout>
    )
}

export default LoginModule