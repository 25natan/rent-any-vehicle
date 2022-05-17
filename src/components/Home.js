import React, { useEffect, useState } from 'react';
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';
import {db} from '../firebase-config';
import VehicleItem from './VehicleItem';
import { useNavigate } from 'react-router-dom';
import Search from './Search';

const Home = props => {
    let navigate = useNavigate();
    const [vehiclesList, setVehiclesList] = useState([]);
    const [vehiclesToDisplay, setVehiclesToDisplay] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toDisplaySideMenu, setToDisplaySideMenu] = useState(false);
    const vehiclesCollectionRef = collection(db, "vehicles");

    useEffect(() => {
        if(!props.isAuth)  navigate('/signin');
        const getVehicles = async () => {
            setIsLoading(true);
            const data = await getDocs(vehiclesCollectionRef);
            setVehiclesList(data.docs.map(doc => ({...doc.data(), id: doc.id})));
            setIsLoading(false);
        };
        try{
        const vehiclesFronLocalStorage = localStorage.getItem('vehiclesToDisplay');
        if(vehiclesFronLocalStorage) {
            setVehiclesToDisplay(JSON.parse(vehiclesFronLocalStorage)); 
            return;
        }
            vehiclesToDisplay.length && getVehicles();
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
        setVehiclesList(vehiclesList.filter(vehicle => vehicle.id !== id));
        } catch(e){
            console.log(e);
        }
    };

    return (
        <div className='homePage'>
            <div id='mobile-search-side-menu' className='mobile-search-side-menu fa fa-search' onClick={()=> setToDisplaySideMenu(!toDisplaySideMenu)}></div>
            <Search  setVehiclesToDisplay={setVehiclesToDisplay} setNoResults={setNoResults} className={toDisplaySideMenu ? '' : 'hide'}/>
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
            {vehiclesToDisplay?.map(vehicle =><VehicleItem data={vehicle}  key={vehicle.id} deleteVehicle={deleteVehicle}/> )}
            {vehiclesToDisplay?.map(vehicle =><VehicleItem data={vehicle}  key={vehicle.id} deleteVehicle={deleteVehicle}/> )}
            {vehiclesToDisplay?.map(vehicle =><VehicleItem data={vehicle}  key={vehicle.id} deleteVehicle={deleteVehicle}/> )}
            {vehiclesToDisplay?.map(vehicle =><VehicleItem data={vehicle}  key={vehicle.id} deleteVehicle={deleteVehicle}/> )}
            {noResults && <div className='empty-results'> <h2>Sorry.... We couldn't find any matches to your search </h2></div>}
            </div> 
            {/* <Grid container sx={{ m: 3 }} spacing={2}>
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
            {vehiclesToDisplay?.map(vehicle => <Grid justifyContent="center" key={vehicle.id} item xs={6} md={4} lg={3}><VehicleItem data={vehicle}  key={vehicle.id} deleteVehicle={deleteVehicle}/></Grid> )}
            {noResults && <div className='empty-results'> <h2>Sorry.... We couldn't find any matches to your search </h2></div>}
            </Grid>  */}
        </div>
    );
};

Home.propTypes = {
    
};

export default Home;