import React from 'react';


class DiveForm extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            siteName : props.dive.siteName,
            diveDescription : props.dive.diveDescription,
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    static defaultProps = {
        dive: {
            siteName : '',
            diveDescription : '',
        }
    }

    changeHandler(event){
        this.setState({ [event.target.name] : event.target.value })
    }

    submitHandler(event){
        event.preventDefault();
        const data = {...this.state}
        this.props.onSubmit(data);
        this.setState({ siteName : '', diveDescription : '', })

    }

    render() {
        return(
            <>
                <form onSubmit={this.submitHandler}>
                    <fieldset>
                        <legend>Dive</legend>
                        <input name='siteName' type='text' placeholder='Site name' value={this.state.siteName} onChange={this.changeHandler} />
                        <textarea name='diveDescription' type='text' placeholder='Dive description' value={this.state.diveDescription} onChange={this.changeHandler} />
                        <button>Add dive</button>
                    </fieldset>
                </form>
            </>
        )
    }



}

export default DiveForm