import React, { useEffect, useState } from 'react';
import {vihecleTypes} from '../constants';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { search } from '../searchByDistance';

const animatedComponents = makeAnimated();



const Search = ({setVehiclesToDisplay, setNoResults, setToDisplaySideMenu, className}) => {
    const [types, setTypes] = useState(null);
    const [location, setLocation] = useState([0.5, 0.5]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const initialize = () => {
        const google = window.google;
        var input = document.getElementById('location-field');
        var autocomplete = new google.maps.places.Autocomplete(input);
          google.maps.event.addListener(autocomplete, 'place_changed', function () {
              var place = autocomplete.getPlace();
              setLocation([place.geometry.location.lat(), place.geometry.location.lng()]);
          });
    }

    const sumbitSearch = async () => {
        try{
            if (!types || !location) {
                alert("Please fill all fields");
                return;
            }
            const docs = await search(types, minPrice, maxPrice, location);
            setVehiclesToDisplay(docs.map(doc => doc.data()));
            setNoResults(docs.length > 0 ? false : true);
            setToDisplaySideMenu(false);
        } catch (e) {
         console.log(e);
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
            <span className='price'><h4>From Price</h4>
            0<input type="range" min="1" max="1000" required onChange={e => {
                    setMinPrice(parseInt(e?.target?.value));}}/>1000
                    <div>{minPrice} For 1 houre</div>
                </span>
            <span className='price'><h4>To Price</h4>
            {minPrice}<input type="range" min={minPrice} max="10000" placeholder={minPrice} onChange={e => {
                    setMaxPrice(parseInt(e?.target?.value));}}/>10000
                    <div>{maxPrice} For 1 houre</div>
                </span>
            <span className='location'><h4>Location</h4>

            <input  id={'location-field'} required /></span>
            <button className='search-btn' onClick={sumbitSearch}>Search For Me</button>
        </div>
    );
};

export default Search;