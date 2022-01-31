import classNames from 'classnames';
import React from 'react';
import Item from './Item';

const List = ({ children, ...otherProps }) => {
    return (
        <div
            { ...otherProps }
        >
            { children(Item) }
        </div>
    )
}

export default List