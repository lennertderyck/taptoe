import React from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { BaseLayout } from '../../layouts';

const TribeModule = () => {
    const { id } = useParams()
    
    return (
        <BaseLayout>
            {/* <div>tribe: { id }</div> */}
            
            <Outlet />
        </BaseLayout>
    )
}

export default TribeModule