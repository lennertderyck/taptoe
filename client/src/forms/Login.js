import React, { useEffect } from 'react';
import { Form, Input, Button, InputGroup } from '../components';
import { useLazyQuery } from '@apollo/client';
import { QUERY } from '../graphql';
import { useAuth } from '../hooks';

const Login = ({ otpToken, onReady }) => {
    const [ fetch, { data, loading, error }] = useLazyQuery(otpToken ? QUERY.OTP_LOGIN : QUERY.LOGIN);
    const { credentials, login } = useAuth()
    
    useEffect(() => {
        fetch({
            variables: {
                otpToken
            }
        })
    }, [ otpToken ])
    
    useEffect(() => {
        if ((!loading && (data || error)) && onReady instanceof Function) {
            onReady({ data, error })
        }
    }, [loading])
    
    useEffect(() => {
        if (data) {
            login(data.login)
        }
    }, [data]);
    
    if (otpToken && error) return <div>
        <h3>Deze code was niet geldig</h3>
        <p>Vraag bij de eigenaar een nieuwe code aan.</p>
    </div>;
    
    else return (
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
            <Button theme="primary" className="mx-auto mt-8" loading={ loading }>Aanmelden</Button>
        </Form>
    )
}

export default Login