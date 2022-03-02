import React from 'react';
import styled from 'styled-components';

const ContentStylingWrapper = styled.div`
    p, ul {
        &:not(:first-child) {
            margin-top: 1rem;
        }
    }
    
    ul {
        list-style: disc;
        padding-left: 19px;
        
        li:not(:first-child) {
            margin-top: .5rem
        }
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