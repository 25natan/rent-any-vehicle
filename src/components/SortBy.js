import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { sortTypes } from '../constants';

const animatedComponents = makeAnimated();

const SortBy = ({sortBy, setSortBy, maxPrice, setMaxPrice}) => {
    // const [minPrice, setMinPrice] = useState(0);
    return (<>
        <div className='filter-price'>
             {/* <div className='price'> */}
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
                 {/* <div><input type='range' min="1" max="1000" required onChange={e => {
                    setMaxPrice(parseInt(e?.target?.value));}}/> 
                </div>
                <div>{maxPrice}$ for houre</div> */}
            {/* </div> */}
            {/* <span className='price'><label>To</label>
            <input type='number' min={minPrice} max="10000" placeholder={minPrice} onChange={e => {
                    setMaxPrice(parseInt(e?.target?.value));}}/>$
                </span> */}
            <button className='filter'>Filter</button>
        </div>
        </>
    );
};

export default SortBy;