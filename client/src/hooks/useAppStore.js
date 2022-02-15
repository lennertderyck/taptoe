import { useContext } from 'react';
import { appContext } from '../contexts'

const useAppStore = () => {
    const [ state, setState ] = useContext(appContext);
    
    const updateStore = (KEY, VALUE) => {
        setState(oldState => ({
            ...oldState,
            [KEY]: VALUE
        }))
    }
    
    const getStoreValue = (KEY) => {
        if (KEY in state) {
            return state[KEY]
        } else return null
    }
    
    return [
        state,
        updateStore,
        getStoreValue
    ]
}

export default useAppStore;