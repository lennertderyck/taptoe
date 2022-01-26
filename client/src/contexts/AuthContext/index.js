import { useQuery } from "@apollo/client";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QUERY } from "../../graphql";
import { LoginModule } from "../../modules";
import { removeCredentials, storedCredentials } from "../../utils";

const authContext = createContext()
const { Provider, Consumer } = authContext;

const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [ credentials, setCredentials ] = useState(storedCredentials());
    const { data, error, loading: currentUserLoading } = useQuery(QUERY.CURRENT_USER);
    
    const login = (data) => {
        window.localStorage.setItem('credentials', JSON.stringify(data));
        setCredentials(data);
    };
    const logout = (withRedirect = false) => {
        removeCredentials()
        setCredentials(null);
        
        if (withRedirect) navigate('/account/login', { replace: true })
    };
    
    useEffect(() => {
        if (error) logout(false)
    }, [data, error])
    
    const loading = currentUserLoading && !data && !error;

    return (
        <Provider value={{ credentials, login, logout, loading, user: data?.readUser }}>
            { credentials ? children : <LoginModule /> }
        </Provider>
    )
}

export {
    authContext,
    AuthProvider
}