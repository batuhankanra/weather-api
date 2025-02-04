import { GiDrop } from "react-icons/gi";

export default function Circle({percentage}) {
    const radius=37
    const strokeWidth=6
    const circumference=2*Math.PI*radius
    const progress=(percentage/100)*circumference
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
        <svg width={70} height={70} viewBox="0 0 120 120">
            <circle
                cx={60}
                cy={60}
                r={radius}
                stroke="gray"
                strokeWidth={strokeWidth}
                fill="none"
                opacity={0.3}
            />
            <circle 
                cx={60}
                cy={60}
                r={radius}
                stroke="blue"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference-progress}
                strokeLinecap="round"
                className="transition-all duration-500"
            />
        </svg>
        <GiDrop className="absolute" size={20} />
    </div>
  )
}
