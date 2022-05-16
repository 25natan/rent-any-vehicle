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

const MediaCard = (data, deleteVehicle) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="240"
        image={data.imagesUrls[0]}
        alt=""
      />
      <Button className='delete-vehicle' onClick={() => {deleteVehicle(data.id)}}>&#128465;</Button>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
    {data.desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}


const VehicleItem = ({data, deleteVehicle}) => {
    console.log('data', data);
    return MediaCard(data, deleteVehicle);
    // return <div className='vehicle-card'>
    //     <div onClick={()=> deleteVehicle(data.id)}>&#128465;</div>
    //     <div className='header'>{data.type}</div>
    //     <img src={data.imagesUrls[0]} alt='' width={'300px'}/>
    //     <div>price: {data.price}</div>
    // </div>
};

VehicleItem.propTypes = {
    
};

export default VehicleItem;