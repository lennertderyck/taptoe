import React from 'react';
import tw from 'tailwind-styled-components'
import { Icon } from '..';

const IconWrapper = tw.div`
    w-fit rounded-xl
    ${ props => props.minimal ? 'border-2 border-gray-200' : 'bg-gray-200' }
    ${ props => props.small ? 'mr-3' : 'mr-4' }
    ${ props => props.small ? 'p-2' : 'p-3' }
`;

const Content = ({ children, small, minimal }) => {
    return (
        <>
            <IconWrapper {...{ small, minimal }}>
                <Icon name="add" size={ small ? '1.5rem' : '1.8rem'} />
            </IconWrapper>
            <div className={ small ? '-translate-y-0.5' : '-translate-y-1'}>
                <h4 className="font-display font-medium text-lg text-gray-800">{ children }</h4>
            </div>
        </>
    )
}

const AddButton = tw(Content)`
    flex items-center w-fit
`;

export default AddButton