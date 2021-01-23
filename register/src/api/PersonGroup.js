import face from './Face';

const personGroupBaseUrl = '/face/v1.0/persongroups/';

const createPersonGroup = ({
    id,
    name,
    userData,
}) => {
    const url = `${personGroupBaseUrl}${id}`;
    const body = JSON.stringify({ name, userData, id });
    console.log(body)
    return face.put(url, body);
};

export {
    createPersonGroup
}
