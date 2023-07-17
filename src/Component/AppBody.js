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
useEffect(()=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}`


axios.get(url).then((res)=>{
setData(res.data);
});

},[location]);


    return (
        <React.Fragment>
            React
        </React.Fragment>
    )
}

export default AppBody