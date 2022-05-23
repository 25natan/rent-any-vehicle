import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import VehicleItemModal from './VehicleItemModal';

const MediaCard = ({data, deleteVehicle, userName}) => {
  return (
    <Card sx={{ maxWidth: 345 }} >
      <button className='open-modal-btn' data-target={`simpleModal_${data.id}`} data-toggle="modal">...</button>
      <CardMedia
        component="img"
        height="200"
        image={data.imagesUrls[0] || '/no-img.jpg'}
        alt=""
      />
     {data.renter === userName && <Button className='delete-vehicle' onClick={() => {deleteVehicle(data.id)}}>&#128465;</Button>}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.type}
        </Typography>
        <div className='short-desc'>{data.desc}</div>
        <div className='stars'>{Array(data.rateAvg).fill().map(()=> <i key={Math.random()} className='fa fa-star fa-2x'></i>)}</div>
      </CardContent>
      <CardContent className='small-card-footer'>
        <div className='price'>{data.price} $</div>
        <div className='distance'>{data.distance?.toFixed(1)} km</div>
        </CardContent>
    </Card>
  );
}

const VehicleItem = ({data, deleteVehicle, userName}) => {
    return<div className='vehicle-card'>
      <div className='small-vehicle-item'>
      { MediaCard({data, deleteVehicle, userName})}
      </div>
      {VehicleItemModal(data, userName)}
    </div>; 
};

export default VehicleItem;