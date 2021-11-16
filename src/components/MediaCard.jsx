import React, { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { adminContext } from "../contexts/AdminContext";

export const MediaCard = (props) => {
  const { getCars, cars, deleteCar } = useContext(adminContext);

  useEffect(() => {
    getCars();
  }, []);
  // getCars()
  return (
    <>
      {cars ? (
        cars.map((item) => (
          <Card
            key={item.id}
            sx={{ maxWidth: 345, width: "345px", marginTop: "50px" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                style={{ objectFit: "contain" }}
                image={item.image}
                alt="green iguana"
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
              <Link to={`/admin/edit/${item.id}`}>
                <Button size="small" color="primary">
                  Edit Car
                </Button>
              </Link>
              <Button
                onClick={() => deleteCar(item.id)}
                size="small"
                color="error"
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default MediaCard;
