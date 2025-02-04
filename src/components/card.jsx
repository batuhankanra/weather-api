import { MdOutlineAccessTime } from "react-icons/md";
export default function Card({text,icon,time,heat}) {
    const hours=time.split(' ')[1];

  return (
    <div className=' cursor-default flex h-[150px] w-[150px] hover:scale-105 transition-all duration-300  items-center text-white bg-linear-to-t from-sky-800 to-indigo-400 p-2 rounded-md'>

        <div className='flex flex-col items-center justify-center w-full'>
            <img src={`http:${icon}`} className='w-14 object-cover' />
            <div className='flex flex-col text-center'>
            <span className="flex items-center gap-x-1"><MdOutlineAccessTime/ >{hours}</span>
            <span className="flex items-center text-center">{text}</span>
            <div className="flex items-center gap-x-1  text-center">{heat}°C</div>
            </div>
        </div>
    </div>
  )
}
