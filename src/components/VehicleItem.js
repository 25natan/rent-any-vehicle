import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { storage, db } from '../firebase-config';
import {ref, listAll} from 'firebase/storage';
import { deleteDoc, doc } from 'firebase/firestore';
import VehicleItemModal from './VehicleItemModal';

const MediaCard = ({data, deleteVehicle, userName}) => {
  return (
    <Card sx={{ maxWidth: 345 }} >
      <CardMedia
        component="img"
        height="140"
        image={data.imagesUrls[0]}
        alt=""
      />
     {data.renter === userName && <Button className='delete-vehicle' onClick={() => {deleteVehicle(data.id)}}>&#128465;</Button>}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.type}
        </Typography>
        <div className='short-desc'>{data.desc}</div>
      </CardContent>
      <CardActions>
        <div className='price'>{data.price} $</div>
        {VehicleItemModal(data)}
      </CardActions>
    </Card>
  );
}

const VehicleItem = ({data, deleteVehicle, userName}) => {
    return <div className='vehicle-card' id={`card-${data.id}`} data-bs-toggle="modal" href={`#exampleModalToggle${data.id}`} role="button">{
    MediaCard({data, deleteVehicle, userName})}
    </div>; 
};

VehicleItem.propTypes = {
    
};

export default VehicleItem;