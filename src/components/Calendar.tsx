import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function MiniCalendar() {
    return(
        <div className="flex items-center justify-center">
        <div className="flex space-x-2 w-1/2 rounded-lg px-5 py-5" aria-label="calendar and weather"> 
            <Calendar />
            {/* Weather API goes here */}
            <p>weather goes here</p>
        </div>
        </div>
    );
}