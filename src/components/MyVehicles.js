import { getDocs } from 'firebase/firestore';
import { distanceBetween } from 'geofire-common';
import React from 'react';

const MyVehicles = () => {
    // const getMyVehicles = async () => {
    //     try{
    //         props.setIsLoading(true);
    //         const data = await getDocs(vehiclesCollectionRef);
    //         const vehiclesData = data.docs.map(doc => ({...doc.data(), id: doc.id }));
    //         navigator.geolocation.getCurrentPosition(deviceLocation => {
    //             const crd = [deviceLocation.coords.latitude, deviceLocation.coords.longitude];
    //             vehiclesData.forEach(vehicle => vehicle.distance = distanceBetween(crd, [vehicle.lat, vehicle.lng]));
    //             setVehiclesToDisplay(vehiclesData.map(vehicle => {
    //                 return { ...vehicle, rateAvg: parseInt(lodash.sum(vehicle.rate) / vehicle.rate.length) || 0 }
    //             }));
    //         });
    //         props.setIsLoading(false);
    //     } catch (e) {
    //         console.log(e);
    //         props.setIsLoading(false);
    //     }
    // }

    return (
        <div>
            
        </div>
    );
};

export default MyVehicles;