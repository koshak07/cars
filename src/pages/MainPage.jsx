import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {Button, CardActionArea, CardActions, FormControl, InputLabel, MenuItem,Select,} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import Pagination from "../components/Pagination";
import DoubleBasic from "../components/type/DoubleBasic";
import DoubleDeluxe from "../components/type/DoubleDeluxe";
import DoubleStandart from "../components/type/DoubleStandart";
import EthnoBasic from "../components/type/EthnoBasic";
import EthnoDeluxe from "../components/type/EthnoDeluxe";
import EthnoStandart from "../components/type/EthnoStandart";
import FamilyBasic from "../components/type/FamilyBasic";
import FamilyStandart from "../components/type/FamileStandart";
import FamilyDeluxe from "../components/type/FamilyDeluxe";

export const MainPage = () => {
  const navigate = useNavigate();
  const { getRooms, rooms, currentPost } = useContext(userContext);
  const [roomTypeValue, setRoomTypeValue] = useState("");

  const [roomSizeValue, setRoomSizeValue] = useState("");
  let object = new URLSearchParams(window.location.search);
  function filterRooms(key, value) {
    object.set(key, value);
    let newUrl = `${window.location.pathname}?${object.toString()}`;
    navigate(newUrl);
    getRooms();
    setRoomTypeValue(value);
  }

  function filterRoomsRoomSize(key, value) {
    object.set(key, value);
    let newUrl = `${window.location.pathname}?${object.toString()}`;
    navigate(newUrl);
    getRooms();
    setRoomSizeValue(value);
  }
  
  useEffect(() => {
    setRoomTypeValue(object.get("roomType"));
  }, [object]);

  useEffect(() => {
    setRoomSizeValue(object.get("roomSize"));
  }, [object]);

  useEffect(() => {
    getRooms();
  }, []);
  return (
    <>
      <div className="main-page">
        <div
          style={{
            background:
              "url(https://1.bp.blogspot.com/-3YYwzCWMImE/XXdMrPe83lI/AAAAAAAAFnY/0qkbKN8SERkHpEdE6wTxn7vS2BWYydi3ACLcBGAs/s1600/EDY_B0nUEAEidHU.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            height: "500px",
          }}
        ></div>
        <div className="filter">
          <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={roomTypeValue}
              onChange={(e) => {
                filterRooms("roomType", e.target.value);
              }}
              label="RoomType"
            >
              <MenuItem value="Choice">
                <em>Выберите тип комнат</em>
              </MenuItem>
              <MenuItem value="Double Basic">Double Basic</MenuItem>
              <MenuItem value="Double Deluse">Double Deluse</MenuItem>
              <MenuItem value="Double Standart">Double Standart</MenuItem>
              <MenuItem value="Ethno Basic">Ethno Basic</MenuItem>
              <MenuItem value="Ethno Deluxe">Ethno Deluxe</MenuItem>
              <MenuItem value="Ethno Standart">Ethno Standart</MenuItem>
              <MenuItem value="Family Basic">Family Basic</MenuItem>
              <MenuItem value="Family Deluxe">Family Deluxe</MenuItem>
              <MenuItem value="Family Standart">Family Standart</MenuItem>
            </Select>
          </FormControl>

          {/* model */}
          {roomTypeValue === "Choice" ? (
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-outlined-label">
                Выберите кол комнат
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
              ></Select>
            </FormControl>
          ) : roomTypeValue === "Double Basic" ? (
            <DoubleBasic
              roomSizeValue={roomSizeValue}
              filterRoomsRoomSize={filterRoomsRoomSize}
            />
          ) : roomTypeValue === "Double Deluxe" ? (
            <DoubleDeluxe
              roomSizeValue={roomSizeValue}
              filterRoomsRoomSize={filterRoomsRoomSize}
            />
          ) : roomTypeValue === "Double Standart" ? (
            <DoubleStandart
              roomSizeValue={roomSizeValue}
              filterRoomsRoomSize={filterRoomsRoomSize}
            />
          ) : roomTypeValue === "Ethno Basic" ? (
            <EthnoBasic
              roomSizeValue={roomSizeValue}
              filterRoomsRoomSize={filterRoomsRoomSize}
            />
          ) : roomTypeValue === "Ethno Deluxe" ? (
            <EthnoDeluxe
              roomSizeValue={roomSizeValue}
              filterRoomsRoomSize={filterRoomsRoomSize}
            />
          ) : roomTypeValue === "Ethno Standart" ? (
            <EthnoStandart
              roomSizeValue={roomSizeValue}
              filterRoomsRoomSize={filterRoomsRoomSize}
            />
          ) : roomTypeValue === "Family Basic" ? (
            <FamilyBasic
              roomSizeValue={roomSizeValue}
              filterRoomsRoomSize={filterRoomsRoomSize}
            />
          ) : roomTypeValue === "Family Deluxe" ? (
            <FamilyDeluxe
              roomSizeValue={roomSizeValue}
              filterRoomsRoomSize={filterRoomsRoomSize}
            />
          ) : roomTypeValue === "Family Standart" ? (
            <FamilyStandart
              roomSizeValue={roomSizeValue}
              filterRoomsRoomSize={filterRoomsRoomSize}
            />
          ) : null}
        </div>
        <div className="rooms">
          {currentPost ? (
            currentPost.map((item) => (
              <Link
                to={`/details/${item.id}`}
                style={{ textDecoration: "none", margin: "0.8em" }}
              >
                <Card key={item.id} sx={{ maxWidth: 340, width: "305px" }}>
                  <CardActionArea style={{ backgroundColor: "azure" }}>
                    <CardMedia
                      sx={{ width: "23em", height: "20em" }}
                      component="img"
                      height="140"
                      style={{ objectFit: "cover", marginTop: "0px" }}
                      image={item.image}
                      alt=""
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.roomType}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.roomSize}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.roomPrice}$
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description.slice(0, 50)}...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Информация
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
      </div>
    </>
  );
};

export default MainPage;
