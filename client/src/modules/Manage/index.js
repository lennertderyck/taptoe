import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import useSplash from '../../hooks/useSplash';
import { BaseLayout } from '../../layouts';

const ManageModule = () => {
    const navigate = useNavigate()
    const { stop } = useSplash()
    const { user } = useAuth();
    
    useEffect(() => {
        if (user) {
            if (user.role.name === 'ADMIN') stop()
            else navigate('/');
        }
    }, [user])
    
    return (
        <BaseLayout>
        </BaseLayout>
    )
}

export default ManageModule