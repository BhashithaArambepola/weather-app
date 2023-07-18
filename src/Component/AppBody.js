import logo from '../logo.svg';
import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch } from 'react-icons/io';
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind } from 'react-icons/bs';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im';


// api key
const APIkey = '9fd16a7737223727c8c54e48c6f936c5';



function AppBody() {
    const [data, setData] = useState(null);
    const [location, setLocation] = useState('Kurunegala');
    const [inputValue, setInputValue] = useState('');
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleInput = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        // if input value is not empty
        if (inputValue !== '') {
            // set location
            setLocation(inputValue);
        }
        // select input
        const input = document.querySelector('input');

        // if input value is empty
        if (input.value === '') {
            setAnimate(true);
            // after 500ms set animate to false
            setTimeout(() => {
                setAnimate(false);
            }, 500);
        }

        // clear input
        input.value = '';

        // prevent Default
        e.preventDefault();
    };

    // fetching the data
    useEffect(() => {
        // setLoading false
        setLoading(true);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

        axios.get(url)
            .then((res) => {
                // set the data after 1500ms
                setTimeout(() => {
                    setData(res.data);
                    // setLoading false
                    setLoading(false);
                }, 1500);
            })
            .catch(err => {
                setLoading(false);
                setErrorMsg(err);
            });
    }, [location]);


    // error message
    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMsg('');
        }, 2000);
        return () => clearTimeout(timer);
    }, [errorMsg]);

    // if data is false show the loader
    if (!data) {
        return (
            <div>
                <div>
                    <ImSpinner8 className='text-5xl animate-spin' />
                </div>
            </div>
        );
    }

    // set Icon according to the weather
    let icon;

    switch (data.weather[0].main) {
        case 'Clouds':
            icon = <IoMdCloudy />;
            break;
        case 'Haze':
            icon = <BsCloudHaze2Fill />;
            break;
        case 'Rain':
            icon = <IoMdRainy />;
            break;
        case 'Clear':
            icon = <IoMdSunny />;
            break;
        case 'Drizzle':
            icon = <BsCloudDrizzleFill />;
            break;
        case 'Snow':
            icon = <IoMdSnow />;
            break;
        case 'Thunderstorm':
            icon = <IoMdThunderstorm />;
            break;
        default:
            icon = null;
            break;
    }

    // Date
    const date = new Date();

    return (
        <div className='w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-800 bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center py-12 px-6'>
            {errorMsg && <div>{`${errorMsg.response.data.message}`}</div>}
            {/* form */}
            <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
                <div className='h-full relative flex items-center justify-between'>
                    <input
                        onChange={(e) => handleInput(e)}
                        type='text'
                        className='flex-1 bg-transparent outline-none placeholder:text-white text-[15px] font-light pl-6 h-full'
                        placeholder='Search by city or Country'
                    />
                    <button
                        onClick={(e) => handleSubmit(e)}
                        className='bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center trasnsition'
                    >
                        <IoMdSearch className='text-2xl text-white' />
                    </button>
                </div>
            </form>
            {/* card */}
            <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
                {loading ? (
                    <div className='w-full h-full flex justify-center items-center'>
                        <ImSpinner8 className='text-white text-5xl animate-spin' />
                    </div>
                ) : (
                    <div>
                        <div className='flex items-center gap-x-5'>
                            <div className='text-[87px]'>{icon}</div>
                            <div>
                                <div className='text-2xl font-semibold'>{data.name},{data.sys.country}</div>
                                <div className='text-1xl font-semibold'>
                                    {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
                                </div>
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
                            {/* weather description */}
                            <div className='text-center capitalize'>{data.weather[0].description}</div>
                        </div>
                        <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
                            <div className='flex justify-between'>
                                <div className='flex items-center gap-x-2'>
                                    {/* icon */}
                                    <div className='text-[20px]'>
                                        <BsEye />
                                    </div>
                                    <div>
                                        Visibility{' '}
                                        <span className='ml-2'>{data.visibility / 1000} km</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    {/* icon */}
                                    <div className='text-[20px]'>
                                        <BsThermometer />
                                    </div>
                                    <div>
                                        <div className='flex'>
                                            <div>
                                                Feel like <span className='ml-2'>{data.main.feels_like}</span>
                                            </div>
                                            <div className='text-0.5xl'>
                                                {/* temp icon */}
                                                <TbTemperatureCelsius />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
                            <div className='flex justify-between'>
                                <div className='flex items-center gap-x-2'>
                                    {/* icon */}
                                    <div className='text-[20px]'>
                                        <BsWater />
                                    </div>
                                    <div>
                                        Humidity <span className='ml-2'>{data.main.humidity}%</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    {/* icon */}
                                    <div className='text-[20px]'>
                                        <BsWind />
                                    </div>
                                    <div>
                                        <div className='flex'>
                                            <div>
                                                Wind <span className='ml-2'>{data.wind.speed}m/s</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AppBody;
