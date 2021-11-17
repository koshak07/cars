import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../contexts/UserContext";

const CartPage = () => {
  const { cart, getCart, changeCountInCart } = useContext(userContext);
  console.log(cart);
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div>
      <h2>Cart</h2>
      {cart ? (
        cart.cars.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell align="right">Brand</TableCell>
                  <TableCell align="right">Model</TableCell>
                  <TableCell align="right">Color</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.cars.map((i) => (
                  <TableRow
                    key={i.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img width="120px" src={i.car.image} alt="" />
                    </TableCell>
                    <TableCell align="right">{i.car.brand}</TableCell>
                    <TableCell align="right">{i.car.model}</TableCell>
                    <TableCell align="right">{i.car.color}</TableCell>
                    <TableCell align="right">{i.car.price}$</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableRow>
                <TableCell colSpan={4} align="right">
                  Total :
                </TableCell>
                <TableCell colSpan={1} align="right">
                  {cart.totalPrice}$
                </TableCell>
              </TableRow>
              <Link to="/cart/order">
              <button>Make a Reguest</button>
              </Link>
            </Table>
          </TableContainer>
        ) : (
          <h2>Cart is empty</h2>
        )
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default CartPage;
