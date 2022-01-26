import { createContext, useState } from "react";

const helpContext = createContext();
const { Provider, Consumer } = helpContext;

const HelpProvider = ({ children }) => {
    const [ opened, setOpen ] = useState(true);
    
    const toggleHelp = () => setOpen(!opened);
    const closeHelp = () => setOpen(false);
    const openHelp = (helpArticleID) => setOpen(true);
    
    return <Provider value={{
        isOpen: opened,
        toggleHelp,
        closeHelp,
        openHelp
    }}>{ children }</Provider>;
}

export {
    helpContext,
    HelpProvider,
}