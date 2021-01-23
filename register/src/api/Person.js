import face from './Face';

const getPersonsUrlByGroupId = (personGroupId) => {
    return `/face/v1.0/persongroups/${personGroupId}/persons`;
};

const getPersonUrl = (personGroupId, personId) => {
    return `/face/v1.0/persongroups/${personGroupId}/persons/${personId}/persistedFaces`;
};

const createPerson = ({
    name,
    userData,
    personGroupId,
}) => {
    const url = getPersonsUrlByGroupId(personGroupId);
    const body = JSON.stringify({ name, userData });

    return face.post(url, body);
};

const addPersonFace = ({
    personGroupId,
    personId,
    url,
}) => {
    const requestUrl = getPersonUrl(personGroupId, personId);
    const body = JSON.stringify({ url });

    return face.post(requestUrl, body);   
}

export {
    createPerson,
    addPersonFace,
}



