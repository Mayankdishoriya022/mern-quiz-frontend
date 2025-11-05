import axios from 'axios'
import React, { useEffect, useState } from 'react'

const  AdminPanel=()=> {
  const [questions, setQuestions]=useState([])
  const [form, setForm]=useState({questions:"", options:["","","",""], answer:0})
  const [editingId, setEditingid]=useState(null)
  
  const fetchQuestions=async()=>{
    const res=await axios.get("http://localhost:4000/question")
    setQuestions(res.data)
  }
  useEffect(()=>{
    fetchQuestions()
  }, [])

  const editQuestion=(q)=>{
    setForm({questions:q.questions, options:q.options, answer:q.answer})
    setEditingid(q._id)
  }

  const deleteQuestion=async(id)=>{
    await axios.delete(`http://localhost:4000/questions/${id}`)
    fetchQuestions()
  }

  const handlesave=async()=>{
    if(editingId){
      await axios.put(`http://localhost:4000/questions/${editingId}`, form)
    }
    else{
      await axios.post("http://localhost:4000/question", form)
    }
    fetchQuestions()
    setForm({questions:"", options:["","","",""], answer:0})
  }
  return (
    <div className='max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-xl mt-4'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Admin Panel</h2>
      <input type="text" name="" id="" className='border px-3 py-2 rounded w-full mb-2' placeholder='Question'
      value={form.questions} onChange={(e)=>setForm({...form, questions:e.target.value})}/>
      {form.options.map((opt, i)=>(
        <input type="text" name="" id="" placeholder={`Option ${i+1}`} value={form.options[i]} onChange={(e)=>{const newOpt=[...form.options]; newOpt[i]=e.target.value; setForm({...form, options:newOpt})}} className='border px-3 py-2 rounded w-full mb-2'/>
      ))}
      <input type="text" name="" id="" placeholder='Answer' onChange={(e)=>setForm({...form, answer: e.target.value})} className='border px-3 py-2 rounded w-full mb-2'/>
      <button onClick={handlesave} className={`px-2 py-2 rounded text-white ${editingId? "bg-yellow-500":"bg-green-500"}`}>
        {
          editingId? "Update Question":"Add Question"
        }
      </button>
      <h3 className='font-bold text-xl mt-6 mb-2'>Existing Questions</h3>
      <ul>
        {questions.map((q)=>(
          <li className='flex justify-between '>
          <span>{q.questions}</span>
          <div className='space-y-4'>
            <button className='bg-yellow-500 text-white rounded px-3 py-1 mx-5' onClick={()=>editQuestion(q)}>Edit</button>
            <button className='bg-red-500 text-white rounded px-3 py-1 mx-5'onClick={()=>deleteQuestion(q._id)}>Delete</button>
          </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminPanel
