import React from 'react';
import {Link} from 'react-router-dom';

const detailCard = (props) =>{
    console.log("data in dteail",props.day, props.date,props.weatherData)
    return (
    <Link to={{ 
        pathname: '/hourly/'+props.day,
        hourlyData: props.weatherData,
        day: props.day, 
    }}> 
    <div className="Card">
    <p className="Day">{props.day}</p>
    { props.weatherData ?
    <div>
    <p className="FormattedDate">{props.weatherData.formattedDate}</p>
    <img src={'http://openweathermap.org/img/wn/'+props.weatherData.current.weather[0].icon+'@2x.png'} alt="No icon found!" />
    <p className="Day">{props.weatherData.current.temp} <span>&#8457;</span></p>
    <p>{props.weatherData.current.weather[0].description}</p>
    </div>
    :null
    }
    </div>
    </Link>
    );
}
export default detailCard;
