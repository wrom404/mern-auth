import Cookies from "js-cookie";

const isAuthenticated = () => {
  console.log(`Token is: ${Cookies.get("token")}`);
  return !!Cookies.get("token"); //Check if a theres a token
};

export default isAuthenticated;
