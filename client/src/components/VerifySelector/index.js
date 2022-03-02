import { useQuery } from '@apollo/client';
import React from 'react';
import { Input } from '..';
import { QUERY } from '../../graphql';

const VerifySelector = ({ label, ...otherProps }) => {
    const { data } = useQuery(QUERY.ORGANISATIONS);
    
    return (
        <Input 
            label={ label }
            type="select"
            name="verified"
            placeholder="Organisatie"
            { ...otherProps }
        >
            <option value="none">Geen</option>
            { data && data.readOrganisations.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
            ))}
        </Input>
    )
}

export default VerifySelector