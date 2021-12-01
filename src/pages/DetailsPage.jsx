import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import Comments from "../components/Comments";
import { userContext } from "../contexts/UserContext";

const DetailsPage = () => {
  const { getDetails, roomDetails, addAndDelInCart, checkInCart } =
    useContext(userContext);
  const params = useParams();
  useEffect(() => {
    getDetails(params.id);
  }, []);

  return (
    <div>
      {roomDetails ? (
        <div className="detail-page">
          <div className="detail-image">
            <img style={{maxWidth: "60em", maxHeight: "40em"}} src={roomDetails.image} alt="" />
          </div>
          <div className="detail-info">
            <h2>{roomDetails.roomType}</h2>
            <h3>{roomDetails.guests}</h3>

            <div>
              <ul>
                <li>
                  <strong>Room size:</strong>
                  <span>{roomDetails.roomSize}</span>
                </li>
                <li>
                  <strong>Room price:</strong>
                  <span>{roomDetails.roomPrice}</span>
                </li>
              </ul>
              <p>{roomDetails.description}</p>
            </div>

            <Button size="small" onClick={() => addAndDelInCart(roomDetails)}>
              {checkInCart(roomDetails.id) ? (
                <h2>Запросить</h2>
              ) : (
                <h2>Сделать запрос</h2>
              )}
            </Button>
          </div>
          <Comments commentId={roomDetails.id} />
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default DetailsPage;
