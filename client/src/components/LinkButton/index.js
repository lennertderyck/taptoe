import React from 'react';
import tw from 'tailwind-styled-components';
import ButtonWrapper from '../ButtonWrapper';
import { Link } from "react-router-dom";
import { Icon } from '..';

const NativeLink = tw(Link)`
    block
`;

const LinkButton = ({ children, to = '/', icon, primary, ...otherProps }) => {
    return (
        <NativeLink to={ to } { ...otherProps }>
            <ButtonWrapper { ...{ 
                    primary,
                    hasIcon: icon ? true : false
                }}>
                { icon && <Icon name={ icon } className="mr-2" color={ primary && '#fff' } /> }
                { children }
            </ButtonWrapper>
        </NativeLink>
    )
}

export default LinkButton