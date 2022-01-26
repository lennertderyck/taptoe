import React from 'react';
import tw from 'tailwind-styled-components';

const Wrapper = tw.span`
    text-tt-emerald-500
    hover:underline
`;

const StyledLink = ({ children }) => {
    return (
        <>
            <Wrapper>{ children }</Wrapper>
            <span className="last:hidden text-tt-emerald-500">&nbsp;|&nbsp;</span>
        </>
    )
}

const LinksGroup = ({ children, ...otherProps }) => {
    return (
        <nav { ...otherProps }>
            { children({ StyledLink }) }
        </nav>
    )
}

export default LinksGroup