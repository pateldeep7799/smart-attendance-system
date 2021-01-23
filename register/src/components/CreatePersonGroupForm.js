import React from 'react';
import {
    compose,
    withProps,
    withState,
  } from 'recompose';
import { createPersonGroup } from '../api/PersonGroup';

const CreatePersonGroupForm = ({
    personGroupName,
    personGroupId,
    lastCreatedPersonGroupId,
    setPersonGroupName,
    setPersonGroupId,
    setLastCreatedPersonGroupId,
    ...props
}) => {
    return (
        <div>
            <h1>Create Person Group</h1>
            {console.log(process.env.REACT_APP_AZURE_FACE_API)}
            <label>
                Person Group Id
                <input
                    value={personGroupId}
                    onChange={e => setPersonGroupId(e.target.value)}
                />
            </label>
            <br />
            <label>
                Person Group Name
                <input
                    value={personGroupName}
                    onChange={e => setPersonGroupName(e.target.value)}
                />
            </label>
            <br />
            <br />
            <button onClick={() => {
                const params = {
                    name: personGroupName,
                    id: personGroupId
                };

                createPersonGroup(params)
                    .then(() => setLastCreatedPersonGroupId(personGroupId))
                    .catch(console.error);
            }}>
                Create Person Group
            </button>
            <br />
            {
                lastCreatedPersonGroupId
                    && <p>Last Created PersonGroupId: {lastCreatedPersonGroupId}</p>
            }
       </div>
    )  
}

const enhance = compose (
    withState('personGroupId', 'setPersonGroupId', ''),
    withState('personGroupName', 'setPersonGroupName', ''),
    withState('lastCreatedPersonGroupId', 'setLastCreatedPersonGroupId', null),
    withProps((props) => ({ 
        ...props,
        createPersonGroup
    }))
);

export default enhance(CreatePersonGroupForm)