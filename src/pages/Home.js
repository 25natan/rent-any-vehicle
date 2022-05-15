import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDocs, collection, doc } from 'firebase/firestore';
import {db} from '../firebase-config';

const Home = props => {
    const [vehiclesList, setVehiclesList] = useState([]);
    const vehiclesCollectionRef = collection(db, "vehicles");

    useEffect(() => {
        const getVehicles = async () => {
            const data = await getDocs(vehiclesCollectionRef);
           setVehiclesList('data', data.docs.map(doc => ({...doc.data(), id: doc.id})));
        };
        getVehicles();
    }, []);

    return (
        <div className='homePage'>
            Home
        </div>
    );
};

Home.propTypes = {
    
};

export default Home;