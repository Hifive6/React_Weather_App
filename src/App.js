import React, {Component} from 'react';
import 'bootswatch/dist/sandstone/bootstrap.min.css'
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      temperature: undefined,
      forecast: undefined,
      feels_like: undefined,
      name: undefined,
      error: false
    };

  }

    getWeather = async e => {
      e.preventDefault();
      let zipcode = e.target.value
      
      //  this.setState({[e.target.zipcode]: e.target.value})
      // console.log(zipcode)
      if(zipcode){
      fetch(
      'https://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&appid=' + process.env.REACT_APP_OW_API + '&units=imperial') 
      .then(
        ((response) => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            
            
            return;
          }
        
          // Examine the text in the response
          response.json().then((data) => {
            console.log(data); 
            // if(zipcode === 6){
              console.log('valid zipcode')
            // } else {
            this.setState({
                  temperature: "Todays Tempearture is going to be " + data.main.temp + '°F',
                  forecast: 'The Local forecast will be ' + data.weather[0].main ,
                  feels_like: 'It feels like ' + data.main.feels_like + '°F',
                  name:data.name,
                  
            
                })
              
          })
        })
      )
      
    
      // .catch(function(err) {
      //   console.log('Fetch Error :-S', err);
      //   this.setState({
      //     error: true
      //   })
      // });
    } else {
      this.setState({
        error: true
      })
    }
    
    
  }

  
  
  
  render() {
    return (
      <div className="App">
    
    <h1 className='bg-secondary'>Your Weather </h1>
    <div>
      <form className='formBox'>
        <div>{this.error ? error() : ''}</div>
      <input 
      className='inputBox'
      type='text'
      value={this.state.value}
      onChange={this.getWeather} 
      placeholder='Enter Zipcode'>
      </input>
      </form>
    </div>

    <div className='infoBox'>
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
