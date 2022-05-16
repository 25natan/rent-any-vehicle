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

const MediaCard = ({data, deleteVehicle, userName}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
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
        <Typography variant="body2" color="text.secondary">
    {data.desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography size="small">{data.price} $</Typography>
        <Button size="small">Description</Button>
      </CardActions>
    </Card>
  );
}


const VehicleItem = ({data, deleteVehicle, userName}) => {
    console.log('data', data);
    return MediaCard({data, deleteVehicle, userName});
};

VehicleItem.propTypes = {
    
};

export default VehicleItem;