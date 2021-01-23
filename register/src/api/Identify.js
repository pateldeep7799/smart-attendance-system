import face from './Face';

const identifyFace = ({
    faceIds,
    personGroupId,
}) => {
    faceIds = `["${faceIds}"]`;
    faceIds = faceIds.replace(/`/g, "'");
    faceIds = JSON.parse(faceIds);
    const requestUrl = '/face/v1.0/identify';
    const body = JSON.stringify({personGroupId, faceIds}) 
    return face.post( requestUrl, body );   
}

export {
    identifyFace,
}
