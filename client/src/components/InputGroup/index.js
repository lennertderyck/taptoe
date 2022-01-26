import React from 'react';
import { gridCols } from '../../utils';
import classnames from 'classnames';
import styled from 'styled-components';

const Content = ({ children, className: cls }) => {
    const childrenArray = React.Children.toArray(children);
    const cols = gridCols(childrenArray.length);
        
    return (
        <div className={ classnames('grid gap-x-6 gap-y-4', 'grid-cols-' + cols, cls) }>
            { childrenArray.map((child, index) => (
                <div 
                    key={ index}
                    className="col-span-1"
                >
                    { child }
                </div>
            ))}
        </div>
    )
}

const InputGroup = styled(Content)`
    margin-bottom: 1rem;
`;

export default InputGroup