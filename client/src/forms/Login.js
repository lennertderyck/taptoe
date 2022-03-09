import React, { useEffect } from 'react';
import { Form, Input, Button, InputGroup, Padded } from '../components';
import { useLazyQuery } from '@apollo/client';
import { QUERY } from '../graphql';
import { useAuth } from '../hooks';

const Login = ({ otpToken, onReady }) => {
    const [ validateUser, validateUserState ] = useLazyQuery(QUERY.VALIDATE_USER);
    const [ loginQuery, { data, loading, error }] = useLazyQuery(otpToken ? QUERY.OTP_LOGIN : QUERY.LOGIN);
    const { credentials, login } = useAuth()
    
    useEffect(() => {
        if (otpToken) {
            loginQuery({
                variables: {
                    otpToken
                }
            })
    }
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
                validationTypes: ['EMAIL'],
                exact: true
            }
        })
    }
    
    const handleLogin = (data) => {
        loginQuery({
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
    
    const emailFound = validateUserState?.data?.validateUser && validateUserState?.data?.validateUser?.length != 0;
    
    return (
        <Form
            onSubmit={ handleSubmit }
            loading={ loading || validateUserState.loading }
        >
            {(values) => (<>
                <InputGroup>
                    <Input
                        label="Emailadres"
                        name="email"
                        type="email"
                        block
                    />
                </InputGroup>
                { emailFound && <InputGroup>
                    <Input
                        label="Wachtwoord"
                        name="password"
                        type="password"
                        block
                    />
                </InputGroup>}
                {/* {( validateUserState?.data?.validateUser && !!values.email && !emailFound) && (
                    <Padded md className="bg-tt-red-500 bg-opacity-10 rounded-2xl">
                        <h4 class="font-display font-medium text-lg lowercase text-tt-red-500">gebruiker niet gevonden</h4>
                        <h3 class="font-medium text-lg text-tt-red-500">We konden geen gebruikers vinden met dit emailadres</h3>
                    </Padded>
                )} */}
                {( validateUserState?.data?.validateUser && !!values.email && !emailFound) && (
                    <Padded md className="bg-tt-red-500 bg-opacity-10 rounded-2xl">
                        <h4 class="font-display font-medium text-lg lowercase text-tt-red-500 mb-2">Gebruiker niet gevonden</h4>
                        <h3 class="font-medium text-lg text-tt-red-500">Deze gebruiker is niet geregistreerd. Je kan voor nu nog niet als nieuwe gebruiker registreren via onze site. Wil je toch graag tester worden? Neem dan contact op met ons!</h3>
                    </Padded>
                )}
                { error && <Padded md className="bg-tt-red-500 bg-opacity-10 rounded-2xl">
                    <h4 class="font-display font-medium text-lg lowercase text-tt-red-500">gegevens onjuist</h4>
                    <h3 class="font-medium text-lg text-tt-red-500">De opgegeven gegevens kloppen niet. Probeer het opnieuw.</h3>
                </Padded>}
                <Button theme="primary" className="mx-auto mt-6" loading={ loading || validateUserState.loading }>{ !emailFound ? 'Volgende' : 'Aanmelden' }</Button>
            </>)}
        </Form>
    )
}

export default Login