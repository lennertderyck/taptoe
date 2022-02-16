import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { Button, ButtonGroup, Form, Input } from '..';
import { MUTATE } from '../../graphql';

const OtpTokenPopup = ({ user, onClose, ...otherProps }) => {
    const [ tokenHidden, setTokenHidden ] = useState(true);
    const [ requestOtpToken, otpTokenState ] = useMutation(MUTATE.CREATE_OTP_TOKEN);
    const [ tokenIsCopying, setTokenIsCopying ] = useState(false);
    
    useEffect(() => {
        if (!!user) requestOtpToken({
            variables: {
                userId: user.id
            }
        })
    }, [user])
    
    const forceClose = () => {
        if (onClose instanceof Function) onClose()
    }
    
    const handleTokenCopy = async (token) => {
        setTokenIsCopying(true)
        await navigator.clipboard.writeText(token)
        setTokenIsCopying(false)
    }
    
    const handleTokenViewToggle = () => {
        setTokenHidden(p => !p)
    }
    
    return (
        <Popup open={ !!user } modal { ...{ onClose, ...otherProps }} >
            <div className="max-w-[600px]">
                <div className="p-8 pb-6">
                    <h3 class="text-xl font-medium font-display lowercase">Login code</h3>
                    <h4 className="text-lg lowercase font-display text-gray-500 ">
                        { user.email } – { user?.firstName } { user?.lastName }
                    </h4>
                </div>
                <hr />
                <div className="p-8">
                    <p className="text-gray-700 mb-4">Je kan deze code gebruiken om éénmalig aan te melden zonder wachtwoord. Deel deze niet met anderen.</p>
                    { !tokenHidden && (
                        <div className="break-words select-all mb-4">
                            { otpTokenState?.data?.writeSignInToken || <span className="text-gray-500">Code laden ...</span> }
                        </div>
                    )}
                    <Button 
                        iconAfter={ tokenHidden ? 'eye-close' : 'eye' }
                        onClick={ handleTokenViewToggle }
                    >
                        Code { tokenHidden ? 'weergeven' : 'verbergen' }
                    </Button>
                    
                    <p className="text-gray-700 mt-6">Deze code is slechts één keer zichtbaar, na het sluiten van dit venster moet je een nieuwe aanvragen.</p>
                    <ButtonGroup className="mt-6">
                        <Button theme="primary" onClick={() => handleTokenCopy(otpTokenState?.data?.writeSignInToken)} loading={ tokenIsCopying }>Code kopieren</Button>
                        <Button onClick={ forceClose }>sluiten</Button>
                    </ButtonGroup>
                </div>
            </div>
        </Popup>
    )
}

export default OtpTokenPopup