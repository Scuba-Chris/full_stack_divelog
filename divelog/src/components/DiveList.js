import React from 'react';
import { Link } from 'react-router-dom';

import DiveForm from './DiveForm';


export default props => (
    <>
        <h2>Dives</h2>
        <ul>
            {props.dives.map(dive => <DiveItem key={dive.id} dive={dive} /> )}
        </ul>
        <DiveForm onSubmit={props.onSubmit} />
    </>
)

const DiveItem = props => (
    <li>
        <Link to={`/${props.dive.id}`}>
            <p>{props.dive.siteName}</p>
        </Link>
    </li>
)
