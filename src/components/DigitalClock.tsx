import { useEffect, useState } from 'react';

export default function DigitalClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const currInterval = setInterval(() => {
            setTime(new Date())
        }, 1000);

        return () => {
            clearInterval(currInterval);
        }

    }, []);

    function formatTime() {
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const prefix = hours >= 13 ? "🌙" : "☀️";
        const cycle = hours >= 13 ? "P" : "A";

        hours = hours % 12;
        return `${prefix} ${giveZero(hours)}:${giveZero(minutes)}:${giveZero(seconds)} ${cycle}`;
    }

    function giveZero(number : number) {
        return number < 10 ? "0" + number : number;
    } 
    return (
        <div className='flex items-center justify-center text-center whitespace-nowrap'>
            <div className='font-digital text-2xl border-4 bg-[#E9F3FF] border-[#95BAE6] text-[#95BAE6] rounded-xl pt-3 pb-3 pr-2 pl-2'>
                <span>{formatTime()}</span>
            </div>
        </div>
    )
}