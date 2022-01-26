import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, InputGroup } from '../components';
import { MUTATE, QUERY } from '../graphql';

const CreateLocation = ({ tribe }) => {
    const navigate = useNavigate()
    const [ inheritedAddress, setInheritedAddress ] = useState()
    const { data, loading } = useQuery(QUERY.AVAILABLE_TRIBES_BY_OWNER)
    const [ createLocation, createdLocationState] = useMutation(MUTATE.CREATE_OR_UPDATE_LOCATION)
    
    const inheritAddress = (tribeOrLocationAddress) => {
        setInheritedAddress(tribeOrLocationAddress)
    }
    
    useEffect(() => {
        if (createdLocationState.data) {
            const createdTribe = createdLocationState.data.writeLocation.tribe
            navigate(`/tribes/${ createdTribe.id }`)
        }
    }, [createdLocationState])
    
    return (
        <Form
            defaultValues={{
                tribe: tribe?.id
            }}
            onSubmit={(formData) => {
                console.log(formData)
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
        >
            <InputGroup className="!mb-10">
                <Input block name="name" label="Naam locatie" />
                <Input 
                    block
                    name="tribe" 
                    label="Tribe" 
                    type="select"
                    disabled={ data?.readTribesByOwnerID?.length <= 1}
                >
                    { data?.readTribesByOwnerID?.map(item => (
                        <option key={ item.id } value={ item.id }>{ item.name }</option>
                    ))}
                </Input>
            </InputGroup>
            
            <div className="grid gap-x-6 mb-4 grid-cols-12">
                <div className="col-span-6">
                    <Input block name="address.street" label="Straat" placeholder="Bredenakkerstraat" value={ inheritedAddress?.street } /> 
                </div>
                <div className="col-span-3">
                    <Input block name="address.number" label="Huisnummer" type="number" placeholder="31" min="0"  value={ inheritedAddress?.number }/>
                </div>
                <div className="col-span-3">
                    <Input block name="address.addOn" label="Toevoeging" placeholder="A" value={ inheritedAddress?.addOn } />
                </div>
            </div>
            <InputGroup>
                <Input block name="address.city" label="Stad of gemeente" placeholder="Destelbergen" value={ inheritedAddress?.city } />
                <Input block name="address.zip" label="Postcode" placeholder="9070" value={ inheritedAddress?.zip } />
                <Input block name="address.country" label="Land" placeholder="BE" disabled value={ 'BE' } />
            </InputGroup>
            <Button type="submit" className="mt-10 mx-auto">Locatie aanmaken</Button>
            
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