import React, { useEffect } from 'react';
import { Form, Input, Button, InputGroup } from '../components';
import { useLazyQuery } from '@apollo/client';
import { QUERY } from '../graphql';
import { useAuth } from '../hooks';

const Login = ({ otpToken, onReady }) => {
    const [ validateUser, validateUserState ] = useLazyQuery(QUERY.VALIDATE_USER);
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
    
    const handleValidateUser = (data) => {
        validateUser({
            variables: {
                value: data.email,
                validationTypes: ['EMAIL']
            }
        })
    }
    
    const handleLogin = (data) => {
        fetch({
            variables: {
                email: data.email,
                password: data.password
            }
        })
    }
    
    const handleSubmit = (data) => {
        if (!!data.password) {
            handleLogin(data)
        } else {
            handleValidateUser(data)
        }
    }
    
    return (
        <Form
            onSubmit={ handleSubmit }
            loading={ loading || validateUserState.loading }
        >
            <InputGroup>
                <Input
                    label="Emailadres"
                    name="email"
                    block
                />
            </InputGroup>
            { validateUserState?.data?.validateUser && <InputGroup>
                <Input
                    label="Wachtwoord"
                    name="password"
                    type="password"
                    block
                />
            </InputGroup>}
            <Button theme="primary" className="mx-auto mt-8" loading={ loading || validateUserState.loading }>{ !validateUserState?.data?.validateUser ? 'Volgende' : 'Aanmelden' }</Button>
        </Form>
    )
}

export default Login