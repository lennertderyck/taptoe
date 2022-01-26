import React from 'react';
import tw from 'tailwind-styled-components'
import { Icon } from '..';

const Content = ({ children }) => {
    return (
        <>
            <div className="rounded-xl p-3 bg-gray-200 w-fit mr-4">
                <Icon name="add" size="1.8rem" />
            </div>
            <div className="-translate-y-1">
                <h4 className="font-display font-medium text-lg text-gray-800">{ children }</h4>
            </div>
        </>
    )
}

const AddButton = tw(Content)`
    flex items-center w-fit
`;

export default AddButton