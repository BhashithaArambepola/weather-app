import logo from '../logo.svg';
import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch } from 'react-icons/io'
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind } from 'react-icons/bs'
import { TbTemperatureCelsius } from 'react-icons/tb'
import { ImSpinner8 } from 'react-icons/im'


// api key
const APIkey = '9fd16a7737223727c8c54e48c6f936c5'



function AppBody() {
    const [data, setData] = useState(null);
    const [location, setLocation] = useState('Kurunegala');

    // featching the data
    useEffect(() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`


        axios.get(url).then((res) => {
            setData(res.data);
        });

    }, [location]);


    // if data is false show the loader
    if (!data) {
        return (
            <div>
                <div>
                    <ImSpinner8 className='text-5xl animate-spin ' />
                </div>
            </div>
        )
    }

    // set Icon according to the weather
    let icon;
    console.log(data.weather[0].main);

    switch (data.weather[0].main) {
        case 'Clouds':
            icon = <IoMdCloudy />
            break;
        case 'Haze':
            icon = <BsCloudHaze2Fill />
            break;
        case 'Rain':
            icon = <IoMdRainy />
            break;
        case 'Clear':
            icon = <IoMdSunny />
            break;
        case 'Drizzle':
            icon = <BsCloudDrizzleFill />
            break;
        case 'Snow':
            icon = <IoMdSnow />
            break;
        case 'Thunderstorm':
            icon = <IoMdThunderstorm />
            break;
    }

    // Date
    const date = new Date();

    return (
        <div className='w-full h-screen  bg-gradient-to-r from-cyan-500 to-blue-800 bg-no-repeat bg-cover
        bg-center flex flex-col items-center justify-center py-12 px-6'>

            {/* form */}
            <form >
                
                
            </form>
            {/* card */}
            <div className='w-full  bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
                <div className=' flex items-center gap-x-5'>

                    <div className='text-[87px]'>{icon}</div>
                    <div>
                        <div className='text-2xl font-semibold'>{data.name},{data.sys.country}</div>


                        <div className='text-1xl font-semibold'>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>

                    </div>

                </div>
                <div className='my-20'>
                    <div className='flex justify-center items-center'>
                        {/* temp */}
                        <div className='text-[140px] leading-none font-light'>{parseInt(data.main.temp)}</div>
                        <div className='text-4xl'>
                            {/* temp icon*/}
                            <TbTemperatureCelsius />
                        </div>
                    </div>
                    {/* weather discription*/}
                    <div className='text-center capitalize' >{data.weather[0].description}</div>
                </div>

                <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
                    <div className='flex justify-between '>
                        <div className='flex items-center gap-x-2'>
                            {/* icon */}
                            <div className='text-[20px]'>
                                <BsEye />
                            </div>
                            <div>
                                Visibility{' '} <span className='ml-2'> {data.Visibility / 1000} km</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            {/* icon */}
                            <div className='text-[20px]'>
                                <BsThermometer />
                            </div>
                            <div>
                                <div className='flex'>
                                    <div>Feel like <span className='ml-2'> {data.main.feels_like}</span></div>
                                    <div className='text-0.5xl'>
                                        {/* temp icon*/}

                                    </div>
                                    <TbTemperatureCelsius />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
                    <div className='flex justify-between '>
                        <div className='flex items-center gap-x-2'>
                            {/* icon */}
                            <div className='text-[20px]'>
                                <BsWater />
                            </div>
                            <div>
                                Humidity <span className='ml-2'> {data.main.humidity}%</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            {/* icon */}
                            <div className='text-[20px]'>
                                <BsWind />
                            </div>
                            <div>
                                <div className='flex'>
                                    <div>Wind
                                        <span className='ml-2'> {data.wind.speed}m/s</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppBody