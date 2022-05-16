import React, { useEffect, useState } from 'react';
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';
import {db} from '../firebase-config';
import VehicleItem from './VehicleItem';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

const Home = props => {
    let navigate = useNavigate();
    const [vehiclesList, setVehiclesList] = useState([]);
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
                <Grid container sx={{ m: 3 }} spacing={2}>
                {vehiclesList.map(vehicle => vehicle.type && <Grid justifyContent="center" item xs={6} md={4} lg={3}><VehicleItem data={vehicle} deleteVehicle={deleteVehicle} key={vehicle.id}/></Grid> )}
                </Grid> 
        </div>
    );
};

Home.propTypes = {
    
};

export default Home;