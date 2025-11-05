import React, { useState } from 'react'
import Quiz from './Quiz'
import AdminPanel from './AdminPanel'


const App = () => {
    const [view, setView]=useState("user")
  return (
    <div className='bg-gray-200 h-[100vh] pt-10'>
    <div className='flex justify-center gap-2'>

      <button onClick={()=>setView("user")} className={`px-4 py-2 rounded-xl shadow-lg ${view==='user'?'bg-blue-500 text-white':"bg-white"}`}>User Panel</button>

      <button onClick={()=>setView("admin")} className={`px-4 py-2 rounded-xl shadow-lg ${view==='admin'?'bg-blue-500 text-white':"bg-white"}`}>Admin Panel</button>

    </div>
    {view==="user"? <Quiz/>: <AdminPanel/>}
    </div>
  )
}

export default App
