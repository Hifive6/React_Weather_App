import React, {Component} from 'react';
import './App.css';

class App extends Component {
  
    state = {};

    getWeather = (e) => {
      e.preventDefault();
      let zipcode = e.target.value
      
      //  this.setState({[e.target.zipcode]: e.target.value})
      // console.log(zipcode)
      
      fetch(
      'https://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&appid=' + process.env.REACT_APP_OW_API + '&units=imperial') 
      .then(
        ((response) => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            let errorMessage = "Please add a valid Zipcode"
            
            return;
          }
        
          // Examine the text in the response
          response.json().then((data) => {
            console.log(data); 
            // if(zipcode === 6){
              console.log('valid zipcode')
            // } else {
            this.setState({
                  temperature: data.main.temp,
                  forecast: data.weather[0].main,
                  feels_like: data.main.feels_like,
                  name:data.name,
                  
            
                })
              // }
          // this.getTime()
          })
        })
      )
      
    
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
        this.setState({
          error:true
        })
      });
    // this.onChange = this.onChange.bind(this);
    
  }

  
  
  
  render() {
    return (
      <div className="App">
    
    <h1>Your Weather </h1>
    <div>
      <form>
        <div>{this.error ? error() : ''}</div>
      <input 
      type='text'
      value={this.state.value}
      onChange={this.getWeather} 
      placeholder='Enter Zipcode'>
      </input>
      </form>
    </div>

    <div>
      <h2 id="name">{this.state.name}</h2>
      <div id="temperature">{this.state.temperature}</div>
      <div id="forcast">{this.state.feels_like}</div>
      <div id="feels_like">{this.state.forecast}</div>
    </div>
    
    
    
    </div>
    )
  };
  
}
    const error = () => {
      return (
    <div role='alert'>
      Please Enter Valid ZipCode...!
    </div>
      )
    }



export default App;
