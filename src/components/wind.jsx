import { FaLongArrowAltRight } from "react-icons/fa";


export default function Wind({wind}) {
    const directionAngles={
        N: 0, NE: 45, E: 90, SE: 135, S: 180,
        SW: 225, W: 270, NW: 315, WNW: 292.5, WSW: 247.5,
        ENE: 67.5, ESE: 112.5, SSE: 157.5, NNW: 337.5
    }
    const rotation=directionAngles[wind] ||0
    
  return (
    <div className="flex flex-col items-center justify-center ">
    <div
      className=" flex items-center justify-center border p-2 border-zinc-400 rounded-full "
      style={{ transform: `rotate(${rotation}deg)`, transition: "0.5s" }}
    >
     <FaLongArrowAltRight size={25}/>
    </div>
  </div>
  )
}
