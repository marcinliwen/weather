import {useState, useEffect} from 'react'

const WEATHER_API_KEY='37402c5d1707b8228464b358ee9b8998'
const WEATHER_API_BASE='https://api.openweathermap.org/data/2.5/weather?'
const WEATHER_API_UNITS='&units=metric'


type Location = {
    location:{
        lat: number | null,
        lon: number | null
    }
}

const DisplayCity:React.FC<Location> = ({location})=>{

    const [ city, setCity] = useState<string>('')

    useEffect(()=>{
        const fetchData = async () =>{
            await fetch(`${WEATHER_API_BASE}lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API_KEY}${WEATHER_API_UNITS}`)
            .then(res => res.json())
            .then(result => {
                setCity(result.name)
                console.log(result.name);
            });
        }
        fetchData();
    }, [])
    
    return(
        <h1 className='text-4xl'>{city}</h1>
    )
}

export default DisplayCity