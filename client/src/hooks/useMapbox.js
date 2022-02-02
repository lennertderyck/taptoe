import React, { useState, useEffect, useRef, forwardRef } from 'react';

import styled from "styled-components"
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import themes from "../data/mapbox/themes";

// mapboxgl.accessToken = 'pk.eyJ1IjoianVuZy1nZW50IiwiYSI6ImNreXZmdjZveTFxZzYybnRnOTkwdzVkM2MifQ.4cmT6X8MlQfeDR04WbivKw';

const MapContainer = styled.div`
    width: 100%;
    height: ${ props => props.height };
`;

const useMapbox = (initiateConfig, onClick) => {
    const mapContainer = useRef(null);
    const mapboxInstance = useRef(null);
    const [lng, setLng] = useState(initiateConfig?.latitude || 3.7656905);
    const [lat, setLat] = useState(initiateConfig?.longitude || 51.0573704);
    const [zoom, setZoom] = useState(initiateConfig?.zoom || 8);
    
    const Render = (props) => {
        useEffect(() => {
            // initialize map only once
            mapboxInstance.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom
            });
        
            mapboxInstance.current.setStyle(themes.light)
            mapboxInstance.current.on('click', handleClick)
            mapboxInstance.current.on('load', console.log('map loaded'))
        }, []);
        
        return <MapContainer 
            ref={ mapContainer }
            height={ initiateConfig?.height || '400px' }
        />
    }
    
    const handleClick = (event) => {
        console.log('click', event);
        if (onClick instanceof Function) {
            onClick({
                coords: event.lngLat,
                target: event.target,
                point: event.point
            });
        }
    }
    
    return [
        Render,
        mapboxInstance.current
    ]
}

export default useMapbox;