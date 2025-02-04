import {  useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAPI } from "./store/api"
import Loading from "./components/loading"
import Fail from "./components/fail"
import { IoMdSearch } from "react-icons/io";
import Card from "./components/card"
import Circle from "./components/circle"
import Wind from "./components/wind"



export default function App() {
  const [city,setCity]=useState('')
  const [lang,setLang]=useState('tr')

  const {data,status}=useSelector(state=>state.api)
  console.log(data,status)

  const dispatch=useDispatch()

  
  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(getAPI({city:city,lang:lang}))
  }
  const timer=(time12h)=>{
    const [time,modifer]=time12h.split(' ')
    let [hours,minutes]=time.split(':').map(Number)
    if(modifer==='PM' && hours!==12){
       hours +=12
    }else if(modifer==='AM' && hours===12){
       hours=0
    }
    return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`
  }
  

  return (
    <div className="min-h-screen h-full bg-[#E8EAF6] text-black   ">
      <section className="md:w-[800px] w-full mx-auto pt-10">

        <form onSubmit={handleSubmit} className="flex items-center relative ">
          <input type="text" placeholder="sehir giriniz" value={city} onChange={e=>setCity(e.target.value)} className="focus:bg-white w-full p-2 text-xl outline-none border border-zinc-300 focus:border-zinc-600 transition-all duration-200 rounded-md" />
          <button className="absolute right-3 text-xl "><IoMdSearch/></button>
        </form>

      </section>
      {status==='Success' && (
        <section className="w-full md:w-[800px] mx-auto   mt-14">
          <div className="flex items-center justify-between py-3 px-7 text-lg bg-white rounded-xl font-medium text-zinc-600 ">
            <span className="flex items-center justify-center">{data.location.name}{data.location.name===data.location.region ? '' : ` / ${data.location.region}`}</span>
            <span>Enlem:{data.location.lat}</span>
            <span>Boylam:{data.location.lon}</span>
            <span>Gun Dogumu:{timer(data.forecast.forecastday[0].astro.sunrise)}</span>
            <span>Gun Batimi:{timer(data.forecast.forecastday[0].astro.sunset)}</span>
          </div>
            <div className="mt-10 flex items-center justify-between py-3 px-7 text-lg bg-white rounded-xl font-medium text-zinc-600">
              <p className="flex items-center text-4xl gap-x-2"> {data.current.heatindex_c} 
                <span className="text-sm flex flex-col items-center"> <img src={`http:${data.current.condition.icon}`} alt="" /> {data.current.condition.text} </span>
              </p>
              <div className="flex flex-col items-center">
                <p>Yagis</p>
                <p>{data.forecast.forecastday[0].day.totalprecip_mm}mm</p>
              </div>
              <div className="flex items-center justify-center gap-x-1">
                <Circle percentage={data.current.humidity} />
                <div>
                <p>Nem:</p>
                <p>%{data.current.humidity}</p>
                </div>
              </div>
              <div className="flex items-center gap-x-1">
              <Wind wind={data.current.wind_dir} />

                <p>Ruzgar:</p>
                <p>{data.current.wind_kph} <span className="text-base text-zinc-500">Km/s</span> </p>
              </div>
            </div>
            <div className="flex overflow-auto items-center p-2 gap-x-4 mt-20">
              {data.forecast.forecastday[0].hour.map((item,i)=>(
                <div key={i}>
                    <Card text={item.condition.text} icon={item.condition.icon} time={item.time} heat={item.heatindex_c} />
                </div>
              ))}
            </div>
            
        </section>
      )}
      {status==='Fail' && <Fail />}
      {status==='Loading' && <Loading />}
    </div>
  )
}
