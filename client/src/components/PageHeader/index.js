import React, { isValidElement } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-bottom: 2rem;
`;

const PageHeader = ({ title, subtitle, append, ...otherProps }) => {
    return (
        <Wrapper { ...otherProps }>
            { subtitle && ( typeof subtitle === 'string' ?
                <h4 className="font-display font-medium text-xl lowercase mb-3 text-tt-blue-500">{ subtitle }</h4> :
                subtitle
            )}
            { title && <h2 className="text-4xl font-semibold text-tt-blue-700">{ title }</h2>}
            { append && append()}
        </Wrapper>
    )
}

export default PageHeader