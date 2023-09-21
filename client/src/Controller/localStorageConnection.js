export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("userToken");
};

export const sendTokenToLocalStorage = (token) => {
  localStorage.setItem("userToken", token);
};
