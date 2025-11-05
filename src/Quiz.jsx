import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Quiz = () => {
  const [questions, setQuestions]=useState([])
  const [current, setCurrent]=useState(0)
  const [score, setScore]=useState(0)
  const [finished, setFinished]=useState(false)
  const [username, setUsername]=useState("")
  const [history, setHistory]=useState([])
  const [extraname, setExtraname]=useState("")


  useEffect(()=>{
    axios.get('https://mern-quiz-backend-1-5w6m.onrender.com/question')
    .then(res=>{
      setQuestions(res.data)
    }).catch(e=>{
      console.log(e)
    })
  },[])
  const verifyAns = (opt)=>{
    if(opt===questions[current].answer){
      setScore(score+1)
    }
    if(current+1<questions.length){
      setCurrent(current+1)
    }
    else{
      setFinished(true)
    }
  }


  const saveScore=async ()=>{
    await axios.post ("https://mern-quiz-backend-1-5w6m.onrender.com/scores",{username, score, total:questions.length})
    const res=await axios.get (`https://mern-quiz-backend-1-5w6m.onrender.com/scores/${username}`)
    setHistory(res.data)
    
  }

  return (
    <div className='max-w-lg mx-auto bg-white shadow-lg p-6 rounded-2xl mt-10'>
      {!username?(
        <div className='text-center'>
         <h2 className='text-xl font-bold mb-4'>Enter Your Name</h2>
         <input onChange={(e)=>setExtraname(e.target.value)} className='border px-3 py-2 rounded w-full mb-3' type="text" />
         <button onClick={()=>setUsername(extraname)} className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'>Start Quiz</button>
        </div>
      ):!finished?(
        <div className='text-center flex flex-col gap-6'>
         {
          questions.length>0 ?(
            <>
            <h2 className='text-lg font-bold'>{questions[current].questions}</h2>
            <div className='flex flex-col gap-3'>
              {questions[current].options.map((opt, i)=>(
                <button className='bg-blue-500 px=4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors text-white' onClick={()=>verifyAns(i)}>{opt}</button>
              ))}
            </div>
            </>
          ):(
            <p className='text-gray-400'>No Questions Available</p>
          )
         }
        </div>
      ):(
        <div>
        <h2 className='text-center text-2xl mb-4 font-bold'>Quiz Finished</h2>
         <p className='text-center text-2xl mb-4 font-bold'>Your Score{score}</p>
         <button onClick={saveScore} className='bg-green-500 text-white px-3 py-2 rounded block mx-auto mt-4 cursor-pointer'>Save Score</button>

         <div className='text-center'>
          {
            history.length>0 && (
              <div>
                <h3 className='font-semibold text-xl my-4'>Your Previous Score:</h3>
                <ul className='space-y-2 list-disc'>
                  {
                    history.map((s,i)=>(
                      <li className='w-[60%] mx-auto' key={i}>{new Date(s.date).toLocaleString()}-> {s.score}/{s.total}</li>
                    ))
                  }
                </ul>
              </div>
            )
          }
         </div>

        </div>
      )}
    </div>
  )
}

export default Quiz
