import React from 'react';


const hourlyCard = (props) =>{
    const setFormat = (date)=>{
        var d = new Date(date);
        var cHour = d.getHours();
        var cMin = d.getMinutes();
        var ampm = cHour >= 12 ? 'pm' : 'am';
        
        return cHour+ ":" + cMin + " " + ampm;
       }

       return (
        <div>
        { props.location.hourlyData ?
        <div>
        <p className="HourlyDay">{props.location.day} - {props.location.hourlyData.formattedDate}</p>
        {/* <p className="HourlyDay">{props.location.hourlyData.formattedDate}</p> */}
        { props.location.hourlyData.hourly.map((dataByHour, index)=>{ 
            return <div className="Card" key={index}>
                    <p className="FormattedDate">{setFormat(dataByHour.dt)}</p>
                    <img src={'http://openweathermap.org/img/wn/'+dataByHour.weather[0].icon+'@2x.png'} alt="No icon found!"/>
                    <p className="Day">{dataByHour.temp} <span>&#8457;</span></p>
                    <p>{dataByHour.weather[0].description}</p>
                    </div>
                    })}
                    </div>:null
                    }
        </div>
    );
}
export default hourlyCard;