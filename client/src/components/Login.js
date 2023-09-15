import React, { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";


function Login() {
    const nav = useNavigate()
    const [ input, setInput ] = useState({username: "", password: ""})

    const handleInput = (e) => {
        setInput({...input, [e.target.id]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8080/login", input)
        .then((response) => {
            console.log(response)
            nav("/welcome")
        }).catch((err) => {
            console.log(err)
        }) 

    }

  return (
    <div className="flex justify-center h-screen items-center">
        <form className="flex flex-col gap-4 px-20 py-10 border-solid rounded-md bg-slate-400" onSubmit={handleSubmit}>
            <div className="text-xl text-zinc-800">Log in</div>
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
                type="text"
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
                <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Register
                </Link>
                
            </div>
        </form>
    </div>
  );
}

export default Login;
