import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { storage } from '../firebase-config';
import {ref, listAll} from 'firebase/storage';

const MediaCard = (data) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="240"
        image={data.imagesUrls[0]}
        alt=""
      />
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
const getImages = async imageFolderRef => {
    const imagesRef = ref(storage, `images/${imageFolderRef}`);
    console.log('imagesRef', imagesRef);
    const imagesList = await listAll(imagesRef);
    console.log('!imagesList', imagesList);
};

const VehicleItem = ({data}) => {
    // const images = JSON.parse(data?.images);
    // data.mainImg = images[0]["data_url"];
//   const images = await getImages(data.imageFolderRef)

console.log('data', data);
    return MediaCard(data);
};

VehicleItem.propTypes = {
    
};

export default VehicleItem;