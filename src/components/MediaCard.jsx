import React, { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { auserContext } from "../contexts/AuserContext";
import { Link } from "react-router-dom";

export const MediaCard = () => {
  const { getCars, cars } = useContext(auserContext);

  useEffect(() => {
    getCars();
  }, []);
  // getCars()
  return (
    <>
      {cars ? (
        cars.map((item) => (
          <Card key={item.id} sx={{ maxWidth: 345, width: "345px" }}>
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
              <Link to={`auser/edit/${item.id}`}>

              <Button size="small" color="primary">
                Edit Car
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

export default MediaCard;
