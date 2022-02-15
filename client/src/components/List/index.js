import classNames from 'classnames';
import React, { createContext, useEffect, useState } from 'react';
import Item from './Item';

const context = createContext();
const { Provider } = context;

const List = ({ children, onChange, showSummary, ...otherProps }) => {
    const [ changedItem, setChangedItem ] = useState([])
    
    useEffect(() => {
        if (onChange instanceof Function ) onChange(changedItem)
    }, [ changedItem ])
    
    return (
        <Provider value={{
            changeItem: setChangedItem
        }}>
            <div
                { ...otherProps }
            >
                {/* <div className="border-2 border-gray-200 rounded-lg py-2 px-3">
                    <span className="lowercase text-sm font-display text-gray-500">{ items.length } items geselecteerd</span>
                </div> */}
                { children(Item) }
            </div>
        </Provider>
    )
}

export default List
export {
    context as listContext
}