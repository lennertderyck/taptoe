const { useContext, useEffect } = require("react");
const { splashContext } = require("../contexts/SplashContext");

const useSplash = (initialLoading = true) => {
    const [ isForced, setForce ] = useContext(splashContext)
    
    const toggle = () => setForce(prev => !prev);
    const start = () => setForce(true);
    const stop = () => setForce(false);
    
    useEffect(() => {
        start()
    }, [])
    
    return {
        isForced,
        toggle,
        start,
        stop
    }
}

export default useSplash;