import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '../../components';
import { BaseLayout } from '../../layouts';

const LocationModule = () => {
    return (
        <BaseLayout>
            <Outlet />
        </BaseLayout>
    )
}

export default LocationModule