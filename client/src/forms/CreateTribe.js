import React from 'react';
import { Button, Form, Icon, Input, InputGroup } from '../components';
import { useQuery } from '@apollo/client'
import { QUERY } from '../graphql';

const CreateTribe = () => {
    const { data } = useQuery(QUERY.ORGANISATIONS);
    
    return (
        <Form onSubmit={(v) => console.log('values', v)}>
            <InputGroup>
                <Input
                    label="Naam vereniging"
                    name="name"
                    block
                />
                <Input 
                    label="Organisatie"
                    type="select"
                    name="organisation"
                    placeholder="Organisatie"
                    block
                >
                    <option value="none">Geen</option>
                    { data && data.readOrganisations.map(({ id, name }) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </Input>
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
                <Button>Vereniging aanmaken</Button>
            </div>
        </Form>
    )
}

export default CreateTribe