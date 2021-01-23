import React from 'react';
import {
    compose,
    withProps,
    withState,
} from 'recompose';

import { identifyFace } from '../api/Identify';

const IdentifyFaceForm = ({
    faceIds,
    identifyAttributes,
    personGroupId,
    setFaceId,
    setPersonGroupId,
    setIdentifyAttributes,
    ...props
}) => {
    return (
        <div>
            <h1>Identify Face</h1>
            <label>
                Person Group Id
                <input
                    value={personGroupId}
                    onChange={e => setPersonGroupId(e.target.value)}
                />
            </label>
            <br />
            <label>
                Face Id
                <input
                    value={faceIds}
                    onChange={e => setFaceId(e.target.value)}
                />
            </label>
            <br />
            <button onClick={() => {
                const params = { 
                    faceIds,
                    personGroupId,
                };

                identifyFace(params)
                    .then((response) => response.json())
                    .then((body) => setIdentifyAttributes(body[0].candidates[0].personId))
                    .catch(console.error());
            }}>Identify Face</button>
            <br />
            {
                identifyAttributes
                    && <p>Candidate FaceId: {identifyAttributes}</p>
            }
       </div>
    )  
}

const enhance = compose (
    withState('faceIds', 'setFaceId', ''),
    withState('personGroupId', 'setPersonGroupId', ''),
    withState('identifyAttributes', 'setIdentifyAttributes', null),
    withProps((props) => ({ 
        ...props,
        identifyFace,
    }))
);

export default enhance(IdentifyFaceForm);