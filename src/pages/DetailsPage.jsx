import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { userContext } from "../contexts/UserContext";

const DetailsPage = () => {
  const { getDetails, carDetails, addAndDelInCart, checkInCart } =
    useContext(userContext);
  const params = useParams();
  useEffect(() => {
    getDetails(params.id);
  }, []);

  return (
    <div>
      {carDetails ? (
        <div className="detail-page">
          <div className="detail-image">
            <img style={{maxWidth: "60em", maxHeight: "40em"}} src={carDetails.image} alt="" />
          </div>
          <div className="detail-info">
            <h2>{carDetails.brand}</h2>
            <h3>{carDetails.model}</h3>

            <div>
              <ul>
                <li>
                  <strong>color:</strong>
                  <span>{carDetails.color}</span>
                </li>
                <li>
                  <strong>Year of issue:</strong>
                  <span>{carDetails.yearOfIssue}</span>
                </li>
                <li>
                  <strong>Price:</strong>
                  <span>{carDetails.price}$</span>
                </li>
              </ul>
              <p>{carDetails.description}</p>
            </div>

            <Button size="small" onClick={() => addAndDelInCart(carDetails)}>
              {checkInCart(carDetails.id) ? (
                <h2>Requested</h2>
              ) : (
                <h2>Make a request</h2>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default DetailsPage;
