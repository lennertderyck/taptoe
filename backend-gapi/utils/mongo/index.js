const transformId = (dataObject) => {
    const { _id } = dataObject;
    delete dataObject._id;
    dataObject.id = _id;
    console.log('dataObject', dataObject)
    return dataObject;
}

module.exports = {
    transformId
}