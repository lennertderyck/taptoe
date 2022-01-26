import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styled from 'styled-components';

mapboxgl.accessToken = 'pk.eyJ1IjoianVuZy1nZW50IiwiYSI6ImNreXZmdjZveTFxZzYybnRnOTkwdzVkM2MifQ.4cmT6X8MlQfeDR04WbivKw';

const themes = {
    mimo: 'mapbox://styles/jung-gent/ckyvgd44n003714pdybkhyq4j',
    dark: '',
    light: 'mapbox://styles/jung-gent/ckyvgir91003215o2o2rfk4wy'
}

const MapContainer = styled.div`
    width: 100%;
    height: ${ props => props.height };
`;

const Map = ({ children, height = '400px', ...props }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        
        map.current.setStyle(themes.light)
    });
    
    return (
        <MapContainer ref={ mapContainer } height={ height } />
    );
}

export default Map;