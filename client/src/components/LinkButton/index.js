import React from 'react';
import tw from 'tailwind-styled-components';
import ButtonWrapper from '../ButtonWrapper';
import { Link } from "react-router-dom";

const NativeLink = tw(Link)`
    block
`;

const LinkButton = ({ children, to = '/', ...otherProps }) => {
    return (
        <NativeLink to={ to } { ...otherProps }>
            <ButtonWrapper>{ children }</ButtonWrapper>
        </NativeLink>
    )
}

export default LinkButton