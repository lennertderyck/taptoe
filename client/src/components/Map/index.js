import React, { useRef, useEffect, useState } from 'react';
import useAxios from 'axios-hooks'
import PropTypes from 'prop-types';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styled from 'styled-components';
import { useLocation } from '../../hooks';
import classNames from 'classnames';
import { Icon } from '..';

mapboxgl.accessToken = 'pk.eyJ1IjoianVuZy1nZW50IiwiYSI6ImNreXZmdjZveTFxZzYybnRnOTkwdzVkM2MifQ.4cmT6X8MlQfeDR04WbivKw';

const themes = {
    mimo: 'mapbox://styles/jung-gent/ckyvgd44n003714pdybkhyq4j',
    dark: '',
    light: 'mapbox://styles/jung-gent/ckz2vtrqf001x16o6dil4iacp'
}

const MapContainer = styled.div`
    width: 100%;
    height: ${ props => props.height };
`;

const Map = ({ children, className, height = '400px', onClick, geoCoding = false, showLocation, initialCoords, initialZoom, showCurrentLocation, showControls, ...otherProps }) => {
    // const [ locationState, fetchLocation ] = useLocation({ lazy: true, enableHighAccuracy: true });
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(initialCoords?.lng || 3.7656905);
    const [lat, setLat] = useState(initialCoords?.lat || 51.0573704);
    const [zoom, setZoom] = useState(initialZoom || 8);
    
    // useEffect(() => {
    //     if (showCurrentLocation) fetchLocation()
    // }, [])
    
    // useEffect(() => {
    //     if (showCurrentLocation && locationState.data && map.current) {
    //         const target = {
    //             lat: locationState.data.latitude,
    //             lon: locationState.data.longitude
    //         };
                        
    //         map.current.flyTo({
    //             center: target,
    //             zoom: 15,
    //             bearing: 0,
    //         })
    //     }
    // }, [locationState, map.current, showCurrentLocation])
    
    const handleGeocoding = () => {
        
    }
    
    const handleClick = (event) => {
        if (onClick instanceof Function) {
            onClick({
                coords: event.lngLat,
                target: event.target,
                point: event.point
            });
        }
    }
    
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        
        map.current.setStyle(themes.light)
        map.current.on('click', handleClick)
        map.current.on('load', console.log('Map loaded'))
        
    });
    
    return (
        <MapContainer 
            ref={ mapContainer } 
            height={ height }
        />
    );
    
    // return (
    //     <div 
    //         className={ classNames(className, 'relative h-full') } 
    //         { ...otherProps }
    //     >
    //         <MapContainer 
    //             ref={ mapContainer } 
    //             height={ height }
    //         />
    //         { showControls && (
    //             <div
    //                 className="absolute bottom-0 right-0 px-4 py-3"
    //             >
    //                 {( locationState.loading && !locationState.error ) && <div className="font-display lowercase text-sm bg-white px-2 py-1 rounded-lg text-gray-500 flex items-center">
    //                     <span>locatie ophalen</span>
    //                     <div className="animate-spin w-fit h-fit ml-1">
    //                         <Icon name="loader-4" size="1.2rem" color="currentColor" />
    //                     </div>
    //                 </div>}
    //                 {( !locationState.loading && !locationState.error ) && <button
    //                         className="bg-white p-1 text-gray-500 rounded-lg"
    //                         onClick={ fetchLocation }
    //                     ><Icon name="map-pin-2" size="1.2rem" color="currentColor" />
    //                 </button>}
    //                 { locationState.error && <button
    //                         className="bg-white p-1 text-gray-500 rounded-lg"
    //                         onClick={ fetchLocation }
    //                     >We konden geen locatie ophalen, probeer opnieuw
    //                 </button>}
    //             </div>
    //         )}
    //     </div>
    // );
}

export default Map;