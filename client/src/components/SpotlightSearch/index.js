import React from 'react';
import Backdrop from './Backdrop';
import tw from 'tailwind-styled-components';
import { Form, Input } from '..';
import { useAppStore } from '../../hooks';

const Wrapper = tw.div`
    fixed
    top-0
    left-0
    right-0
    bottom-0
    z-[41]
    flex
    items-center
    justify-center
`;

const SpotlightSearch = () => {
    const [ state, update, get ] = useAppStore()
    
    const handleSearch = (formData) => {
        update('searchQuery', formData.query)
    }
    
    const handleClose = () => update('showSpotlightSearch', false)
    
    if (!!get('showSpotlightSearch')) return (
        <>
            <Wrapper>
                <div className="w-[40vw] h-fit bg-white shadow rounded-3xl">
                    <div className="p-4">
                        <Form onChange={ handleSearch }>
                            <Input name="query" block placeholder="Zoek op plaats, vereniging, etc." defaultValue={ get('searchQuery') } />
                        </Form>
                    </div>
                    { !!get('searchQuery') && (
                        <div className="px-8 pt-4 pb-8">
                            <h4 className="font-display font-medium text-xl lowercase mb-3 text-tt-blue-500">
                                zoekresultaten
                            </h4>
                        </div> 
                    )}
                </div>
            </Wrapper>
            <Backdrop onClick={ handleClose } />
        </>
    ) 

    else return null
}

export default SpotlightSearch