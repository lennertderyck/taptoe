import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { Button, ButtonGroup, Form, Icon, Input, UserSearch } from '..';
import { useHelp } from '../../hooks';

const TribeTransferPopup = ({ tribe, onConfirm, onClose, ...otherProps }) => {
    const { openHelp } = useHelp()
    const [ transferUserSink, setTransferUserSink ] = useState()
    
    console.log(tribe)
    
    const handleConfirm = () => {
        if (onConfirm instanceof Function) onConfirm(transferUserSink)
    } 
    
    const handleCancel = () => {
        if (onClose instanceof Function) onClose()
    }
    
    return (
        <Popup modal { ...otherProps } onClose={ handleCancel }>
            <div className="p-8 max-w-[400px]">
                <div className="flex flex-col justify-centerw-fit mb-8">
                    <div className="flex">
                        <div className="bg-gray-100 rounded-full p-4 w-fit h-fit mr-6">
                            <Icon name="user-unfollow" size="1.8rem" className="text-gray-600" color="currentColor" />
                        </div>
                        <div>   
                            <h4 className="font-display font-medium text-lg text-gray-800">huidige beheerder</h4>
                            <p className="text-xl text-gray-700">Haegepoorters</p>
                            <p className="text-gray-500">verhuur@haegepoorters.be</p>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center my-6">
                        <Icon name="arrow-down" size="1.5rem" color="currentColor" className="text-gray-500" />
                    </div>
                    <div>
                        { transferUserSink && <div className="flex items-center mb-6">
                            <div className="bg-gray-100 rounded-full p-4 w-fit h-fit mr-6">
                                <Icon name="user-follow" size="1.8rem" className="text-gray-600" color="currentColor" />
                            </div>
                            <div className="flex-1">   
                                <h4 className="font-display font-medium text-lg text-gray-800">nieuwe beheerder</h4>
                                <p className="text-xl text-gray-700">{ transferUserSink?.firstName } { transferUserSink?.lastName }</p>
                                <p className="text-gray-500">verhuur@haegepoorters.be</p>
                            </div>
                            <button className="rounded-lg hover:bg-gray-100 p-1 w-fit h-fit" onClick={() => setTransferUserSink()}>
                                <Icon name="close" color="currentColor" className="text-gray-500" />
                            </button>
                        </div>}
                        <UserSearch onSelect={ setTransferUserSink } />
                    </div>
                </div>
                <Form test>
                    {(values, methods) => (
                        <>  
                            <div className="flex">
                                <Input type="checkbox" name="confirm" />
                                <div className="ml-3">
                                    <p>
                                        Ik erken dat na het overdragen alle rechten en gegevens gekoppeld aan deze tribe overgaan naar de nieuwe beheerder. 
                                        Deze actie kan enkel ongedaan worden gemaakt door de nieuwe beheerder. 
                                    </p>
                                    <button className="underline mt-1 text-gray-500" onClick={() => openHelp('faq-local-7', true)} type="button">Meer informatie</button>
                                </div>
                            </div>
                            <ButtonGroup className="mt-6">
                                <Button
                                    theme="primary"
                                    type="submit"
                                    onClick={ handleConfirm }
                                >
                                    Locatie overdragen
                                </Button>
                                <Button
                                    type="button"
                                    onClick={ handleCancel }
                                >
                                    Annuleren
                                </Button>
                            </ButtonGroup>
                        </>
                    )}
                </Form>
            </div>
        </Popup>
    )
}

export default TribeTransferPopup