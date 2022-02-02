export const generateStaticMapUri = (lat = 51.0573704, lng = 3.7656905, zoom = 15) => {
    return `
        https://api.mapbox.com/styles/v1/jung-gent/ckyvgir91003215o2o2rfk4wy/static/${ lng },${ lat },${ zoom },0/1000x500@2x?access_token=pk.eyJ1IjoianVuZy1nZW50IiwiYSI6ImNreXZmdjZveTFxZzYybnRnOTkwdzVkM2MifQ.4cmT6X8MlQfeDR04WbivKw
    `
}