import { createContext, useState } from "react";

const helpContext = createContext();
const { Provider, Consumer } = helpContext;

const HelpProvider = ({ children }) => {
    const [ opened, setOpen ] = useState(false);
    const [ article, setArticle ] = useState({ id: null })
    
    const values = {
        openState: [ opened, setOpen ],
        articleState: [ article, setArticle ]
    }

    return <Provider value={ values }>{ children }</Provider>;
}

export {
    helpContext,
    HelpProvider,
}