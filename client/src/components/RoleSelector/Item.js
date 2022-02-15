import React, { useState } from 'react';
import Popup from 'reactjs-popup';

const Component = () => {
    const [ selectedRole, setRole ] = useState(null);
    
    return (
        <Popup
            trigger={
                <button className="p-2 hover:bg-gray-300 rounded-lg">
                    <Icon name="more-2" color="currentColor" />
                </button>
            }
            position={['top center', 'bottom right', 'bottom left']}
            closeOnDocumentClick
        >
            <div className="p-4">
                
            </div>
        </Popup>
    )
}

export default Component