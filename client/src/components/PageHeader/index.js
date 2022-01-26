import React from 'react';

const PageHeader = ({ title, subtitle }) => {
    return (
        <div className="mb-12">
            { subtitle && <h4 className="font-display font-medium text-xl lowercase mb-1 text-gray-800">{ subtitle }</h4>}
            { title && <h2 className="text-4xl font-semibold text-gray-700">{ title }</h2>}
        </div>
    )
}

export default PageHeader