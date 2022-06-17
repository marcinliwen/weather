import PrintDate from './PrintDate'

type Props = {
    alert:{
        description: string,
    start: number,
    end: number,
    sender_name: string
    }
    
}

const Alert:React.FC<Props> = (props) =>{
    console.log(props.alert)
    const {alert} = props;
    return(
        <div className='alert-item max-w-md mx-auto text-white py-6'>
            <h2 className='center text-3xl'>ALERT!</h2>
            <p className='flex justify-center gap-2 mt-4 mx-auto'><PrintDate timecode={alert.start} onlydate={true}/> - <PrintDate timecode={alert.end} onlydate={true}/></p>
            <p className='mt-4 text-xl'>{alert.description}</p>
            <p className='text-sm mt-4'>spource: {alert.sender_name}</p>
        </div>
    )
}

export default Alert;