import face from './Face';

const getPersonsUrlByGroupId = (personGroupId) => {
    return `/face/v1.0/persongroups/${personGroupId}`;
};

const statusTrainPersonGroupId = ({
    personGroupId,
}) => {
    const url = `${getPersonsUrlByGroupId(personGroupId)}/training`;
    return face.get(url)
};

const trainPersonGroupId = ({
    personGroupId
}) => {
    const url = `${getPersonsUrlByGroupId(personGroupId)}/train`;
    return face.post(url)
};

export {
    statusTrainPersonGroupId,
    trainPersonGroupId
}