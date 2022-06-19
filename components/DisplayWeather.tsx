import {useState, useEffect} from 'react'
import PrintDate from './PrintDate'
import PrintTime from './PrintTime'
import Alert from './Alert'
import Daily from './Daily'
import CurrentHours from './CurrentHours'

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
        }[],
    daily:{
        dt:number,
        temp:{
            morn:number,
            day:number,
            eve:number,
            night:number
        }
    }[],
    hourly:{
        dt: number,
        temp: number
    }[]
}


const DisplayWeather: React.FC<Location> = ({location}) =>{
    
    const [ weatherData, setWeatherdata] = useState<WeatherData | undefined>(undefined)
    
    useEffect(()=>{
        const fetchData = async () =>{
            await fetch(`${WEATHER_API_BASE}lat=${location.lat}&lon=${location.lon}&exclude=minutely&appid=${WEATHER_API_KEY}${WEATHER_API_UNITS}&lang=PL`)
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
      {/* <br />  {weatherData &&<PrintTime timecode={weatherData.current.dt}/>} */}
        </p>
         
         {weatherData && <p className='text-5xl my-4 temp shadow-xl'>{Math.round(weatherData.current.temp)}<sup>o</sup> </p>}
         {weatherData && <p className='text-2xl cap mb-6 '>{weatherData.current.weather[0].description} </p> }
         {weatherData?.hourly && <CurrentHours hourlyForecast={weatherData.hourly} currentDate={weatherData.current.dt}/>}
         {weatherData && <p>Wschód słońca: <PrintTime timecode={weatherData.current.sunrise} /></p>}
         {weatherData && <p>Zachód słońca: <PrintTime timecode={weatherData.current.sunset} /></p>}
         {weatherData && <p>Ciśnienie: {weatherData.current.pressure}hPa</p>}
        {weatherData?.alerts && <div className='bg-red-400 my-12'>{weatherData.alerts.map((item)=>(<Alert key={item.start} alert={item} />))}</div>}
        {weatherData?.daily && 
        <div className='max-w-md mx-auto my-12'>
            <h2 className='text-left text-sm mx-8 mb-2'>Prognoza na 7 dni.</h2>
            <div className='flex flex-col gap-2'>
                {weatherData.daily.slice(1).map((item)=>(<Daily key={item.dt} weather={item} />))}
            </div>
        </div>
        }
        </>
    )
}

export default DisplayWeather