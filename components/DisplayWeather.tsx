import {useState, useEffect} from 'react'
import PrintDate from './PrintDate'
import PrintTime from './PrintTime'
import Alert from './Alert'

const WEATHER_API_KEY='37402c5d1707b8228464b358ee9b8998'
const WEATHER_API_BASE='https://api.openweathermap.org/data/2.5/onecall?'
const WEATHER_API_UNITS='&units=metric'

type Location = {
    location:{
        lat: number | null,
        lon: number | null
    }
}

type WeatherData= {
    current:{
        dt: number,
        temp: number,
        sunrise: number,
        sunset: number,
        pressure: number,
        weather:[
            {
                description: string,
            }
        ],


    },
    alerts:{
            description: string,
            start: number,
            end: number,
            sender_name: string
        }[]
}


const DisplayWeather: React.FC<Location> = ({location}) =>{
    console.log(`${WEATHER_API_BASE}lat=${location.lat}&lon=${location.lon}&lang=PL&exclude=hourly,minutely&appid=${WEATHER_API_KEY}`)
    
    const [ weatherData, setWeatherdata] = useState<WeatherData | undefined>(undefined)
    
    useEffect(()=>{
        const fetchData = async () =>{
            await fetch(`${WEATHER_API_BASE}lat=${location.lat}&lon=${location.lon}&exclude=hourly,minutely&appid=${WEATHER_API_KEY}${WEATHER_API_UNITS}&lang=PL`)
            .then(res => res.json())
            .then(result => {
                setWeatherdata(result)
            });
        }
        fetchData();
    }, [])
    
    console.log(weatherData && weatherData)
    return(
        <>
        <p className='text-2xl'>
        {weatherData && <PrintDate timecode={weatherData.current.dt} month={'name'}/> } 
        </p>
         
         {weatherData && <p className='text-5xl my-4 temp shadow-xl'>{Math.round(weatherData.current.temp)}<sup>o</sup></p>}
         {weatherData && <p className='text-2xl cap mb-6 '>{weatherData.current.weather[0].description}</p> }
         {weatherData && <p>Wschód słońca: <PrintTime timecode={weatherData.current.sunrise} /></p>}
         {weatherData && <p>Zachód słońca: <PrintTime timecode={weatherData.current.sunset} /></p>}
         {weatherData && <p>Ciśnienie: {weatherData.current.pressure}hPa</p>}
        
           {/*  {weatherData && <h1 className='text-3xl'>{weatherData.name}</h1>}
           
            
         
            {weatherData.main.pressure && <p>Ciśnienie: {weatherData.main.pressure}hPa</p>} */}
        {weatherData?.alerts && <div className='bg-red-400 my-12'>{weatherData.alerts.map((item)=>(<Alert key={item.start} alert={item} />))}</div>}
        </>
    )
}

export default DisplayWeather