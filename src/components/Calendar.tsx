import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function MiniCalendar() {
    return(
        <div className="flex items-center justify-center">
        <div className="flex space-x-2 w-1/2 rounded-lg px-5 py-5" aria-label="dashboard note"> 
            <Calendar />
            <p></p>
        </div>
        </div>
    );
}