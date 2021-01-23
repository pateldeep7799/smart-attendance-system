import React from 'react';
import {
    compose,
    withProps,
    withState,
} from 'recompose';

import { detectFace } from '../api/Detect';

const DetectFaceForm = ({
    url,
    returnFaceId,
    lastDetectedFaceId,
    setUrl,
    setReturnFaceId,
    setLastDetectedFaceId,
    ...props
}) => {
    return (
        <div>
            <h1>Detect Face</h1>
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
                    returnFaceId,
                };

                detectFace(params)
                    .then((response) => response.json())
                    .then((body) => setLastDetectedFaceId(body[0].faceId))
                    .catch(console.error);
            }}>Detect Face</button>
            <br />
            {
                lastDetectedFaceId
                    && <p>Last Detected FaceId: {lastDetectedFaceId}</p>
            }
       </div>
    )  
}

const enhance = compose (
    withState('url', 'setUrl', ''),
    withState('returnFaceId', 'setReturnFaceId', ''),
    withState('lastDetectedFaceId', 'setLastDetectedFaceId', null),
    withProps((props) => ({ 
        ...props,
        detectFace,
    }))
);

export default enhance(DetectFaceForm);
