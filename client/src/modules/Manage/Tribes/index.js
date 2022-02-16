import React from 'react';
import { Container, PageHeader } from '../../../components';
import TribesList from './List';

const ManageTribesModule = () => {
    return (
        <Container>
            <PageHeader 
                subtitle="Beheer"
                title="Tribes"
            />
            <TribesList />
        </Container>
    )
}

export default ManageTribesModule