import React, { useCallback, useEffect, useState } from 'react';
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import VehicleItem from './VehicleItem';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { sortTypes } from '../constants';
import { distanceBetween } from 'geofire-common';
var lodash = require('lodash');

const animatedComponents = makeAnimated();

const Home = props => {
    const [vehiclesToDisplay, setVehiclesToDisplay] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [toDisplaySideMenu, setToDisplaySideMenu] = useState(false);
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    let navigate = useNavigate();
    const vehiclesCollectionRef = collection(db, "vehicles");

    const getAllVehicles = async () => {
        try{
            props.setIsLoading(true);
            const data = await getDocs(vehiclesCollectionRef);
            const vehiclesData = data.docs.map(doc => ({...doc.data(), id: doc.id }));
            navigator.geolocation.getCurrentPosition(deviceLocation => {
                const crd = [deviceLocation.coords.latitude, deviceLocation.coords.longitude];
                vehiclesData.forEach(vehicle => vehicle.distance = distanceBetween(crd, [vehicle.lat, vehicle.lng]));
                setVehiclesToDisplay(vehiclesData.map(vehicle => {
                    return { ...vehicle, rateAvg: parseInt(lodash.sum(vehicle.rate) / vehicle.rate.length) || 0 }
                }));
            });
            props.setIsLoading(false);
        } catch (e) {
            console.log(e);
            props.setIsLoading(false);
        }
    };

    useEffect(() => {
            if (!props.isAuth) navigate('/signin');
  
            getAllVehicles();
    }, []);

    const sortByLocation = () => {
        setVehiclesToDisplay(vehiclesToDisplay.sort((a, b) => a.distance - b.distance));
    };

    const sortByPrice = () => {
        setVehiclesToDisplay(vehiclesToDisplay.sort((a, b) => (a.price > b.price ? 1 : -1)));
    };
    
    const sortByRate = () => {
        setVehiclesToDisplay(vehiclesToDisplay.sort((a, b) => (a.rate < b.rate ? 1 : -1)));
    };

    const sort = e => {
        if (e.value === 'location') sortByLocation();
        else if (e.value === 'price') sortByPrice();
        else if (e.value === 'rate') sortByRate();
        forceUpdate()
    }

    const deleteVehicle = async id => {
        try {
            const vehicleDoc = doc(db, 'vehicles', id);
            await deleteDoc(vehicleDoc);
            setVehiclesToDisplay(vehiclesToDisplay.filter(vehicle => vehicle.id !== id));
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className='homePage'>
            <div id='mobile-search-side-menu' className='mobile-search-side-menu fa fa-search' onClick={() => setToDisplaySideMenu(!toDisplaySideMenu)}></div>
            <Search setVehiclesToDisplay={setVehiclesToDisplay} setNoResults={setNoResults} setToDisplaySideMenu={setToDisplaySideMenu} setIsLoading={props.setIsLoading} className={toDisplaySideMenu ? '' : 'hide'} />
            <div className='search-results'>
                <div className='sort-by'>
                    <div className='sort-title'>Sort by</div>
                    <Select
                        required
                        closeMenuOnSelect={false}
                        placeholder='select...'
                        components={animatedComponents}
                        options={sortTypes.map(type => { return { value: type, label: type } })}
                        onChange={sort} />
                </div>
                <div className='vehicles-list'>
                    {vehiclesToDisplay?.map(vehicle => <VehicleItem data={vehicle} key={vehicle.id} deleteVehicle={deleteVehicle} setIsLoading={props.setIsLoading} />)}
                    {noResults && <div className='empty-results'>
                        <h2>Sorry.... We couldn't find any matches to your search </h2>
                        <img src='/no-results.jpg' width='300px' alt='' />
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Home;