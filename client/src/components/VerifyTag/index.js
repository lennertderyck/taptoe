import { Icon } from '..';
import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const Wrapper = tw.div`
    flex items-center 
    py-2 pl-3 pr-4
    hover:bg-gray-100 rounded-lg 
    cursor-pointer
`;

const WrapperHover = styled(Wrapper)`
    span {
        max-width: 0vw;
        opacity: 0;
    }
    
    &:hover span {
        max-width: 100vw;
        opacity: 1;
    }
`;

const VerifyTag = ({ simple, className, ...otherProps }) => {
    if (simple) return (
        <button className={ classNames('p-2 hover:bg-gray-100 rounded-lg', className) } { ...otherProps }>
            <Icon name="check-double" color="currentColor" className="text-tt-emerald-500" />
        </button>
    )
    
    else return (
        <WrapperHover
            { ...otherProps }
        >
            <Icon name="check-double" size="1.4rem" color="currentColor" className="text-tt-emerald-500 mr-2" />
            <span
                className="text-tt-emerald-500 lowercase !font-normal text-lg -translate-y-0.5 block overflow-hidden"
            >Geverifieerd</span>
        </WrapperHover>
    )
}

export default VerifyTag