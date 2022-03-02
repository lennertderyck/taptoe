import { useQuery } from '@apollo/client';
import React from 'react';
import { Container, LinkButton, PageHeader, RoleSelector } from '../../../components';
import { QUERY } from '../../../graphql';
import { BaseLayout } from '../../../layouts'
import RoleEditor from './List';

const ManageUserRolesModule = () => {
    const rolesState = useQuery(QUERY.ROLES);
    
    return (
        <>
            <Container>
                <PageHeader
                    subtitle="Beheer"
                    title="Gebruikers-rollen"
                />
                <RoleEditor />
            </Container>
        </>
    )
}

export default ManageUserRolesModule