import React from 'react';
import {
    compose,
    withProps,
    withState,
} from 'recompose';

import { trainPersonGroupId } from '../api/Train';

const TrainPersonGroupId = ({
    personGroupId,
    setPersonGroupId,
    ...props
}) => {
    return (
        <div>
            <h1>Train Person Group Id</h1>
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
                    personGroupId
                };

                trainPersonGroupId(params)
                    .catch(console.error);
            }}>Train Person Group Id</button>
            <br />
        </div>
    )
}

const enhance = compose(
    withState('personGroupId', 'setPersonGroupId', ''),
    withProps((props) => ({
        ...props,
        trainPersonGroupId,
    }))
);

export default enhance(TrainPersonGroupId);