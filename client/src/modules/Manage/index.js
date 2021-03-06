import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Outlet, useNavigate, useOutlet, useMatch, useInRouterContext } from 'react-router-dom';
import { Container, Devider, LinkButton } from '../../components';
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
            <Outlet />
        </BaseLayout>
    )
}

export default ManageModule