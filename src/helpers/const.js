export const calcSubPrice = (product) => {
  console.log(product)
    return product.count * product.car.price;
  };
export const calcTotalPrice = (cart) => {
    let sum = 0;
    cart.cars.forEach((i) => {
      sum += i.subPrice;
    });
    return sum;
  };