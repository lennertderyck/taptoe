import React from 'react';

const MapPopup = ({ id, title, verified, capacity }) => {
    return (
        <a href={ '/locaties/' + id } className="pt-2 pb-3 px-3 bg-white rounded-lg w-full h-full block">
            { verified && <h4 className="font-display font-medium text-lg text-gray-800 -mb-1 lowercase">{ verified }</h4>}
            <h3 className="font-medium font-sans text-lg text-gray-800 mb-1">{ title }</h3>
            { capacity && <p className="text-gray-500 text-sm font-sans font-medium">{ capacity } pers.</p>}
        </a>
    )
}

export default MapPopup