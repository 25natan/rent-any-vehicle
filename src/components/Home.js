import React, { useEffect, useState } from 'react';
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';
import {db} from '../firebase-config';
import VehicleItem from './VehicleItem';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';

const Home = props => {
    let navigate = useNavigate();
    const [vehiclesList, setVehiclesList] = useState([]);
    const [vehiclesToDisplay, setVehiclesToDisplay] = useState([]);
    const vehiclesCollectionRef = collection(db, "vehicles");

    useEffect(() => {
        if(!props.isAuth)  navigate('/signin');
        const getVehicles = async () => {
            const data = await getDocs(vehiclesCollectionRef);
           setVehiclesList(data.docs.map(doc => ({...doc.data(), id: doc.id})));
        };
        getVehicles();
    }, []);

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
            <Filters vehiclesList={vehiclesList} setVehiclesToDisplay={setVehiclesToDisplay}/>
            {vehiclesToDisplay.map(vehicle => vehicle.type && <VehicleItem data={vehicle} deleteVehicle={deleteVehicle} key={vehicle.id}/> )}
        </div>
    );
};

Home.propTypes = {
    
};

export default Home;