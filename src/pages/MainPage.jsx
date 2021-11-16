import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../contexts/UserContext";

import ToyotaModels from "../components/models/ToyotaModels";
import LexusModels from "../components/models/LexusModels";

export const MainPage = () => {
  const navigate = useNavigate();
  const { getCars, cars, currentPosts } = useContext(userContext);
  const [brandValue, setBrandValue] = useState("");
  let object = new URLSearchParams(window.location.search);
  function filterCars(key, value) {
    // console.log(key,value);
    object.set(key, value);
    let newUrl = `${window.location.pathname}?${object.toString()}`;
    navigate(newUrl);
    getCars();
    setBrandValue(value);
  }
  useEffect(() => {
    setBrandValue(object.get("brand"));
    //   console.log("SEARCH")
  }, [object]);

import Pagination from "../components/Pagination";


  useEffect(() => {
    getCars();
  }, []);

  return (
    <>

      <div>
        {/* <FilterOnMainPage/> */}
        <div className=" sidebar">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Brand
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={brandValue}
              onChange={(e) => {
                filterCars("brand", e.target.value);
              }}
              label="Brand"
            >
              <MenuItem value="">
                <em>Выберите бренд</em>
              </MenuItem>
              <MenuItem value="toyota">Toyota</MenuItem>
              <MenuItem value="lexus">Lexus</MenuItem>
              <MenuItem value="merc">Merc</MenuItem>
            </Select>
          </FormControl>

          {/* <FormControl component="fieldset">
            <FormLabel component="legend">Brand</FormLabel>
            <RadioGroup
              aria-label="gender"
              value={brandValue}
              name="radio-buttons-group"
              onChange={(e) => {
                filterCars("brand", e.target.value);
              }}
            >
              <FormControlLabel
                value="toyota"
                control={<Radio />}
                label="toyota"
              />
              <FormControlLabel
                value="lexus"
                control={<Radio />}
                label="Lexus"
              />
            </RadioGroup>
          </FormControl> */}
          {brandValue === "toyota" ? (
            <ToyotaModels brandValue={brandValue} filterCars={filterCars} />
          ) : brandValue === "lexus" ? (
            <LexusModels brandValue={brandValue} filterCars={filterCars} />
          ) : null}
        </div>
      </div>
      {cars ? (
        cars.map((item) => (
          <Card key={item.id} sx={{ maxWidth: 345, width: "345px" }}>
            <CardActionArea>
              <CardMedia
                // sx={{width:"100px"}}
                component="img"
                height="140"
                style={{ objectFit: "contain" }}
                image={item.image}
                alt=""
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.brand}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {item.model}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {item.color}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {item.yearOfIssue}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {item.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to={`/details/${item.id}`}>
                <Button size="small" color="primary">
                  Details
                </Button>
              </Link>
            </CardActions>
          </Card>
        ))
      ) : (
        <h2>Loading...</h2>
      )}

    </>
  );
};

export default MainPage;
