export const GetTotalPrice = (mergedData) => {
  let totalPrice = 0;

  let quantity = [];
  let pricePerItems = [];

  mergedData.forEach((element) => {
    quantity.push(element.quantity);
    pricePerItems.push(element.details.fetchedProduct.price);
  });

  for (let i = 0; i < quantity.length; i++) {
    totalPrice += quantity[i] * pricePerItems[i];
  }

  return totalPrice;
};

export const GetDiscountedPrice = (totalPrice, discount) => {
  return totalPrice - (totalPrice * discount) / 100;
};

export const GetPriceConvientFees = (totalPrice, fees, discount) => {
  console.log("Total Price", totalPrice);

  let discountPrice = GetDiscountedPrice(totalPrice, discount);

  let conviened = (discountPrice * fees) / 100;
  let conPrice = discountPrice + conviened;
  return conPrice;
};

/* Types */

export const SetProductAttribute = (
  product,
  setHeadphoneType,
  setCompany,
  setColor,
  setPrice
) => {
  console.log(product);
  let headPhoneTypes = [];
  let companies = [];
  let Color = [];
  let Price = [];

  headPhoneTypes.push("None");
  companies.push("None");
  Color.push("None");
  Price.push("None");

  for (let i = 0; i < product.length; i++) {
    let headPhoneType = product[i].productType;
    let company = product[i].brand;
    let color = product[i].color;
    let price = product[i].price;

    if (!headPhoneTypes.includes(headPhoneType)) {
      headPhoneTypes.push(headPhoneType);
    }

    if (!companies.includes(company)) {
      companies.push(company);
    }

    if (!Color.includes(color)) {
      Color.push(color);
    }

    if (!Price.includes(price)) {
      Price.push(price);
    }
  }

  setHeadphoneType(headPhoneTypes);
  setCompany(companies);
  setColor(Color);
  setPrice(Price);

  return;
};
