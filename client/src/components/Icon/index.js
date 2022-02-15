import React from 'react';
import remix from 'remixicon/fonts/remixicon.symbol.svg';

import Svg from './Svg';

const Icon = ({ color, size = '1.3rem', style = 'line', fill, name = 'admin', className }) => {
    return (
        <Svg
            { ...{ color, size, className }}s
        >
            <use xlinkHref={ remix + `#ri-${ name }-${ fill ? 'fill' : style }`}></use>
        </Svg>
    )
}

export default Icon