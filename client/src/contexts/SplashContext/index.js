import { createContext, useState } from "react";
import { Splash } from "../../components";

const splashContext = createContext();
const { Provider, Consumer } = splashContext;

const SplashProvider = ({ children }) => {
    const [ isForced, setForce ] = useState(false);
    
    return <Provider value={[ isForced, setForce ]}>
        <Splash force={ isForced }>
            { children }
        </Splash>
    </Provider>
}

export {
    splashContext,
    SplashProvider,
}