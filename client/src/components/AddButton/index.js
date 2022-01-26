import React from 'react';
import { Icon } from '..';

const AddButton = ({ children }) => {
    return (
        <>
            <div className="rounded-xl p-3 bg-gray-200 w-fit mb-2 mr-4">
                <Icon name="add" size="1.8rem" />
            </div>
            <div className="-translate-y-1">
                <h4 className="font-display font-medium text-lg text-gray-800">{ children }</h4>
            </div>
        </>
    )
}

export default AddButton