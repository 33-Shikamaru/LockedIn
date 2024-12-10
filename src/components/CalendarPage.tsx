import Navbar from './Navbar.tsx'
import Title from './Title.tsx'
import Calendar from './Calendar.tsx'


const CalendarPage = () => {
  return (
    <>
    <Title />
    <Navbar />
      <div className="flex items-center justify-center m-10">
        <Calendar />
      </div>
    </>
  )
}

export default CalendarPage
