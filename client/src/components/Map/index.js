import React, { useRef, useEffect, useState, forwardRef } from 'react';
import useAxios from 'axios-hooks'
import PropTypes from 'prop-types';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styled from 'styled-components';
import { useLocation } from '../../hooks';
import classNames from 'classnames';
import { Icon } from '..';
import themes from '../../data/mapbox/themes';

mapboxgl.accessToken = 'pk.eyJ1IjoianVuZy1nZW50IiwiYSI6ImNreXZmdjZveTFxZzYybnRnOTkwdzVkM2MifQ.4cmT6X8MlQfeDR04WbivKw';

const MapContainer = styled.div`
    width: 100%;
    height: ${ props => props.height };
`;

const currentLocationZoom = 10;

const Map = forwardRef(({ children, className, height = '400px', onClick, geoCoding = false, showCurrentLocation, showControls, render, initialstate, ...otherProps }, forwardedRef) => {
    const [ centered, setCentered ] = useState();
    const [ locationState, fetchLocation ] = useLocation({ lazy: true, enableHighAccuracy: true, maximumAge: 300000 });
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(initialstate?.lng || 3.7656905);
    const [lat, setLat] = useState(initialstate?.lat || 51.0573704);
    const [zoom, setZoom] = useState(initialstate?.zoom || 8);
    
    /**
     * INITIAL STATE PARAMS
     * - coords
     * - zoom

     * 
     * SHOW LOCATION
     * either true or object
     * - zoom
     * - bearing
     */
    
    useEffect(() => {
        if (showCurrentLocation ) fetchLocation()
    }, [])
    
    useEffect(() => {
        if (showCurrentLocation && locationState.data && map.current) {
            const target = {
                lat: locationState.data.latitude,
                lon: locationState.data.longitude
            };
                        
            map.current.flyTo({
                center: target,
                zoom: showCurrentLocation?.zoom || 10,
                bearing: showCurrentLocation?.bearing || 0,
            })
        }
    }, [locationState, map.current, showCurrentLocation])
    
    useEffect(() => {
        if (map.current) {
            map.current.zoomTo(zoom);
        }
    }, [zoom])
    
    useEffect(() => {
        if (locationState.loading) setCentered(false)
        else if (!locationState.loading) setCentered(true)
    }, [locationState])
    
    const handleGeocoding = () => {
        
    }
    
    const handleMapDrag = () => {
        setCentered(false)
    }
    
    const handleCurrentLocationFetch = () => {
        if (!centered) fetchLocation()
        else if (centered && map.current && locationState.data) {
            const currentZoom = map.current.getZoom()
            const target = {
                lat: locationState.data.latitude,
                lon: locationState.data.longitude
            };
                        
            map.current.flyTo({
                center: target,
                zoom: currentZoom === 10 || currentZoom === 8 ? 14 : 10,
            })
        }
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
        
        if (!!forwardedRef) forwardedRef.current = map.current;
        
        map.current.setStyle(themes.light)
        map.current.on('click', handleClick)
        map.current.on('drag', handleMapDrag);
        
        if (render instanceof Function) render(map.current)
    }, [map.current]);
    
    return (
        <MapContainer 
            height={ height }
            className={ classNames(className, 'relative', 'overflow-hidden') } 
            { ...otherProps }
        >
            <MapContainer 
                ref={ mapContainer } 
                height={ height }
            />
            
            { showControls && (
                <div
                    className="absolute bottom-0 right-0 px-4 py-3"
                >
                    {( locationState.loading && !locationState.error ) && (
                        <div className="font-display lowercase text-sm bg-white px-2 py-1 rounded-lg text-gray-500 flex items-center shadow-md">
                            <span>locatie ophalen</span>
                            <div className="animate-spin w-fit h-fit ml-1">
                                <Icon name="loader-4" size="1.2rem" color="currentColor" />
                            </div>
                        </div>
                    )}
                    {( !locationState.loading && !locationState.error ) && <button
                            className="bg-white p-1 text-gray-500 rounded-lg shadow-md"
                            onClick={ handleCurrentLocationFetch }
                        ><Icon name="map-pin-2" size="1.2rem" color="currentColor" style={ centered ? 'fill' : 'line' } />
                    </button>}
                    { locationState.error && <button
                            className="bg-white p-1 text-gray-500 rounded-lg shadow-md"
                            onClick={ fetchLocation }
                        >We konden geen locatie ophalen, probeer opnieuw
                    </button>}
                </div>
            )}
        </MapContainer>
    );
})

export default Map;