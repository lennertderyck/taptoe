import React from 'react';
import { Icon } from '..';
import { useAuth } from '../../hooks';
import { Link } from 'react-router-dom';

const AccountButton = () => {
    const { credentials } = useAuth()
    
    if (!credentials) {
        return (
            <Link
                className="text-lg text-tt-emerald-700 bold bg-gray-100 px-4 py-2 rounded-xl flex items-center"
                to="/account/login"
            >
                <span>Aanmelden of inloggen</span>
                <Icon name="user" className="text-tt-emerald-700 ml-3" color="currentColor" />
            </Link>
        )
    } else if (credentials.user.tribes.length > 0) {
        const tribe = credentials.user.tribes[0]
        return (
            <Link
                className="text-lg text-tt-emerald-700 bold bg-gray-100 px-4 py-2 rounded-xl flex items-center"
                to={`/account`}
            >
                <span>{ tribe.name }</span>
                <Icon name="user" className="text-tt-emerald-700 ml-3" color="currentColor" />
            </Link>
        )
    } else {
        return (
            <Link
                className="text-lg text-tt-emerald-700 bold bg-gray-100 px-4 py-2 rounded-xl flex items-center"
                to="/account"
            >
                <span>{ credentials.user.firstName } { credentials.user.lastName }</span>
                <Icon name="user" className="text-tt-emerald-700 ml-3" color="currentColor" />
            </Link>
        )
    }
    
}

export default AccountButton