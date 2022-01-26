import { createContext, useState } from "react";
import { removeCredentials, storedCredentials } from "../../utils";

const authContext = createContext()
const { Provider, Consumer } = authContext;

const AuthProvider = ({ children }) => {
    const [ credentials, setCredentials ] = useState(storedCredentials());

    const login = (data) => {
        window.localStorage.setItem('credentials', JSON.stringify(data));
        setCredentials(data);
    };
    const logout = () => {
        removeCredentials()
        setCredentials(null);
    };

    return (
        <Provider value={{ credentials, login, logout }}>
            { children }
        </Provider>
    )
}

export {
    authContext,
    AuthProvider
}