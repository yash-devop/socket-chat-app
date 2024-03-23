import { useMemo } from "react"
import { io } from "socket.io-client"
export default function App() {
  
  const socket = useMemo(()=>{
      return io("http://localhost:8000/",{
          // withCredentials: true
      })
  },[])
  return (
    <div className="">
      
    </div>
  )
}