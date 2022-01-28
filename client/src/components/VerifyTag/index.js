import React from 'react';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import { Icon } from '..';

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

const VerifyTag = ({ ...otherProps }) => {
    return (
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