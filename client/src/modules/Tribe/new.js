import React from 'react';
import { PageHeader } from '../../components';
import * as Form from '../../forms';

const Component = () => {
    return (
        <>
            <PageHeader 
                subtitle="tribes"
                title="Tribe toevoegen"
            />
            <Form.CreateTribe />
        </>
    )
}

export default Component