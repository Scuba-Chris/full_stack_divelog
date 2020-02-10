import React from 'react';
import { Link } from 'react-router-dom';
import DiveForm from './DiveForm';


export default props => (
    <>
        <Link to='/'><p>Dive List</p></Link>
        <button onClick={() => props.onDelete(props.dive.id)}>Delete</button>
        <DiveForm onSubmit={props.onSubmit} dive={props.dive} />
    </>
)