import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

const Wrapper = styled.div`
    margin-top: 3rem;
`;

const Container = ({ children, className }) => {
    return (
        <Wrapper className={ classNames('container mx-auto max-w-6xl px-12', className) }>
            { children }
        </Wrapper>
    )
}

export default Container