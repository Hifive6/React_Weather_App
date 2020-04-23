import React, {Component} from 'react';

import './App.css';
const APIKEY = '2c86b8e9b118e71a75326c043e5ec819'



class App extends Component {
  
    state = {
      zipcode: '',
    }

    getWeather = (e) => {
      e.preventDefault();
      let zipcode = e.target.value
      //  this.setState({[e.target.zipcode]: e.target.value})
      // console.log(zipcode)
      
      fetch(
      'https://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&appid=' + APIKEY) 
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
    
          // Examine the text in the response
          response.json().then((data) => {
            console.log(data.name);
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
      // this.onChange = this.onChange.bind(this);
    
  }
    
    
    
  render() {
  return (
    <div className="App">
    
    <h1>Your Weather </h1>
    <div>
      
      <input 
      type='text'
      value={this.state.value}
      onChange={this.getWeather} 
      placeholder='Enter Zipcode'>
      </input>
      <button 
      onClick={this.onClick}
      >Search ZipCode</button>
    </div>
    
    
    
    </div>
    )
  };
 
 }



export default App;
