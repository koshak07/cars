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
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import Pagination from "../components/Pagination";
import ToyotaModels from "../components/models/ToyotaModels";
import LexusModels from "../components/models/LexusModels";
import MercModels from "../components/models/MercModels";
import BMWModels from "../components/models/BMWModels";
import FerrariModels from "../components/models/FerrariModels";
import LamborghiniModels from "../components/models/LamborghiniModels";
import LandRoverModels from "../components/models/LandRoverModels";
import PorscheModels from "../components/models/PorscheModel";
import RollsRoyceModels from "../components/models/RollsRoyceModels";
import SubaruModels from "../components/models/SubaruModels";

export const MainPage = () => {
  const navigate = useNavigate();
  const { getCars, cars, currentPost } = useContext(userContext);
  const [brandValue, setBrandValue] = useState("");

  const [modelValue, setModelValue] = useState("");
  const [colorValue, setColorValue] = useState("");
  let object = new URLSearchParams(window.location.search);
  function filterCars(key, value) {
    object.set(key, value);
    let newUrl = `${window.location.pathname}?${object.toString()}`;
    navigate(newUrl);
    getCars();
    setBrandValue(value);
  }

  function filterCarsModel(key, value) {
    object.set(key, value);
    let newUrl = `${window.location.pathname}?${object.toString()}`;
    navigate(newUrl);
    getCars();
    setModelValue(value);
  }
  function filterCarsColor(key, value) {
    object.set(key, value);
    let newUrl = `${window.location.pathname}?${object.toString()}`;
    navigate(newUrl);
    getCars();
    setModelValue(value);
  }
  useEffect(() => {
    setBrandValue(object.get("brand"));
  }, [object]);

  useEffect(() => {
    setModelValue(object.get("model"));
  }, [object]);
  useEffect(() => {
    setColorValue(object.get("color"));
  }, [object]);

  useEffect(() => {
    getCars();
  }, []);

  return (
    <>
      <div className="main-page">
        {/* <FilterOnMainPage/> */}
        <div className="filter">
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
              <MenuItem value="Choice">
                <em>Выберите бренд</em>
              </MenuItem>
              <MenuItem value="Toyota">Toyota</MenuItem>
              <MenuItem value="Lexus">Lexus</MenuItem>
              <MenuItem value="Mercedes-Benz">Mercedes-Benz</MenuItem>
              <MenuItem value="BMW">BMW</MenuItem>
              <MenuItem value="Ferrari">Ferrari</MenuItem>
              <MenuItem value="Lamborghini">Lamborghini</MenuItem>
              <MenuItem value="LandRover">LandRover</MenuItem>
              <MenuItem value="Porsche">Porsche</MenuItem>
              <MenuItem value="Rolls-Royce">Rolls-Royce</MenuItem>
              <MenuItem value="Subaru">Subaru</MenuItem>
            </Select>
          </FormControl>

          {/* model */}
          {brandValue === "Choice" ? (
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Выберите бренд</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              
            >
             
              
            </Select>
          </FormControl>
          ) : brandValue === "Lexus" ? (
            <LexusModels
              modelValue={modelValue}
              filterCarsModel={filterCarsModel}
            />
          ) : brandValue === "Mercedes-Benz" ? (
            <MercModels
              modelValue={modelValue}
              filterCarsModel={filterCarsModel}
            />
          ) : brandValue === "BMW" ? (
            <BMWModels
              modelValue={modelValue}
              filterCarsModel={filterCarsModel}
            />
          ) : brandValue === "Ferrari" ? (
            <FerrariModels
              modelValue={modelValue}
              filterCarsModel={filterCarsModel}
            />
          ) : brandValue === "Lamborghini" ? (
            <LamborghiniModels
              modelValue={modelValue}
              filterCarsModel={filterCarsModel}
            />
          ) : brandValue === "LandRover" ? (
            <LandRoverModels
              modelValue={modelValue}
              filterCarsModel={filterCarsModel}
            />
          ) : brandValue === "Porsche" ? (
            <PorscheModels
              modelValue={modelValue}
              filterCarsModel={filterCarsModel}
            />
          ) : brandValue === "Rolls-Royce" ? (
            <RollsRoyceModels
              modelValue={modelValue}
              filterCarsModel={filterCarsModel}
            />
          ) : brandValue === "Subaru" ? (
            <SubaruModels
              modelValue={modelValue}
              filterCarsModel={filterCarsModel}
            />
          ) : brandValue === "Toyota" ? (
            <ToyotaModels
              modelValue={modelValue}
              filterCarsModel={filterCarsModel}
            />
          ) : null}
          {/* color */}
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Color
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={colorValue}
              onChange={(e) => {
                filterCarsColor("color", e.target.value);
              }}
              label="Color"
            >
              <MenuItem value="">
                <em>Выберите цвет</em>
              </MenuItem>
              <MenuItem value="black">black</MenuItem>
              <MenuItem value="white">white</MenuItem>
              <MenuItem value="blue">blue</MenuItem>
              <MenuItem value="green">green</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="cars">
        {currentPost ? (
          currentPost.map((item) => (
            <Link
              to={`/details/${item.id}`}
              style={{ textDecoration: "none", margin: "0.8em" }}
            >
              <Card key={item.id} sx={{ maxWidth: 345, width: "345px" }}>
                <CardActionArea style={{ backgroundColor: "lightgray" }}>
                  <CardMedia
                    sx={{ width: "23em", height: "20em" }}
                    component="img"
                    height="140"
                    style={{ objectFit: "cover", marginTop: "5px" }}
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
                      {item.price}$
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description.slice(0, 50)}...
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Details
                  </Button>
                </CardActions>
              </Card>
            </Link>
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
      <div>
        <Pagination />
      </div>
    </>
  );
};

export default MainPage;
