import { useState } from 'react';

export default function Calendar() {
    const monthData = [
        { name: "January", days: 31 },
        { name: "February", days: 28 },
        { name: "March", days: 31 },
        { name: "April", days: 30 },
        { name: "May", days: 31 },
        { name: "June", days: 30 },
        { name: "July", days: 31 },
        { name: "August", days: 31 },
        { name: "September", days: 30 },
        { name: "October", days: 31 },
        { name: "November", days: 30 },
        { name: "December", days: 31 },
    ];
      
    const isLeapYear = (year : number) => {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    };
      
    const currentDate = new Date();
    const [year, setYear] = useState(currentDate.getFullYear());
    const [monthIndex, setMonthIndex] = useState(currentDate.getMonth());

    const adjustedMonths = monthData.map((month) => {
        if (month.name == "February") {
            return { ...month, days: isLeapYear(year) ? 29 : 28 };
        }
        return month;
    });

    const currentMonth = adjustedMonths[monthIndex];

    const prevMonth = () => {
        const newMonthIndex = monthIndex == 0 ? 11 : monthIndex - 1;
        const newYear = newMonthIndex == 11 ? year - 1 : year;
        setMonthIndex(newMonthIndex);
        setYear(newYear);
    };

    const nextMonth = () => {
        const newMonthIndex = monthIndex == 11 ? 0 : monthIndex + 1;
        const newYear = newMonthIndex == 0 ? year + 1 : year;
        setMonthIndex(newMonthIndex);
        setYear(newYear);
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const firstDayOffset = getFirstDayOfMonth(year, monthIndex);

    const checkCurrentDay = (day: number) => {
        return (
            day + 1  == currentDate.getDate() &&
            monthIndex == currentDate.getMonth() &&
            year == currentDate.getFullYear()
        );
    };

    const checkCurrentMonth = (name: string) => {
        return name == adjustedMonths[currentDate.getMonth()].name;
    }
    
    return (
        <div className="border border-gray-300 rounded-md p-4 shadow-md bg-blue-50 dark:bg-[#95BAE6] dark:border-[#4B6D94]">
            <div className="flex justify-between items-center mb-4">
                <button onClick={prevMonth} className="hover:bg-slate-200 p-2 rounded-full pl-3 pr-3 dark:text-[#FBFDFF]">
                    {"<"}
                </button>

                <div className="text-lg font-bold">
                    <span className={`${checkCurrentMonth(currentMonth.name) ? "text-blue-400 dark:text-green-200" : "dark:text-[#FBFDFF]"}`}>{currentMonth.name} {year}</span>
                </div>

                <button onClick={nextMonth} className="hover:bg-slate-200 p-2 rounded-full pl-3 pr-3 dark:text-[#FBFDFF]">
                    {">"}
                </button>
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <div key={day} className="text-gray-600 dark:text-[#FBFDFF]">{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                
                {/* Creates empty buffer days */}
                {[...Array(firstDayOffset)].map((_, index) => (
                    <div key={`empty-${index}`} className="h-10 w-8"></div>
                ))}
                
                {/* Populates calendar with days */}
                {[...Array(currentMonth.days).keys()].map((day) => (
                    <div 
                        key={day} 
                        className={`h-8 w-8 flex justify-center items-center border border-gray-300 rounded-sm text-sm
                            ${checkCurrentDay(day) ? 'bg-blue-500 text-white hover:bg-blue-400 dark:bg-green-200 dark:text-slate-600 dark:border-green-200 hover:dark:bg-green-300' : 'bg-white hover:bg-gray-200 dark:text-white dark:bg-slate-600 hover:dark:bg-slate-400'}`}
                    >
                        {day + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};