import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import DetialCard from './DetialCard';
import {BrowserRouter, Route} from 'react-router-dom';
import HourlyCard from './HourlyCard';

class App extends Component {
   
   setDate = (day) =>{
    const currentDate = new Date()
    return currentDate.setDate(currentDate.getDate() - day);
   }
   setDay = (day) =>{
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - day)
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var dayOfWeek = days[currentDate.getDay()]
    console.log("in day",dayOfWeek)
    return dayOfWeek;
   }
   setFormat = (date)=>{
    var d = new Date(date);
    var monthNames = new Array("January", "February", "March", 
    "April", "May", "June", "July", "August", "September", 
    "October", "November", "December");
    var cDate = d.getDate();
    var cMonth = d.getMonth();
    // var cYear = date.getFullYear();
    
    var cHour = d.getHours();
    var cMin = d.getMinutes();
    var ampm = cHour >= 12 ? 'pm' : 'am';
    // var cSec = date.getSeconds();
    
     console.log("formatted date", monthNames[cMonth] + " " +cDate  + " " +cHour+ ":" + cMin + " "+ampm);
    return monthNames[cMonth] + " " +cDate  + " " +cHour+ ":" + cMin + " " + ampm;
   }
   state = {
    response: null,
    zone: null,
    allWeatherData: [
      {
      day: this.setDay(4),
      date: this.setDate(4),
      weatherData: null
      },
      {
      day: this.setDay(3),
      date: this.setDate(3),
      weatherData: null
      },
      {
      day: this.setDay(2),
      date: this.setDate(2),
      formattedDate: null,
      weatherData: null
      },
      {
      day: this.setDay(1),
      date: this.setDate(1),
      formattedDate: null,
      weatherData: null
      },
      {
      day: this.setDay(0),
      date: this.setDate(0),
      formattedDate: null,
      weatherData: null
      }

    ]
   }

  componentDidMount(){
    this.state.allWeatherData.map((dataByDay, index)=>{
          const historicDatesUrl = 'http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=20.59&lon=78.96&units=imperial&dt='+Math.floor(Number(dataByDay.date)/1000)+'&appid=f668114c1c939b3a09bb987b13a883ff';
          return axios.get(historicDatesUrl)
               .then(response =>{
                 let storedState = [...this.state.allWeatherData]
                 storedState[index].weatherData = response.data;     
                    this.setState({zone:response.data.timezone});
                    const formattedDateValue = this.setFormat(dataByDay.date)
                    storedState[index].weatherData.formattedDate = formattedDateValue;
                    this.setState({weatherData: storedState})

               })
        })
  }
  
  render() {
    let detailCard = (
       <div>
          {this.state.allWeatherData.map((dataByDay, index)=>{ 
                  return  <DetialCard className="Wrapper" key={index} day={dataByDay.day} date={dataByDay.formattedDate} weatherData={dataByDay.weatherData} />
        })}
       </div>
     
     )

    return (
      <BrowserRouter>
      <div className="Main">
        <header className="Header">5-Day Forecast</header>  
        <p className="Zone">{this.state.zone}</p> 
        <Route path="/" exact component={()=>detailCard}/>
        <Route path="/hourly/:data" exact component={HourlyCard}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
