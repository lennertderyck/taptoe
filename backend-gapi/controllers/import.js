const fetch = require('node-fetch');
const { Tribe } = require('../mongo');
const { geocode } = require('../utils/mapbox');

const startImport = async (parent, args, context, info) => {
    const currentUserId = context.userId;
    
    const result = await geocode('Europalaan 2 Destelbergen');
    
    const req = await fetch("https://zelfkook.cjt.be/umbraco/api/search/get", {
      "headers": {
        "accept": "*/*",
        "accept-language": "nl-BE,nl-NL;q=0.9,nl;q=0.8,en-US;q=0.7,en;q=0.6,la;q=0.5",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "pragma": "no-cache",
        "sec-ch-ua": "\"(Not(A:Brand\";v=\"8\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest"
      },
      "referrer": "https://zelfkook.cjt.be/nl/zoekresultaten/?nameFocus=false&locationFocus=false&longitude=4.819032812500033&latitude=50.70533189571492&tentsHover=false&locationVisible=false&locationExtra=false&startDateVisible=false&endDateVisible=false&nrVisible=false&nrExtra=false&searchName=false&selectedName=false&hoverIndex=0&sortBy=Locatie&sortAsc=true&nrOfRooms=1&nrOfRoomsEnabled=true&nrOfSleepingRooms=1&nrOfSleepingRoomsEnabled=true&startLatitude=47.62486541995219&startLongitude=0.8639546875000326&endLatitude=53.595930171917516&endLongitude=8.774110937500032&zoom=7",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "{\"nameFocus\":false,\"locationFocus\":false,\"longitude\":4.819032812500033,\"latitude\":50.70533189571492,\"hasCoords\":true,\"tentsHover\":false,\"nr\":0,\"locationVisible\":false,\"locationExtra\":false,\"startDateVisible\":false,\"endDateVisible\":false,\"nrVisible\":false,\"nrExtra\":false,\"selectedLocation\":false,\"searchName\":false,\"selectedName\":false,\"hoverIndex\":0,\"sortBy\":\"Locatie\",\"sortAsc\":true,\"nrOfRooms\":\"1\",\"nrOfRoomsEnabled\":true,\"nrOfSleepingRooms\":\"1\",\"nrOfSleepingRoomsEnabled\":true,\"typesErkenning\":[],\"startLatitude\":47.62486541995219,\"startLongitude\":0.8639546875000326,\"endLatitude\":53.595930171917516,\"endLongitude\":8.774110937500032,\"zoom\":7}",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });
    
    const data = await req.json();
    const geocodedAddresses = await Promise.all(data.map(async r => {
      const query = `${r.straat} ${r.postcode} ${r.gemeente}`;
      const geocodeResult = await geocode(query);
      
      return await {
        ...r,
        address: geocodeResult
      }
    }));
    
    // Location.create({
    //     creator: currentUserId,
    //     name: e.naam,
    //     latitude: e.latitude,
    //     longitude: e.longitude,
    // })
    
    return geocodedAddresses
}

module.exports = {
    startImport
}