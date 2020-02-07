import React from 'react';


class DiveForm extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            siteName : props.dive.title,
            diveDescription : props.dive.body,
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    static defaultProps = {
        dive: {
            title : '',
            body : '',
        }
    }

    changeHandler(event){
        this.setState({ [event.target.name] : event.target.value })
    }

    submitHandler(event){
        event.preventDefault();
        const data = { author : 1, title : this.state.siteName, body : this.state.diveDescription}
        this.props.onSubmit(data);
        this.setState({ siteName : '', diveDescription : '', })

    }

    render() {
        return(
            <>
                <form onSubmit={this.submitHandler}>
                    <fieldset>
                        <legend>Dive</legend>
                        <p>Site Name: 
                        <input 
                            name='siteName' 
                            type='text' 
                            placeholder={this.props.dive ? this.props.dive.title : 'Site name' } 
                            value={this.state.siteName} 
                            onChange={this.changeHandler} 
                        />
                        </p>
                        <br/>
                        <p>Dive description:
                        <textarea 
                            name='diveDescription' 
                            type='text' 
                            placeholder= {this.props.dive ? this.props.dive.body : 'Dive description' }
                            value={this.state.diveDescription} 
                            onChange={this.changeHandler} 
                        />
                        </p>
                        <br />
                        <button>Add dive</button>
                    </fieldset>
                </form>
            </>
        )
    }



}

export default DiveForm