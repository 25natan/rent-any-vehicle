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
import { margin } from "@mui/system";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";

const theme = createTheme();

export default function AddItem() {
  const [type, setType] = useState(null);
  const [price, setPrice] = useState(null);
  const [images, setImages] = useState([]);

  let navigate = useNavigate();
  const vehiclesCollectionRef = collection(db, "vehicles");
  const addVehiclesToDb = async () => {
    await addDoc(vehiclesCollectionRef, {type, price, renter: {name: auth.currentUser.displayName, id: auth.currentUser.uid}});
    navigate('/');
  }
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
          <BikeScooterIcon style={{ marginBottom: "10px" }} />
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
          <AttachMoneyIcon style={{ marginBottom: "10px" }} />
          <TextField
            id="outlined-number"
            label="Price (for houre)"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: 300 }}
            onChange={(e) => {
              console.log(e?.target?.value);
              setPrice(e?.target?.value);
            }}
          />
          <PhotoCamera sx={{ margin: "40px 0 20px 0" }} />
          {/* Add some images */}
          <ImageUploader images={images} setImages={setImages} />{" "}
          {/* <UploadButtons
              onChange={(e) => {
                setImages(e?.target?.value);
                console.log(e?.target?.value);
              }}
            /> */}
        </Box>
      </Container>
      <button onClick={addVehiclesToDb}>Submit</button>
    </ThemeProvider>
  );
}
const vihecleTypes = [
  "Van",
  "Taxi",
  "Bus",
  "Ambulance",
  "Skateboard",
  "Baby carriage",
  "Bicycle",
  "Mountain bike",
  "Scooter",
  "Motorcycle",
  "Fire engine",
  "Crane",
  "Forklift",
  "Tractor",
  "Recycling truck",
  "Cement mixer",
  "Dump truck",
  "Helicopter",
  "Airplane",
  "Carriage",
  "Rowboat",
  "Boat",
];