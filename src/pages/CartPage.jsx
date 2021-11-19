import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../contexts/UserContext";

const CartPage = () => {
  const { cart, getCart, changeCountInCart } = useContext(userContext);
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="cart">
      {cart ? (
        cart.cars.length > 0 ? (
          <TableContainer
            component={Paper}
            style={{ backgroundColor: "lightgray" }}
          >
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
              <TableRow>
                <TableCell  colSpan={5} align="right">
                  <Link to="/cart/order">
                    <Stack  direction="row-reverse" spacing={2}>
                    <Button style={{color: "lightblue"}} variant="contained" endIcon={<SendIcon />}>
                      Make a Reguest
                    </Button>
                    </Stack>
                  </Link>
                </TableCell>
              </TableRow>
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
