import React, { useState, useEffect } from 'react'
import axios from 'axios'
import cookie from 'js-cookie'


function Welcome() {
    const [siteResponse, setResponse] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8080/welcome', {withCredentials: true})
        .then((response) =>{
            setResponse(response)
        })
        .catch((err) => {

            axios.post('http://localhost:8080/refresh', {refreshTok: sessionStorage.getItem('refresh')})
            .then((response) =>{
                console.log('testing')
                cookie.set("token", response.data, {
                    httpsOnly: true,
                    secure: false,
                })
                setResponse("New access token!")
            })
            .catch((err) => {
                console.log("error")
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
                <div className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">
                    {siteResponse ? siteResponse.data : <div>Nothing to show</div>}
                </div>
		    </div>
        </div>
    </div>
    </>
  )
}

export default Welcome