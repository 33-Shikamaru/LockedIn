import { useState } from 'react'
import Navbar from './Navbar.tsx'
import Title from './Title.tsx'
import DashNote from './Dashnote.tsx'
import MiniCalendar from './Calendar.tsx'
import ToDoList from './ToDoList.tsx'
import WeatherWidget from './weather/index.tsx'


const Home = () => {
  const [inputValue, setinputValue] = useState('Irvine');
  const [location, setLocation] = useState('Irvine');

  const handleFormSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocation(inputValue);
  }
  return (
    <> 
      <Title />
      <Navbar />
      {/* After we get user info we pass it here or in the DashNote.tsx file */}
      <DashNote username="Jefferson McLinden"/> 

      <div className="flex items-center justify-center m-10">
        <MiniCalendar/>
          <div className="flex flex-col items-center" aria-label="select-location">
            <form 
            className="flex flex-col items-center"
            onSubmit={handleFormSubmit}
            >
              <input 
              className='bg-slate-100 pl-3 w-3/4 rounded-md mb-1'
              type="text" value={inputValue} placeholder="Enter Location" onChange={(e)=>{setinputValue(e.target.value)}}/>
              
              <button 
              className='bg-blue-200 px-3 rounded-md my-1'
              type="submit">Update</button>
            </form>
            <WeatherWidget location={location}/>
          </div>
      </div>
      
      <ToDoList />
      
    </>
  );
}

export default Home
