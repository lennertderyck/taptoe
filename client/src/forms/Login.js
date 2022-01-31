import React, { useEffect } from 'react';
import { Form, Input, Button, InputGroup } from '../components';
import { useLazyQuery } from '@apollo/client';
import { QUERY } from '../graphql';
import { useAuth } from '../hooks';

const Login = () => {
    const [ fetch, { data, loading }] = useLazyQuery(QUERY.LOGIN);
    const { credentials, login } = useAuth()
    
    useEffect(() => {
        if (data) {
            login(data.login)
        }
    }, [data]);
    
    return (
        <Form
            onSubmit={(v) => fetch({
                variables: {
                    email: v.email,
                    password: v.password
                }
            })}
            loading={ loading }
        >
            <InputGroup>
                <Input
                    label="Emailadres"
                    name="email"
                    block
                />
            </InputGroup>
            <InputGroup>
                <Input
                    label="Wachtwoord"
                    name="password"
                    type="password"
                    block
                />
            </InputGroup>
            <Button primary className="mx-auto mt-8" loading={ loading }>Aanmelden</Button>
        </Form>
    )
}

export default Login