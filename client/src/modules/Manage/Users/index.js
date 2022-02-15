import React from 'react';
import { Container, LinkButton, PageHeader } from '../../../components';
import UsersList from './List';

const ManageUsersModule = () => {
    return (
        <>
            <Container>
                <PageHeader 
                    subtitle="Beheer"
                    title="Gebruikers"
                />
                <UsersList />
            </Container>
        </>
    )
}

export default ManageUsersModule