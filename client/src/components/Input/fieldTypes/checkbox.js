import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { Icon } from '../..'
import classNames from 'classnames';

const Checker = styled.input`
    display: none;
    
    & + div {
        svg {
            opacity: 0;
        }
    }
    
    &:checked + div {
        svg {
            opacity: 1;
        }
    }
`;

const Standin = tw.div`
    cursor-pointer
    border-2 border-gray-200
    rounded-lg
    transition-none
`;

const Checkbox = ({ className, ...otherProps }) => {
    const [ isChecked, setChecked] = useState(false);
    
    const handleChecking = (event) => {
        const { checked } = event.target;
        setChecked(checked);
    }
    
    return (
        <div className={ classNames('block', className ) }>
            <Checker type="checkbox" { ...otherProps } />
            <Standin className="standin">
                <Icon name="check" color="currentColor" className="text-gray-500" />
            </Standin>
        </div>
    )
}

export default Checkbox