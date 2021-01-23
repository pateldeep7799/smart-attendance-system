import React from 'react';
import {
    compose,
    withProps,
    withState,
} from 'recompose';
import { createPerson } from '../api/Person';

const CreatePersonForm = ({
    personName,
    personGroupId,
    lastCreatedPersonId,
    setPersonName,
    setPersonGroupId,
    setLastCreatedPersonId,
    ...props
}) => {
    return (
        <div>
            <h1>Create Person into Person Group</h1>
            <label>
                Person Group Id
                <input
                    value={personGroupId}
                    onChange={e => setPersonGroupId(e.target.value)}
                />
            </label>
            <br />
            <label>
                Person Name
                <input
                    value={personName}
                    onChange={e => setPersonName(e.target.value)}
                />
            </label>
            <br />
            <br />
            <button onClick={() => {
                const params = {
                    personGroupId,
                    name: personName,
                };

                createPerson(params)
                    .then((response) => response.json())
                    .then((body) => setLastCreatedPersonId(body.personId))
                    .catch(console.error);
            }}>Create Person</button>
            <br />
            {
                lastCreatedPersonId
                    && <p>Last Created PersonId: {lastCreatedPersonId}</p>
            }
       </div>
    )  
}

const enhance = compose (
    withState('personGroupId', 'setPersonGroupId', ''),
    withState('personName', 'setPersonName', ''),
    withState('lastCreatedPersonId', 'setLastCreatedPersonId', null),
    withProps((props) => ({ 
        ...props,
        createPerson
    }))
);

export default enhance(CreatePersonForm);