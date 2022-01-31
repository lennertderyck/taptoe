import { useReducer, useRef, useEffect } from "react"
import { geoLocationReducer } from "../reducers"

const initialState = {
    data: undefined,
    loading: false,
    error: undefined
}

const useLocation = ({ lazy = false, watch = false, ...otherOptions }) => {
    const [ state, dispatch ] = useReducer(geoLocationReducer, {
        ...initialState,
        loading: !lazy || watch ? true : false
    })
    const watchId = useRef()
    
    const fetchLocation = () => {
        dispatch({ type: "loading" });
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                dispatch({
                    type: "success",
                    payload: coords
                })
            },
            (error) => {
                dispatch({
                    type: "error",
                    payload: error
                })
            },
            otherOptions
        )
    }
    
    const watchLocation = () => {
        dispatch({ type: "loading" });
        watchId.current = navigator.geolocation.watchPosition(
            ({ coords }) => {
                dispatch({
                    type: "success",
                    payload: coords
                })
            },
            (error) => {
                dispatch({
                    type: "error",
                    payload: error
                })
            },
            otherOptions
        )
    }
    
    useEffect(() => {
        if (watch) watchLocation()
        else if (!watch && !lazy) fetchLocation()
    }, [ watch ])
    
    return [
        state,
        () => {
            if (!watch) fetchLocation() // <-- Manual fetch location if watch is false,
            else navigator.geolocation.clearWatch(watchId.current) // <-- Manual stop fetching location if watch is true
        }
    ]
}

export default useLocation