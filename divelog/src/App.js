import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router, Switch, Route, Redirect 
} from 'react-router-dom';
import './Style.css' 
import Header from './components/Header';
import LoginForm from  './components/LoginForm'
// import Footer from './components/Footer';
import DiveList from './components/DiveList'
import DiveDetails from './components/DiveDetails'


const url = 'http://64.225.121.236:8000/api/v1/divelog/';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      accessToken :'',
      refreshToken : '',
      dives :  null,
    }
    this.loginHandler = this.loginHandler.bind(this);
    this.createHandler = this.createHandler.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.renderDiveDetails = this.renderDiveDetails.bind(this);
  }

  async loginHandler({access, refresh}){
    this.setState({
      accessToken : access,
      refreshToken : refresh,
    });
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${this.state.accessToken}`
        }
      }
      const respnose = await axios.get(url, headers);
      this.setState({ dives: respnose.data })
    } catch ( error ){
      console.error('well then....')
    }
  }

  async createHandler(data){
    const headers = {
      headers: {
        Authorization: `Bearer ${this.state.accessToken}`
      }
    }
    console.log('url', url)
    console.log('data', data)
    const response = await axios.post( url, data, headers);
    this.setState({ dives: this.state.dives.concat(response.data)})
  }

  async updateHandler(data){
    const headers = {
      headers: {
        Authorization: `Bearer ${this.state.accessToken}`
      }
    }
    const path = `${url}v1/${data.id}/`;
    const respnose = await axios.put( path, data, headers );

    console.log(respnose.data)


    this.setState({
      dives : this.state.dives.map(dive => {
        if (dive.id === data.id) {
          return data
        } else {
          return dive;
        }
      })
    })
  }

  async deleteHandler(id){
    const headers = {
      headers : { Authorization: `Bearer ${this.state.accessToken}`}
    }
    const path = `${url}${id}/`;
    const respnose = await axios.delete(path, headers);

    console.log(respnose.data)

    this.setState({ dives : this.state.dives.filter(dive => dive.id !== id)})
  }

  renderDiveDetails(props){
    if(!this.state.accessToken){
      return <Redirect to='/' />
    }
    const diveId= parseInt(props.match.params.id);
    const dive = this.state.dives && this.state.dives.find(dive => dive.id === diveId);

    if(dive){
      return <DiveDetails dive={dive} onSubmit={this.updateHandler} onDelete={this.deleteHandler} />
    } else {
      return <Redirect to='/' />
    }
  }

  render(){
    return(
      <Router>
        <div className='App'>
          <Header />
          <Switch>
            <Route exact path='/'>
              {this.state.dives ? 
                <DiveList dives={this.state.dives} onSubmit={this.createHandler} /> : 
              <LoginForm onSuccess={this.loginHandler} /> }
            </Route>

            <Route path='/:id/' render={this.renderDiveDetails} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
