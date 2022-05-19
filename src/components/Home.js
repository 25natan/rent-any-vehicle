import React, { useEffect, useState } from 'react';
import { getDocs, collection, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import {db} from '../firebase-config';
import VehicleItem from './VehicleItem';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import { updateForTest } from '../searchByDistance';

const Home = props => {
    let navigate = useNavigate();
    const [vehiclesToDisplay, setVehiclesToDisplay] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toDisplaySideMenu, setToDisplaySideMenu] = useState(false);
    const vehiclesCollectionRef = collection(db, "vehicles");

    const getAllVehicles = async () => {
        setIsLoading(true);
        const data = await getDocs(vehiclesCollectionRef);
        setVehiclesToDisplay(data.docs.map(doc => ({...doc.data(), id: doc.id})));
        setIsLoading(false);
    };

    useEffect(() => {
        try{
            if(!props.isAuth)  navigate('/signin');
            const vehiclesFronLocalStorage = localStorage.getItem('vehiclesToDisplay');
            if(vehiclesFronLocalStorage) {
                setVehiclesToDisplay(JSON.parse(vehiclesFronLocalStorage));
                return;   
            }
            getAllVehicles();
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        vehiclesToDisplay.length && localStorage.setItem('vehiclesToDisplay', JSON.stringify(vehiclesToDisplay));
    }, [vehiclesToDisplay])

    const deleteVehicle = async id => {
        try{
        const vehicleDoc = doc(db, 'vehicles', id);
        await deleteDoc(vehicleDoc);
        setVehiclesToDisplay(vehiclesToDisplay.filter(vehicle => vehicle.id !== id));
        } catch(e){
            console.log(e);
        }
    };

    return (
        <div className='homePage'>
            <div id='mobile-search-side-menu' className='mobile-search-side-menu fa fa-search' onClick={()=> setToDisplaySideMenu(!toDisplaySideMenu)}></div>
            <Search  setVehiclesToDisplay={setVehiclesToDisplay} setNoResults={setNoResults} setToDisplaySideMenu={setToDisplaySideMenu} setIsLoading={setIsLoading} className={toDisplaySideMenu ? '' : 'hide'}/>
                {isLoading && <div className='loading'>
                <div id="load">
                    <div>G</div>
                    <div>N</div>
                    <div>I</div>
                    <div>D</div>
                    <div>A</div>
                    <div>O</div>
                    <div>L</div>
                    </div>
            </div>}
            <div className='vehicles-list'>
            {vehiclesToDisplay?.map(vehicle =><VehicleItem data={vehicle}  key={vehicle.id} deleteVehicle={deleteVehicle} setIsLoading={setIsLoading}/> )}
            {noResults && <div className='empty-results'> 
                <h2>Sorry.... We couldn't find any matches to your search </h2>
                <img src='/no-results.jpg' alt=''/>
                </div>}
            </div> 
        </div>
    );
};

export default Home;