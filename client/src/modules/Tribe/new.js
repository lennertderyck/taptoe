import React from 'react';
import { Container, PageHeader } from '../../components';
import * as Form from '../../forms';

const Component = () => {
    return (
        <Container>
            <PageHeader 
                subtitle="tribes"
                title="Tribe toevoegen"
            />
            <Form.CreateTribe />
        </Container>
    )
}

export default Component