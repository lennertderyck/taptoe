import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

const Wrapper = styled.div`
    ${ props => !props.standAlone && 'margin-top: 3rem;' }
`;

const Container = ({ children, className, standAlone = false }) => {
    return (
        <Wrapper 
            standAlone={ standAlone }
            className={ classNames('container mx-auto max-w-6xl px-12', className) }
        >
            { children }
        </Wrapper>
    )
}

export default Container