import { createContext, useState } from "react";
import { Splash } from "../../components";

const splashContext = createContext();
const { Provider, Consumer } = splashContext;

const SplashProvider = ({ children }) => {
    const [ isForced, setForce ] = useState(false);
    
    const toggle = () => setForce(prev => !prev);
    const start = () => setForce(true);
    const stop = () => setForce(false);
    
    return <Provider value={{
        isForced,
        toggle,
        start,
        stop
    }}>
        <Splash force={ isForced }>
            { children }
        </Splash>
    </Provider>
}

export {
    splashContext,
    SplashProvider,
}