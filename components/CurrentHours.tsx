
type Props ={
    hourlyForecast:{
        dt: number,
        temp: number
    }[],
    currentDate: number
}

const CurrentHours:React.FC<Props> = (props) =>{
    
    const{hourlyForecast}=props;
    
    const hourly_row = hourlyForecast.slice(24).filter(item => item.dt > (props.currentDate - 3600 ))
    
    const printHour = (time:number) => new Date(time*1000).getHours();
    
    return(
        <div className="mx-8  md:max-w-md md:mx-auto ">
            <h2 className="text-sm text-left">Prognoza godzinowa</h2>
           <div className="flex overflow-auto my-2 pb-4 max-w-md md:mx-auto">
           {hourly_row && hourly_row.map((item)=>(
            <div key={item.dt} className="flex flex-col gap-1 basis-[40px] shrink-0 ">
                <span>{printHour(item.dt) === printHour(props.currentDate) ? 'teraz' : new Date(item.dt*1000).getHours()}</span>
                <span>{Math.round(item.temp)}<sup>o</sup></span>
            </div>
           ))}
           </div>
        </div>
    )
}

export default CurrentHours