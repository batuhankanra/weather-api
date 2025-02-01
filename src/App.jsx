import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAPI } from "./store/api"
import Loading from "./components/loading"
import Fail from "./components/fail"
import { IoMdSearch } from "react-icons/io";
import Card from "./components/card"



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

  return (
    <div className="min-h-screen h-full bg-[#E8EAF6] text-black   ">
      <section className="md:w-[700px] w-full mx-auto pt-10">

        <form onSubmit={handleSubmit} className="flex items-center relative ">
          <input type="text" placeholder="sehir giriniz" value={city} onChange={e=>setCity(e.target.value)} className="w-full p-2 text-xl outline-none border border-zinc-300 focus:border-zinc-600 transition-all duration-200 rounded-md" />
          <button className="absolute right-3 text-xl "><IoMdSearch/></button>
        </form>

      </section>
         <section>
          {status==='Success' && (
             <div className="container mx-auto">
             <div className="flex flex-col items-center justify-center mt-10">
               <h1 className="text-center text-6xl font-bold">{data.location.name}</h1>
               <h2 className="xl font-semibold">{data.location.region!=data.location.name && data.location.region }</h2>
               <p>{data.forecast.forecastday[0].date}</p>
               {data.forecast.forecastday[0].day.condition.text}
               
               <img src={`http:${data.forecast.forecastday[0].day.condition.icon}`} alt="" />

               <div className="flex items-center md:w-[1400px] w-[400px] p-2 overflow-auto  snap-x gap-5 mt-20  ">
               {data.forecast.forecastday[0].hour.map(item=>(
                <div className="snap-center" key={item.time_epoch}>
                  <Card text={item.condition.text}  icon={item.condition.icon} time={item.time} heat={item.heatindex_c} humidity={item.humidity} />
                </div>
               ))}
               </div>
              
             </div>
           </div>
          )}
         </section>
        {
          status==='Loading' && <Loading />
        }
        {
          status==='Fail' && <Fail />
        }
    </div>
  )
}
