import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { userContext } from "../contexts/UserContext";

const DetailsPage = (props) => {
  const { getDetails, carDetails, addAndDelInCart } = useContext(userContext);
  const params = useParams();
  // console.log(params.id);
  useEffect(() => {
    getDetails(params.id);
  }, []);
  
  // console.log(props.cars);  
  // console.log(carDetails);
  return (
    <div>
      {carDetails ? (
        <div className="detail-page">
          Details Page
          <div className="detail-image">
            <img src={carDetails.image} alt="" />
          </div>
          <div>
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
                  <span>{carDetails.price}</span>
                </li>
              </ul>
              <p>{carDetails.description}</p>
            </div>

            <Button size="small" onClick={() => addAndDelInCart(carDetails)}>
              Make a request
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
