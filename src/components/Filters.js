import React, { useState } from 'react';
import {vihecleTypes} from '../constants';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase-config';
import { searchByDistance } from '../searchByDistance';

const animatedComponents = makeAnimated();

const Filters = ({setVehiclesToDisplay, setNoResults}) => {
    const [types, setTypes] = useState(null);
    const [location, setLocation] = useState(null);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const sumbitSearch = async () => {
        if (!types || !location) {
            alert("Please fill all fields");
            return;
        }
        const vehiclesRef = collection(db, "vehicles");
        const q = query(vehiclesRef, where("type", "in", types), where("price", ">=", minPrice), where("price", "<=", maxPrice));
        const querySnapshot = await getDocs(q);
        setVehiclesToDisplay(querySnapshot.docs.map(doc => doc.data()));
        console.log('!querySnapshot.docs.length', !!querySnapshot.docs.length);
        setNoResults(querySnapshot.docs.length > 0 ? false : true);
    };

    return (
        <div className='filters'>
            <h1>Search Properties</h1>
            <span className='vehicle-types'><h4>Types</h4>
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
                    setMinPrice(e?.target?.value);}}/>1000
                    <div>{minPrice} For 1 houre</div>
                </span>
            <span className='price'><h4>To Price</h4>
            {minPrice}<input type="range" min={minPrice} max="10000" onChange={e => {
                    setMaxPrice(e?.target?.value);}}/>10000
                    <div>{maxPrice} For 1 houre</div>
                </span>
            <span className='location'><h4>Location</h4>
            <button onClick={searchByDistance}>Search by distance</button>

            <input  required onChange={e => {
                    setLocation(e?.target?.value);
                }}/></span>
              <button className='search-btn' onClick={sumbitSearch}>Search For Me</button>
        </div>
    );
};

export default Filters;