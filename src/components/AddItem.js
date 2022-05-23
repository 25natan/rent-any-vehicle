import { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import UploadButtons from "../UploadButton";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import BikeScooterIcon from "@mui/icons-material/BikeScooter";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import ImageUploader from "../ImageUpload";
import { useState } from "react";
import { setDoc, collection, deleteDoc, doc , addDoc} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase-config";
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';
import {vihecleTypes} from '../constants';
import { TextareaAutosize } from "@mui/material";
import { geohashForLocation } from "geofire-common";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const theme = createTheme();

export default function AddItem({isAuth, userName,  setIsLoading}) {
  const [type, setType] = useState(null);
  const [location, setLocation] = useState([0.5,0.5]);
  const [place, setPlace] = useState('place?');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState(null);
  const [images, setImages] = useState([]);

  let navigate = useNavigate();
  const vehiclesCollectionRef = collection(db, "vehicles");

  const initialize = () => {
    const google = window.google;
    var input = document.getElementById('location-field');
    var autocomplete = new google.maps.places.Autocomplete(input);
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
          var place = autocomplete.getPlace();
          const crd = [place.geometry.location.lat(), place.geometry.location.lng()]
          const placeName = place.formatted_address;
          setLocation(crd);
          setPlace(placeName);
      });
  }

  const addVehiclesToDb = async event => {
    event.preventDefault();
    try{
      setIsLoading(true);
      const [type, price, desc] = [event.target.type.value, event.target.price.value, event.target.desc.value];
      console.log('type, price, desc', type, price, desc);
      const folderUniqueId = v4();
      await Promise.all(images.map(async img => {
        const imageRef = ref(storage, `images/${folderUniqueId}/${img?.file?.name}`);
        await uploadBytes(imageRef, img.file);
      }));
      const imagesRef = ref(storage, `images/${folderUniqueId}`);
      const imagesList = await listAll(imagesRef);
      const imagesItemUrls = await Promise.all(imagesList.items.map(async item => {return await getDownloadURL(item)}));
      await addDoc(vehiclesCollectionRef, {type, price, desc, imagesUrls: imagesItemUrls, renter: userName,
        lat:location[0], lng:location[1], rate:[], geohash: geohashForLocation(location), placeName: place});
        setIsLoading(false);
      alert('Item Upladed!');
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
    navigate('/');
  }

  useEffect(() => {
    if(!isAuth)  navigate('/signin');
    else initialize();
  },[]);
  
  return (
    <div className="add-vehicle-page">
        <form className="signup-form" onSubmit={addVehiclesToDb}>
        <h1>Add Vehicle</h1>
        <Icon color="primary" sx={{ fontSize: 40, marginBottom: "20px" }}>
           add_circle
         </Icon>
         <label>Vehicle Type</label>
          <Select
                name='type' 
                required
                options={vihecleTypes.map(type => {return {value: type, label: type}})} 
            />
          <label>Location</label>
          <input  name='location' id={'location-field'} required />
          <label>Price ($ for houre)</label>
          <input type='number' min='0' name='price'></input>
          <label>Description</label>
          <textarea
          name='desc'
            className="add-item-desc"
            aria-label="Description"
            placeholder="Add some words..."  
          />
          <PhotoCamera sx={{ margin: "40px 0 20px 0" }} />
         <ImageUploader images={images} setImages={setImages} />{" "}
          <button className="submit-upload" type='submit'>Submit</button>
        <span className="error" aria-live="polite">{}</span>
        </form>
  </div>
  );
}
