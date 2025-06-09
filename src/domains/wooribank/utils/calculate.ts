const formattedPrice = (price: string) => {
  const priceNum = parseFloat(price);
  return priceNum.toLocaleString("en-US");
};

export const calculate = { formattedPrice };
