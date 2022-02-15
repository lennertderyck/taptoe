import { useEffect, useState } from "react";

const useMounted = (callback) => {
    const [ wasMounted, setWasMounted ] = useState(true);
    
    useEffect(() => {
        if (wasMounted && callback instanceof Function) {
            callback()
        };
        
        return () => setWasMounted(false);
    }, [wasMounted]);
    
    return wasMounted;
}

export default useMounted;