import { useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, PageHeader } from '../../components';
import * as Form from '../../forms';
import { QUERY } from '../../graphql';
import useSplash from '../../hooks/useSplash';

const NewLocationModule = () => {
    const { start, stop } = useSplash()
    const { tribeId } = useParams()
    const [ fetchTribe, { data, loading }] = useLazyQuery(QUERY.TRIBE_BY_ID, {
        variables: { id: tribeId }
    })
    
    useEffect(() => {
        if (tribeId) {
            start()
            fetchTribe()
        }
    }, [])
    
    useEffect(() => {
        if (!data && loading) start() 
        else stop()
    }, [data])
     
    if (!data && tribeId) return <div>Loading...</div>
    
    return (
        <Container>
            <PageHeader
                subtitle={  data?.readTribe ? data.readTribe.name : 'locaties' }
                title="Nieuwe locatie"
            />
            <Form.CreateLocation tribe={ data?.readTribe } />
        </Container>
    )
}

export default NewLocationModule