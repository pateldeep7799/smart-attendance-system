import React from 'react';
import {
    compose,
    withProps,
    withState,
} from 'recompose';

import { addPersonFace } from '../api/Person';

const AddPersonFaceForm = ({
    url,
    personId,
    personGroupId,
    lastCreatedPersistedFaceId,
    setUrl,
    setPersonId,
    setPersonGroupId,
    setLastCreatedPersistedFaceId,
    addPersonFace,
    ...props
}) => {
    return (
        <div>
            <h1>Add Person Face</h1>
            <label>
                Person Group Id
                <input
                    value={personGroupId}
                    onChange={e => setPersonGroupId(e.target.value)}
                />
            </label>
            <br />
            <label>
                Person Id
                <input
                    value={personId}
                    onChange={e => setPersonId(e.target.value)}
                />
            </label>
            <br />
            <label>
                Photo Url
                <input
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />
            </label>
            <br />
            <button onClick={() => {
                const params = {
                    url,
                    personId,
                    personGroupId,
                };

                addPersonFace(params)
                    .then((response) => response.json())
                    .then((body) => setLastCreatedPersistedFaceId(body.persistedFaceId))
                    .catch(console.error);
            }}>Add Face</button>
            <br />
            {
                lastCreatedPersistedFaceId
                    && <p>Last Created PersistedFaceId: {lastCreatedPersistedFaceId}</p>
            }
       </div>
    )  
}

const enhance = compose (
    withState('url', 'setUrl', ''),
    withState('personId', 'setPersonId', ''),
    withState('personGroupId', 'setPersonGroupId', ''),
    withState('lastCreatedPersistedFaceId', 'setLastCreatedPersistedFaceId', null),
    withProps((props) => ({ 
        ...props,
        addPersonFace,
    }))
);

export default enhance(AddPersonFaceForm);