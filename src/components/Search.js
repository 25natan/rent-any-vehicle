import React, { useEffect, useState } from 'react';
import {vihecleTypes} from '../constants';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { search } from '../searchByDistance';
import { distanceBetween } from 'geofire-common';
var lodash = require('lodash');

const animatedComponents = makeAnimated();

const Search = ({setVehiclesToDisplay, setNoResults, setToDisplaySideMenu, className, setIsLoading}) => {
    const [types, setTypes] = useState(null);
    const [location, setLocation] = useState([0.5, 0.5]);
    const [radius, setRadius] = useState(50);

    const initialize = () => {
        const google = window.google;
        var input = document.getElementById('location-field');
        var autocomplete = new google.maps.places.Autocomplete(input);
          google.maps.event.addListener(autocomplete, 'place_changed', function () {
              var place = autocomplete.getPlace();
              const crd = [place.geometry.location.lat(), place.geometry.location.lng()]
              setLocation(crd);
          });
    }

    const sumbitSearch = async () => {
        try{
            if (!types || !location) {
                alert("Please fill all fields");
                return;
            }
            const vehiclesData = await search({types, location, radius});
            navigator.geolocation.getCurrentPosition(deviceLocation => {
                const crd = [deviceLocation.coords.latitude, deviceLocation.coords.longitude];
                vehiclesData.forEach(vehicle => vehicle['distance'] = distanceBetween(crd, [vehicle.lat, vehicle.lng]));
                setVehiclesToDisplay(vehiclesData.map(vehicle => {
                    return {...vehicle, rateAvg: parseInt(lodash.sum(vehicle.rate)/vehicle.rate.length) || 0}
                }));
            });
            setNoResults(vehiclesData.length > 0 ? false : true);
            setToDisplaySideMenu(false);
            setIsLoading(false);
        } catch (e) {
         console.log(e);
         setIsLoading(false);
        }
    };

    useEffect(() => {
        initialize();
    },[])

    return (
        <div id='search' className={`search ${className}`}>
            <h1>Search</h1>
            <span className='vehicle-types'><h4>Vehicle Type</h4>
                <Select 
                required
                isMulti
                closeMenuOnSelect={false}
                components={animatedComponents} 
                options={vihecleTypes.map(type => {return {value: type, label: type}})} 
                onChange={e => {
                    setTypes(e.map(type => type.value));
                }}/>
            </span>
            <span className='location'><h4>Location</h4>

            <input  id={'location-field'} required /></span>
            <div className='radius'><div className='radius-title'>radius (km)</div><input type='number' min='0.5' onChange={(e)=> {setRadius(e.target.value *1000)}}></input></div>
            <button className='search-btn' onClick={sumbitSearch}>Search For Me</button>
        </div>
    );
};

export default Search;