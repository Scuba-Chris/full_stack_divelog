import React from 'react';
import axios from 'axios';


const url = 'http://64.225.121.236:8000/api/';


class LoginForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.obtainToken = this.obtainToken.bind(this);
    }

    // changeHandler = event => {
    //     this.setState({
    //         [event.target.name] : event.target.value
    //     })
    // }

    changeHandler(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    async obtainToken(event){
        event.preventDefault();

        try{
            console.log('attempting a token')
            const response = await axios.post( url + 'token/' , {
                username: this.state.username, 
                password: this.state.password,
            });
            console.log(response.data)
            this.props.onSuccess(response.data);
        } catch (error) { console.error('well then...', error )}
    }

    render(){
        return (
            <>
                <form onSubmit={this.obtainToken} className='loginForm'>
                    <input name='username' type='text' value={this.state.username} placeholder='username' onChange={this.changeHandler} />
                    <input name='password' type='password' value={this.state.password} placeholder='password' onChange={this.changeHandler} />
                    <button>submit</button>
                </form>
            </>
        )
    }
}

export default LoginForm