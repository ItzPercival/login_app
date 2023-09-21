import React, { useState, useEffect } from 'react'
import axios from 'axios'
import cookie from 'js-cookie'


function Welcome() {
    const [response, setResponse] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8080/welcome', {withCredentials: true})
        .then((response) =>{
            setResponse(response)
        })
        .catch((err) => {
            axios.post('http://localhost:8080/refresh', {refreshTok: sessionStorage.getItem('refresh')})
            .then((response) =>{
                cookie.set("token", response.data, {
                    httpsOnly: true,
                    secure: false,
                })
            })
            .catch((err) => {
                setResponse(err)
            })
        })

    }, [])

    return (
    <>
    <div className="h-screen pb-14 bg-right bg-cover">
        <div className="w-full container mx-auto p-6">                
        </div>
        <div className="container pt-24 md:pt-48 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
                <h1 className="my-4 text-3xl md:text-5xl text-purple-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">Main Hero Message to sell your app</h1>
                <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">
                    {response ? response.data : <div>Nothing to show</div>}
                </p>
    
                <div className="text-blue-400 font-bold pb-8 lg:pb-6 text-center md:text-left fade-in">
                </div>
                <div className="flex w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in">
                </div>
		    </div>
        </div>
    </div>
    </>
  )
}

export default Welcome