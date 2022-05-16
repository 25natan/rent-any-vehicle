import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';
import {db} from '../firebase-config';
import VehicleItem from './VehicleItem';
import { v4 } from 'uuid';

const Home = props => {
    const [vehiclesList, setVehiclesList] = useState([]);
    const vehiclesCollectionRef = collection(db, "vehicles");

    useEffect(() => {
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
            {vehiclesList.map(vehicle => vehicle.type && <VehicleItem data={vehicle} deleteVehicle={deleteVehicle} key={vehicle.id}/> )}
        </div>
    );
};

Home.propTypes = {
    
};

export default Home;