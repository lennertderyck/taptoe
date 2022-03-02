import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, InputGroup, Map } from '../components';
import { MUTATE, QUERY } from '../graphql';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line
import { formatMapboxLookup } from '../utils';
import axios from 'axios';

const CreateLocation = ({ location }) => {
    const navigate = useNavigate()
    const locationMarker = useRef();
    const locationPopup = useRef();
    const [ inheritedAddress, setInheritedAddress ] = useState()
    const [ pinCoords, setPinCoords ] = useState()
    const { data, loading } = useQuery(QUERY.AVAILABLE_TRIBES_BY_OWNER)
    const [ createLocation, createdLocationState] = useMutation(MUTATE.CREATE_OR_UPDATE_LOCATION)
    
    
    const handleLocationPinning = async ({ target, coords }) => {    
        console.log(target, coords)
        
        // check if there is already a marker or popup
        const mapContainsMarker = locationMarker.current instanceof mapboxgl.Marker
        const mapContainsPopup = locationPopup.current instanceof mapboxgl.Popup
        
        // remove marker if it exists
        if (mapContainsPopup) {
            console.log('pin removed')
            locationPopup.current.remove()
        }
        
        // fetch address from coordinates
        const response = await axios({
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ coords.lng }, ${ coords.lat }.json`,
            params: {
                access_token: process.env.REACT_APP_MAPBOX_TOKEN,
                types: 'address',
                language: 'nl'
            }
        })
        
        // transform response to address object
        const formattedAddress = formatMapboxLookup(await response.data.features)
        delete formattedAddress.region
        
        console.log('country', formattedAddress.country)
        if (formattedAddress.country !== 'België') {
            locationPopup.current = new mapboxgl.Popup({ closeOnClick: false })
                .setLngLat([ coords.lng, coords.lat ])
                .setHTML('<h1>Je kan hier geen locatie toevoegen.</h1>')
                .addTo(target);
            
            // return nothing to block the rest of the function
            return;
        }
        
        // prepare values to be accepted by the form
        const formReadyValues = Object.entries(formattedAddress).reduce((acc, [ key, value ]) => {
            if (key === 'postcode') key = 'zip';
            if (key === 'place') key = 'city';
            
            return {
                ...acc,
                [`address.${ key }`]: value
            }
        }, {})
        
        console.log('formReadyValues', formReadyValues)

        setPinCoords(coords)
        setInheritedAddress(formReadyValues)
        
        // remove if it exists
        if (mapContainsMarker) locationMarker.current.remove()
        
        // create new marker
        locationMarker.current = new mapboxgl
            .Marker({
                draggable: false
            })
            .setLngLat([ coords.lng, coords.lat ])
            .addTo(target);
            
        console.log('marker', locationMarker.current)
    }
    
    useEffect(() => {
        if (createdLocationState.data) {
            const createdLocation = createdLocationState.data.writeLocation.tribe
            navigate(`/tribes/${ createdLocation.id }`)
        }
    }, [createdLocationState])
    
    return (
        <Form
            defaultValues={{
                tribe: location?.tribe?.id,
                name: location?.name,
                address: location?.address,
            }}
            onSubmit={(formData) => {
                createLocation({
                    variables: {
                        location: {
                            ...formData,
                            address: {
                                ...formData.address,
                                number: parseInt(formData.address.number)
                            }
                        },
                        id: undefined
                    }
                })
            }}
            loading={ createdLocationState.loading }
            setValues={{
                ...inheritedAddress,
                longitude: pinCoords?.lng,
                latitude: pinCoords?.lat
            }}
        >
            <InputGroup className="!mb-10">
                <Input block name="name" label="Naam locatie" />
                <Input 
                    block
                    name="tribe" 
                    label="Tribe" 
                    type="select"
                >
                    { data?.readTribesByOwnerID?.map(item => (
                        <option key={ item.id } value={ item.id }>{ item.name }</option>
                    ))}
                </Input>
            </InputGroup>
            
            <Map 
                geoCoding="reverse"
                className="rounded-xl overflow-hidden mb-6"
                showCurrentLocation
                onClick={ handleLocationPinning }
                showControls
            />
            { pinCoords && (
                <>
                    <div className="grid gap-x-6 mb-4 grid-cols-12">
                        <div className="col-span-6">
                            <Input block name="address.street" label="Straat" placeholder="Bredenakkerstraat" />
                        </div>
                        <div className="col-span-3">
                            <Input block name="address.number" label="Huisnummer" type="number" placeholder="31" min="0" />
                        </div>
                        <div className="col-span-3">
                            <Input block name="address.addOn" label="Toevoeging" placeholder="A" />
                        </div>
                    </div>
                    <InputGroup>
                        <Input block name="address.city" label="Stad of gemeente" placeholder="Destelbergen" />
                        <Input block name="address.zip" label="Postcode" placeholder="9070" />
                        <Input block name="address.country" label="Land" placeholder="België" />
                    </InputGroup>
                    <div className="hidden">
                        <Input block name="longitude" label="Long" />
                        <Input block name="latitude" label="Lat" />
                    </div>
                </>
            )}
            
            {/* <Input 
                name="properties.capacity"
                type="number"
                label="Capaciteit"
                defaultValue="0"
                min="0"
            />
            
            <Input 
                name="properties.campfire"
                type="checkbox"
                label="Kampvuur toegelaten"
            />
            <Input 
                name="properties.leaders_only"
                type="checkbox"
                label="Leidingsactiviteiten toegelaten"
            />
            <Input 
                name="properties.leaders_only"
                type="checkbox"
                label="Bestek en border aanwezig"
            />
            
            <Input 
                name="properties.showers"
                type="number"
                label="Douchekoppen"
                min="0"
                defaultValue="1"
            />
            <Input 
                name="properties.toilets"
                type="number"
                label="Wc's"
                min="1"
                defaultValue="1"
            />
            <Input 
                name="properties.dayrooms"
                type="number"
                label="Leeflokalen"
                min="0"
            />
            <Input 
                name="properties.dayrooms"
                type="number"
                label="Slaapzalen"
                min="0"
            />
            <Input 
                name="properties.dayrooms"
                type="number"
                label="Bedden"
                min="0"
            />
            <Input 
                name="properties.bedsheets"
                type="number"
                label="Beddengoed"
                min="0"
            /> */}
            
            <Button 
                theme="primary" 
                type="submit" 
                className="mt-10 mx-auto"
                loading={ createdLocationState.loading }
            >Locatie { location ? 'opslaan' : 'aanmaken' }</Button>
            
            {/* <div className="mt-6">
                <h4 className="font-display font-medium text-lg text-gray-800 mb-2">adres overnemen van</h4>
                <div className="text-tt-emerald-500 ">
                    <button className="hover:underline" type="button" onClick={() => inheritAddress(tribe.address)}>tribe</button>&nbsp;|&nbsp;
                    <button className="hover:underline" onClick={}>Locatie</button>&nbsp;|&nbsp;
                </div>
            </div> */}
        </Form>
    )
}

export default CreateLocation