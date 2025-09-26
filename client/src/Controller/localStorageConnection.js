export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("userToken");
};

export const sendTokenToLocalStorage = (token) => {
  localStorage.setItem("userToken", token);
};

export const sendProductIdToLocalStorage = (id) => {
  localStorage.setItem("productId", id);
};

export const getProductIdFromLocalStorage = () => {
  return localStorage.getItem("productId");
};

export const sendIdsToLocalStorage = (userId, cartId, userSettingId) => {
  const IdObject = { userId, cartId, userSettingId };

  localStorage.setItem("UserIds", JSON.stringify(IdObject));
};

export const getIdsFromLocalStorage = () => {
  return localStorage.getItem("UserIds");
};
