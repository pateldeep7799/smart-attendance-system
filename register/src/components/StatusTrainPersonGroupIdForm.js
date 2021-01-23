import React from 'react';
import {
    compose,
    withProps,
    withState,
} from 'recompose';

import { statusTrainPersonGroupId } from '../api/Train';

const StatusTrainPersonGroupId = ({
    personGroupId,
    trainPersonGroupStatus,
    setTrainPersonGroupStatus,
    trainPersonGroupId,
    setPersonGroupId,
    ...props
}) => {
    return (
        <div>
            <h1>Status Train Person Group Id</h1>
            <label>
                Person Group Id
                <input
                    value={personGroupId}
                    onChange={e => setPersonGroupId(e.target.value)}
                />
            </label>
            <br />
            <button onClick={() => {
                const params = {
                    personGroupId,
                };

                statusTrainPersonGroupId(params)
                    .then((response) => response.json())
                    .then((body) => setTrainPersonGroupStatus(body.status))
                    .catch(console.error);
            }}>Train Person Group Id</button>
            <br />
            {
                trainPersonGroupStatus
                && <p>Status: {trainPersonGroupStatus}</p>
            }
        </div>
    )
}

const enhance = compose(
    withState('personGroupId', 'setPersonGroupId', ''),
    withState('trainPersonGroupStatus', 'setTrainPersonGroupStatus', null),
    withProps((props) => ({
        ...props,
        statusTrainPersonGroupId,
    }))
);

export default enhance(StatusTrainPersonGroupId);