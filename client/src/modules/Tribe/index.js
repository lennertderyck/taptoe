import React from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { Container } from '../../components';
import { BaseLayout } from '../../layouts';

const TribeModule = () => {
    const { id } = useParams()
    
    return (
        <BaseLayout>
            <Container>
                {/* <div>tribe: { id }</div> */}
                <Outlet />
            </Container>
        </BaseLayout>
    )
}

export default TribeModule