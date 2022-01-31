import React from 'react';
import classnames from 'classnames';

const Item = ({ children, className, ...otherProps }) => {
    return (
        <div
            className={ classnames(className, 'py-3 border-b border-gray-300 last:border-b-0') }
            { ...otherProps }
        >
            { children }
        </div>
    )
}

export default Item