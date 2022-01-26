import React from 'react';
import remix from 'remixicon/fonts/remixicon.symbol.svg';

import Svg from './Svg';

const Icon = ({ color, size = '1.3rem', style = 'line', name = 'admin', className }) => {
    return (
        <Svg
            { ...{ color, size, className }}s
        >
            <use xlinkHref={ remix + `#ri-${ name }-${ style }`}></use>
        </Svg>
    )
}

export default Icon