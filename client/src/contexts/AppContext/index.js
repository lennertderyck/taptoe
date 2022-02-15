import { createContext, useState } from "react";

const appContext = createContext();
const { Provider, Consumer } = appContext;

const AppContextProvider = ({ children }) => {
    const [ store, setStore ] = useState({})
    
    return <Provider value={[ store, setStore ]}>{children}</Provider>;
}

export {
    appContext,
    AppContextProvider
}