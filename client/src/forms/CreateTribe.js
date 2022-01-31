import React, { useEffect } from 'react';
import { Button, Form, Icon, Input, InputGroup } from '../components';
import { useMutation, useQuery } from '@apollo/client'
import { MUTATE, QUERY } from '../graphql';
import { useNavigate } from 'react-router-dom';

const CreateTribe = () => {
    const navigate = useNavigate()
    const { data } = useQuery(QUERY.ORGANISATIONS);
    const [ createTribe, createdTribeState] = useMutation(MUTATE.CREATE_OR_UPDATE_TRIBE)
    
    useEffect(() => {
        if (createdTribeState.data) {
            const createdTribe = createdTribeState.data.id
            navigate(`/tribes/${ createdTribe.id }`)
        }
    }, [createdTribeState])
    
    return (
        <Form 
            onSubmit={(formValues) => createTribe({
                variables: {
                    tribe: {
                        ...formValues,
                        address: {
                            ...formValues.address,
                            number: parseInt(formValues.address.number)
                        }
                    }
                }
            })}
            loading={ createdTribeState.loading }
        >
            <InputGroup>
                <Input
                    label="Naam vereniging"
                    name="name"
                    block
                />
                {/* <Input 
                    label="Organisatie"
                    type="select"
                    name="verified"
                    placeholder="Organisatie"
                    block
                >
                    <option value="none">Geen</option>
                    { data && data.readOrganisations.map(({ id, name }) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </Input> */}
            </InputGroup>
            <InputGroup>
                <Input
                    label="Website"
                    name="website"
                    block
                />
                <Input block name="email" label="Emailadres verhuur" />
            </InputGroup>
            <InputGroup>
                <Input block name="description" label="Omschrijf je vereniging" />
            </InputGroup>
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
                <Input block name="address.country" label="Land" placeholder="BE" disabled value={ 'BE' }  />
            </InputGroup>
            <div className="mt-6 flex justify-between">
                <div className="flex">
                    <div className="bg-gray-100 rounded-full p-4 w-fit h-fit mr-6">
                        <Icon name="user" size="1.8rem" className="text-gray-600" color="currentColor" />
                    </div>
                    <div>   
                        <h4 className="font-display font-medium text-lg text-gray-800 -mb-1">beheerder</h4>
                        <p className="text-xl text-gray-700">Lennert De Ryck</p>
                        <small className="text-gray-500">Je kan later extra beheerders toevoegen</small>
                    </div>
                </div>
                <Button 
                    primary
                    loading={ createdTribeState.loading }
                >Vereniging aanmaken</Button>
            </div>
        </Form>
    )
}

export default CreateTribe