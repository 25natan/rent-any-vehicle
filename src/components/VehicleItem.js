import React from 'react';
import VehicleItemModal from './VehicleItemModal';

const VehicleItem = ({data, deleteVehicle, userName}) => {
  const openModal =e => {
    var modalId = `simpleModal_${data.id}`;
    document.getElementById(modalId).classList.add('open');
    e.preventDefault();
  };

    return<div className='vehicle-card' onClick={openModal}>
      <div className='small-vehicle-item'>
        <div className='vehicle-item-small'>
        <div className='cover-img'><img src={data.imagesUrls[0] || '/no-img.jpg'} alt=''/></div>
      {data.renter === userName && <button className='delete-vehicle' onClick={(e) => {deleteVehicle(data.id);}}>&#128465;</button>}
        <div className='card-center-row'>
        <div className='type'>
            {data.type}
        </div>
          <div className='short-desc'>{data.desc}</div>
          <div className='stars'>{Array(data.rateAvg).fill().map(()=> <i key={Math.random()} className='fa fa-star fa-2x'></i>)}</div>
        </div>
        <div className='small-card-footer'>
          <div className='price'>{data.price} $</div>
          <div className='location'>{data.placeName}</div>
          <div className='distance'>{data.distance?.toFixed(1)} km</div>
          </div>
      </div>
      </div>
      {VehicleItemModal(data, userName)}
    </div>; 
};

export default VehicleItem;