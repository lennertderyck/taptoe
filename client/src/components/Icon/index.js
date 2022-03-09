import React, { useEffect, useRef, useState } from 'react';
import remix from 'remixicon/fonts/remixicon.symbol.svg';

import Svg from './Svg';

const Icon = ({ color, size = '1.3rem', style = 'line', fill, name = 'admin', className }) => {
    const nameAndStyleSeperator = style ? '-' : '';
    const iconStyle = fill ? 'fill' : style ? style : '';
    const iconName = `${ name }${ nameAndStyleSeperator }${ iconStyle }`;
    
    return (
        <Svg
            { ...{ color, size, className }}
        >
            <use href={ remix + `#ri-${ iconName }`}></use>
        </Svg>
    )
}

export default Icon