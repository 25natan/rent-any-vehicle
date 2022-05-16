import React from 'react';
import {vihecleTypes} from '../constants';

const Filters = ({vehiclesList, setVehiclesToDisplay}) => {

    const filterType = type => {
        setVehiclesToDisplay(vehiclesList.filter(vehicle => vehicle.type === type));
    };

    return (
        <>
        <div className='filters'>
            {
                vihecleTypes.map(type => <button className='filter-btn' onClick={() => filterType(type)}>{type}</button>)
            }
        </div>
        <button className='display-all' onClick={() => setVehiclesToDisplay(vehiclesList)}>Display All</button>
        </>
    );
};

export default Filters;