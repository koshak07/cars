export const calcSubPrice = (product) => {
    return product.count * product.room.price;
  };
export const calcTotalPrice = (cart) => {
    let sum = 0;
    cart.rooms.forEach((i) => {
      sum += i.subPrice;
    });
    return sum;
  };