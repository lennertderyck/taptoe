import React from 'react';
import styled from 'styled-components';

const ContentStylingWrapper = styled.div`
    p:not(:first-child) {
        margin-top: 1rem;
    }
`;

const Contentainer = ({ innerHtml, children }) => {
    return (
        <ContentStylingWrapper
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: innerHtml }}
        >
            { innerHtml && children }
        </ContentStylingWrapper>
    )
}

export default Contentainer