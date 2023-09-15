import React, { useState } from "react";
import axios from 'axios'

function Login() {

    const [ input, setInput ] = useState({username: "", password: ""})

    const handleInput = (e) => {
        setInput({...input, [e.target.id]: e.target.value})
    }

    const handleSubmit = () => {

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
            <div className="mx-auto">
                <button type="subimt" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </div>
        </form>
    </div>
  );
}

export default Login;
