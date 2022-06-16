import { type } from "os"

const days: string[] = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
const months: string[] = ['Stycznia', 'Lutego', 'Marca', 'Kwietnia', 'Maja', 'Czerwca', 'Lipca', 'Sierpnia', 'Września', 'Października', 'Listopada', 'Grudnia']

type Props = {
    timecode: number,
    month?: string | undefined
}

type Month = {
    month: string
}
const PrintDate: React.FC<Props> = (props) => {

    var currentDate = new Date(props.timecode * 1000)
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();

    const currentDayName = days[currentDate.getDay()];

    var currentMonthName: string | number;

    if (props.month === 'name') {
        currentMonthName = months[currentMonth];
    } else {
        currentMonthName = currentMonth < 10 ? '0' + currentMonth : currentMonth;
    }
    return (
            <span>
                <span className="text-xl">{currentDayName}</span> 
                <br />
                <span className="text-sm">
                {currentDayOfMonth < 10 ? '0' + currentDayOfMonth : currentDayOfMonth} 
                {props.month != 'name' ? '-' : ' '}
                {currentMonthName} 
                {props.month != 'name' ? '-' : ' '}
                {currentYear}
                </span>
            </span>
        )
    }

export default PrintDate;