import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { sortTypes } from '../constants';

const animatedComponents = makeAnimated();

const SortBy = ({sortBy, setSortBy, maxPrice, setMaxPrice}) => {
    return (<>
        <div className='filter-price'>
                 <div>Sort by</div>
                 <Select 
                required
                closeMenuOnSelect={false}
                placeholder='sort by...'
                components={animatedComponents} 
                options={sortTypes.map(type => {return {value: type, label: type}})} 
                onChange={e => {
                    setSortBy(e.value);
                    console.log('e',e);
                }}/>
            
            <button className='filter'>Filter</button>
        </div>
        </>
    );
};

export default SortBy;