const axios = require('axios');

const resolveFeatureContextTypeName = (contextLabel) => {
    return {
        'postcode': 'zip',
        'place': 'city'
    }[contextLabel] || contextLabel;
}

const resolveFeatureContext = (context) => {
    console.log(context)
    const features = context.reduce((acc, item) => {
        const [ type ] = item.id.split('.');
        return { ...acc, [resolveFeatureContextTypeName(type)]: item.text };
    }, {});
    
    return features;
}

const geocode = async (query) => {
    try {
        const data = await axios({
            method: 'get',
            url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + query + '.json',
            params: {
                access_token: 'pk.eyJ1IjoianVuZy1nZW50IiwiYSI6ImNreXZmdjZveTFxZzYybnRnOTkwdzVkM2MifQ.4cmT6X8MlQfeDR04WbivKw',
                country: 'be,nl',
                language: 'nl',
                limit: 1,
            }
        })
        
        const feature = data?.data?.features?.[0]
        const context = feature?.context;
        const resolvedContext = resolveFeatureContext(context);
        
        return {
            street: feature?.text,
            number: feature?.address,
            ...resolvedContext
        }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    geocode
}