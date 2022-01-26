import React from 'react';

const PageHeader = ({ title, subtitle, append }) => {
    return (
        <div className="mb-12">
            { subtitle && <h4 className="font-display font-medium text-xl lowercase mb-3 text-tt-blue-500">{ subtitle }</h4>}
            { title && <h2 className="text-4xl font-semibold text-tt-blue-700">{ title }</h2>}
            { append && append()}
        </div>
    )
}

export default PageHeader