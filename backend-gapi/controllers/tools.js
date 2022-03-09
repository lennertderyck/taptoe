const fetch = require('node-fetch');

const findIcons = async (parent, args, context, info) => {
    const { filter } = args;
    
    const srcUri = 'https://raw.githubusercontent.com/Remix-Design/RemixIcon/master/tags.json';
    
    const res = await fetch(srcUri);
    const data = await res.json();

    const { _comment, ...icons } = await data;

    const result = Object.entries(icons).reduce((acc, [key, value]) => {
        return { ...acc, ...value }
    }, {});
    
    const filteredIcons = Object.entries(result).map(([key, value]) => {
        const matches = value.some(item => item.match(filter)) || key.match(filter);
        if (matches) return key;
    }).filter(Boolean)
    
    return filteredIcons;
}

module.exports = {
    findIcons
}