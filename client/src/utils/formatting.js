export const formatLink = (url) => {
    const link = new URL(url);
    return link.host
}

export const formatMapboxLookup = (featureArray) => {
    const address = featureArray.find(feature => {
        return feature.place_type[0] === "address"
    })
        
    const result = address.context.reduce((acc, item) => {
        const itemLabel = item.id.split('.')[0];
        
        return {
            ...acc,
            [itemLabel]: item.text
        }
    }, {})
    
    return {
        ...result,
        number: parseInt(address.address),
        street: address.text
    };
    
    // return featureArray.reduce((acc, item) => {
    //     return {
    //         ...acc,
    //         [item.place_type[0]]: 
    //     }
    // }, {})
}

export const formatGoogleMapsSearchLink = (address) => {
    const queryParams = Object.values(address).join(' ');
    const link = new URL('https://www.google.com/maps/search/');
    link.searchParams.set('api', '1');
    link.searchParams.set('query', queryParams);
    return link.toString();
}

export const formatPinType = (pinType) => {
    return {
        'Location': {
            url: '/locaties',
            label: 'Locatie'
        },
        'Tribe': {
            url: '/tribes',
            label: 'Tribe'
        },
    }[pinType]
}