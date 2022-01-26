import React from 'react';

const InputGroup = ({ children }) => {
    const childrenArray = React.Children.toArray(children);
    const cols = childrenArray.length === 1 ? 'col-span-12' : 'col-span-6';
        
    return (
        <div className="grid grid-cols-12 gap-x-6 gap-y-4 mb-4">
            { childrenArray.map((child, index) => (
                <div 
                    key={ index}
                    className={ cols }
                >
                    { child }
                </div>
            ))}
        </div>
    )
}

export default InputGroup