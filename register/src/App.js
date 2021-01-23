import React, { Component } from 'react';
import Login from './Login'
import StarParticle from './components/StarParticle'

class App extends Component {
  render() {
    return (
      <div className="App">
         <StarParticle/> 
        <Login/>
      </div>
    );
  }
}

export default App;
