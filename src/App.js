import React, { Component } from 'react';
import './App.css';
import uuid from 'uuid';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAAGBCJeEf8fGH9MSaM3uDwWDkgWDTIDdE",
    authDomain: "simplesurvey-bc517.firebaseapp.com",
    databaseURL: "https://simplesurvey-bc517.firebaseio.com",
    storageBucket: "simplesurvey-bc517.appspot.com",
    messagingSenderId: "948177600422"
  };

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid.v1(),
      name: '',
      answers: {
        q1: '',
        q2: '',
        q3: '',
        q4: ''
      },
      submitted: false
    }
    this.handleQustionChange = this.handleQustionChange.bind(this);
  }

  handleNameSubmit(event){
    var name = this.refs.name.value;
    this.setState({name: name}, function(){
      console.log(this.state)
    });
    event.preventDefault();
  }

  handleQuestionSubmit(event){
    firebase.database().ref('surveys/'+this.state.id).set({
      name: this.state.name,
      answers: this.state.answers
    });
    this.setState({submitted: true}, function(){
      console.log('Questions Submitteing...')
    })
    event.preventDefault();

  }

  handleQustionChange(event){
    var answers = this.state.answers;
    if(event.target.name === 'q1'){ 
      answers.q1 = event.target.value;
    } else if(event.target.name === 'q2'){
      answers.q2 = event.target.value;
    } else if(event.target.name === 'q3'){
      answers.q3 = event.target.value;
    } else if(event.target.name === 'q4'){
      answers.q4 = event.target.value;
    }
    this.setState({answers: answers}, function(){
      console.log(this.state)
    })
  }

  render() {
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false){
      user = <h2>Welcome {this.state.name}</h2>
      questions = <span>
        <h3>Survey Questions</h3>
        <form onSubmit={this.handleQuestionSubmit.bind(this)}>
          <div>
            <label>What is your favorite operating system?</label><br />
            <input type="radio" name="q1" value="Windows" onChange={this.handleQustionChange}/>Windows<br />
            <input type="radio" name="q1" value="OSX" onChange={this.handleQustionChange}/>OSX<br />
            <input type="radio" name="q1" value="Linux" onChange={this.handleQustionChange}/>Linux<br />
            <input type="radio" name="q1" value="Solaris" onChange={this.handleQustionChange}/>Solaris<br />
            <input type="radio" name="q1" value="Other" onChange={this.handleQustionChange}/>Other<br />
          </div>
          <div>
            <label>What is your favorite brand of TV?</label><br />
            <input type="radio" name="q2" value="Sony" onChange={this.handleQustionChange}/>Sony<br />
            <input type="radio" name="q2" value="Samsung" onChange={this.handleQustionChange}/>Samsung<br />
            <input type="radio" name="q2" value="Panasonic" onChange={this.handleQustionChange}/>Panasonic<br />
            <input type="radio" name="q2" value="Vizio" onChange={this.handleQustionChange}/>Vizio<br />
            <input type="radio" name="q2" value="Other" onChange={this.handleQustionChange}/>Other<br />
          </div>
          <div>
            <label>What is your favorite smartphone brand?</label><br />
            <input type="radio" name="q3" value="Apple" onChange={this.handleQustionChange}/>Apple<br />
            <input type="radio" name="q3" value="Samsung" onChange={this.handleQustionChange}/>Samsung<br />
            <input type="radio" name="q3" value="Nexus" onChange={this.handleQustionChange}/>Nexus<br />
            <input type="radio" name="q3" value="HTC" onChange={this.handleQustionChange}/>HTC<br />
            <input type="radio" name="q3" value="Other" onChange={this.handleQustionChange}/>Other<br />
          </div>
          <div>
            <label>What is your favorite running shoes?</label><br />
            <input type="radio" name="q4" value="Skechers" onChange={this.handleQustionChange}/>Skechers<br />
            <input type="radio" name="q4" value="Nike" onChange={this.handleQustionChange}/>Nike<br />
            <input type="radio" name="q4" value="Hoka One One" onChange={this.handleQustionChange}/>Hoka One One<br />
            <input type="radio" name="q4" value="Sacuony" onChange={this.handleQustionChange}/>Sacuony<br />
            <input type="radio" name="q4" value="Other" onChange={this.handleQustionChange}/>Other<br />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </span>
    } else if(!this.state.name && this.state.submitted === false){
      user = <span>
        <h2>Please enter your name to begin the survey</h2>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <input type="text" placeholder="Enter Name..." ref="name" />
        </form>
      </span>;
      questions = ''; 
    }else if(this.state.submitted === true){
      user = <h2>Thank You {this.state.name} </h2>
    }
    return (
      <div className="App">
        <div className="App-header text-center">
          <h2>Simple Survey</h2>
        </div>
        <div className="text-center">
          {user}
        </div>
        <div className="container">
          {questions}
        </div>
      </div>
    );
  }
}

export default App;
