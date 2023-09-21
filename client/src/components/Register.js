import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

function Register() {
    const [ error, setError ] = useState();
    const [ input, setInput ] = useState({username: "", password: ""})
    const nav = useNavigate()

    const handleInput = (e) => {
        setInput({...input, [e.target.id]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/register', input)
        .then((response) => {
            console.log(response)
            setError()
            nav("/")
        }).catch((err) => {
            setError(err.response.data);
        })
    }

  return (
    <div className="flex justify-center h-screen items-center">
        <form className="flex flex-col gap-4 px-20 py-10 border-solid rounded-md bg-slate-400" onSubmit={handleSubmit}>
            <div className="text-xl text-zinc-800">Register</div>
            <div>
            <input
                type="text"
                onChange = {handleInput}
                className="placeholder:text-slate-200 block min-h-[auto] w-full border rounded bg-inherit px-3 py-[0.32rem] leading-[1.6] outline-none"
                id="username"
                placeholder="Username"
            />
            </div>
            <div>
            <input
                type="password"
                onChange={handleInput}
                className="placeholder:text-slate-200 block min-h-[auto] w-full border rounded bg-inherit px-3 py-[0.32rem] leading-[1.6] outline-none"
                id="password"
                placeholder="Password"
            />
            </div>
            <div className="flex justify-around">
                <button type="subimt" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </div>
            <div>
                    Got an account? 
                    <Link to="/" className="ml-3 underline">
                        Click here
                    </Link>
            </div> 
            {error ? 
            <div className="p-2 flex m-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-200 dark:text-red-400" role="alert">
                {error}
            </div> 
            : null}
        </form>
    </div>
  )
}

export default Register