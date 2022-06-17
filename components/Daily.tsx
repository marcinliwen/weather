import PrintDate from './PrintDate'

interface Props{
    weather:{
        dt:number,
        temp:{
            morn:number,
            day:number,
            eve:number,
            night:number
        }
    }
}

const Daily:React.FC<Props> = (props)=>{
    return(
        <div className='py-2 px-8 flex gap-2 items-center bg-white odd:bg-gray-100'>
            <p className='text-left text-sm no-br w-[112px]'><PrintDate timecode={props.weather.dt}  /></p>
            <p className='text-sm md:w-[50px]'>ranek: {Math.round(props.weather.temp.morn)}<sup>o</sup> </p>
            <p className='text-sm md:w-[50px]'>dzień: {Math.round(props.weather.temp.day)}<sup>o</sup> </p>
            <p className='text-sm md:w-[50px]'>wieczór: {Math.round(props.weather.temp.eve)}<sup>o</sup> </p>
            <p className='text-sm md:w-[50px]'>noc: {Math.round(props.weather.temp.night)}<sup>o</sup> </p>
        </div>
    )
}

export default Daily;