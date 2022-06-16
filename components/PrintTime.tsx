
type Timecode = {
    timecode: number
}

const PrintTime:React.FC<Timecode> = ({timecode}) =>{

    var currentDate = new Date(timecode*1000)
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes(); 
    

    return (<span>{currentHours < 10 ? '0' + currentHours: currentHours}:{currentMinutes < 10 ? '0' +currentMinutes : currentMinutes}</span>)
}

export default PrintTime;