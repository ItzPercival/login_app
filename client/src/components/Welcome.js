import React, { useState, useEffect } from 'react'
import axios from 'axios'
import cookie from 'js-cookie'


function Welcome() {
    const [siteResponse, setResponse] = useState()

    function refreshToken() {
        if(!cookie.get('token')){
            return null
        }
        axios.post('http://localhost:8080/refresh', {refreshTok: sessionStorage.getItem('refresh')})
            .then((response) =>{
                window.location.reload(true);
                cookie.set("token", response.data, {
                    httpsOnly: true,
                    secure: false,
                })
            })
            .catch((err) => {
                console.log("error")
                setResponse(err)
            })
    }

    useEffect(() => {
        axios.get('http://localhost:8080/welcome', {withCredentials: true})
        .then((response) =>{
            setResponse(response.data)
        })
        .catch((err) => {
            setResponse(err.response.data)
            refreshToken()
        })
    }, [])

    return (
    <>
    <div className="h-screen pb-14 bg-right bg-cover">
        <div className="container pt-24 md:pt-48 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
                <h1 className="my-4 text-3xl md:text-5xl text-purple-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">Main Hero Message to sell your app</h1>
                <div className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">
                    {siteResponse ? siteResponse : <div>Nothing to show</div>}
                </div>
		    </div>
        </div>
    </div>
    </>
  )
}

export default Welcome