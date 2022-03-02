import React from 'react';
import { Container, PageHeader } from '../../../components';
import AuthScopesList from './List';

const AuthScopesModule = () => {
    return (
        <Container>
            <PageHeader
                subtitle="Beheer"
                title="Toestemmingen"
            />
            <AuthScopesList />
        </Container>
    )
}

export default AuthScopesModule