import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Title from '../components/Title'
import DisplayWeather from '../components/DisplayWeather'
import DisplayCity from '../components/DisplayCity'
import { useState, useEffect } from 'react'






const Home: NextPage = () => {

  const[location, setLocation] = useState<{lat: number | null, lon: number | null}>({lat: null, lon: null})
  
  const[isloading, setIsloading] = useState<boolean>(false);

  type Position = {
    coords:{
      latitude: number,
      longitude: number,
    }
  }

  const getCoordinates = () => {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  

  const handleGetLocation = async () =>{
    setIsloading(true);
    
    let current_position:Position = await getCoordinates() as Position;
    
    setLocation({lat: current_position.coords.latitude, lon:current_position.coords.longitude });
    
    setIsloading(false);
    console.log(current_position)
  }

  useEffect(()=>{
    handleGetLocation();
  },[])

  return (
    <>
      <Head>
        <title>My wheder app</title>
        <meta name="description" content="This is my wheder app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='grid grid-cols-1'>
       {/* <Title title="Weather app" /> */}
    {isloading? <div className='loader'><p>... loading</p></div> : ''}
    <div className='flex flex-col w-full align-center my-12 text-center' >
    {location.lon && <DisplayCity  location={location} />}
    {location.lon && <DisplayWeather location={location} /> }
    </div>
    <div className='grid'>
      <button className="btn" onClick={handleGetLocation}>Odśwież</button>
    </div>
        
      </main>
    </>
  )
}

export default Home

