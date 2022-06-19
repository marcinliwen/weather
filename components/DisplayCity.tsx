import { stringify } from 'querystring'
import {useState, useEffect} from 'react'

const WEATHER_API_KEY='37402c5d1707b8228464b358ee9b8998'
const WEATHER_API_BASE='http://api.openweathermap.org/geo/1.0/reverse?'


type Location = {
    location:{
        lat: number | null,
        lon: number | null
    }
}

type City = {
    name: string,
    country: string
}
const DisplayCity:React.FC<Location> = ({location})=>{

    const [ city, setCity] = useState<City>({name: '', country: '' })

    useEffect(()=>{
        const fetchData = async () =>{
            await fetch(`${WEATHER_API_BASE}lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API_KEY}&limit=1`)
            .then(res => res.json())
            .then(result => {
                setCity(result[0])
                console.log(result);
            });
        }
        fetchData();
    }, [])
    
    return(
        <h1 className='text-4xl'>{city.name},{city.country}</h1>
    )
}

export default DisplayCity