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
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase-config";
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';
import {vihecleTypes} from '../constants';
import { TextareaAutosize } from "@mui/material";

const theme = createTheme();

export default function AddItem({isAuth, userName}) {
  const [type, setType] = useState(null);
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState(null);
  const [images, setImages] = useState([]);

  let navigate = useNavigate();
  const vehiclesCollectionRef = collection(db, "vehicles");

  const addVehiclesToDb = async () => {
    try{
      const folderUniqueId = v4();
      await Promise.all(images.map(async img => {
        const imageRef = ref(storage, `images/${folderUniqueId}/${img?.file?.name}`);
        await uploadBytes(imageRef, img.file);
      }));
      const imagesRef = ref(storage, `images/${folderUniqueId}`);
      const imagesList = await listAll(imagesRef);
      const imagesItemUrls = await Promise.all(imagesList.items.map(async item => {return await getDownloadURL(item)}));
      await addDoc(vehiclesCollectionRef, {type, price, desc, imagesUrls: imagesItemUrls, renter:userName});
      alert('Item Upladed!');
    } catch (e) {
      console.log(e);
    }
    navigate('/');
  }

  useEffect(() => {
    if(!isAuth)  navigate('/signin');
  },[]);
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ marginTop: "100px" }}>
        {/* { <CssBaseline /> */}
        <Box 
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "10px",
          }}
        >
          <Icon color="primary" sx={{ fontSize: 40, marginBottom: "20px" }}>
            add_circle
          </Icon>
          <Typography
            component="h1"
            variant="h4"
            style={{ marginBottom: "30px" }}
          >
            Add Vehicle
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={vihecleTypes}
            onChange={(e) => {
              setType(e?.target?.innerText);
            }}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Vehicle Type"
                style={{ marginBottom: "30px" }}
              />
            )}
          />
          <TextField
            id="outlined-number"
            label="Price (for houre)"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: 300 }}
            onChange={(e) => {
              setPrice(e?.target?.value);
            }}
          />
           <Typography
            style={{ marginTop: "12px"}}
          >
          Description
          </Typography>
        <TextareaAutosize
            aria-label="Description"
            minRows={4}
            placeholder="Add some words..."
            style={{ width: 292 , fontFamily: 'ariel'}}
            onChange={(e) => {
              setDesc(e?.target?.value);
            }}
          />
          <PhotoCamera sx={{ margin: "40px 0 20px 0" }} />
          <ImageUploader images={images} setImages={setImages} />{" "}
        </Box>
      </Container>
      <button onClick={addVehiclesToDb}>Submit</button>
    </ThemeProvider>
  );
}
