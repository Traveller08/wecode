import axios from 'axios';

const baseURL = 'http://localhost:5000/'; // Replace with your backend API URL

const api = axios.create({
  baseURL,
});
const sessionAlert = () =>{
  alert("session expired login again to continue...");
  window.location.href='/';
}
// Set the token for authenticated requests
const setAuthToken = (token) => {
  if (token) {
    // const authtoken = token;
    // console.log("token ", Cookies);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
    sessionAlert();
  }
};

// Register a new user
const register = async (firstName, lastName, username, password) => {
  const response = await api.post('/user/register', {
    firstName,
    lastName,
    username,
    password
  });
  return response.data;
};

const getHistoricalData = async (token,symbol, from_date, to_date) =>{
  if(token){
    setAuthToken(token);
    const response = await api.post('/historical-data',{symbol, from_date, to_date});
    return response.data;
  }
  sessionAlert();
  return {status:"failed",data:"", message:"session expired"};
}
const getPortfolioHoldings = async (token) =>{
  if(token){
    setAuthToken(token);
    const response = await api.get('/portfolio/holdings');
    return response.data;
  }
  sessionAlert();
  return {status:"failed",data:{}, message:"session expired"};
}

const getProfile = async (token) => {
  if(token){
    setAuthToken(token);
    const response = await api.get('/user/profile');
    return response.data;
  }
  return {status:"failed", data:{},message:"session expired"};

};

const login = async (username, password) => {

    const response = await api.post('/user/login', { username, password });
    return response.data;
  
};

const getSymbols = async (token) => {
  if(token){
    setAuthToken(token);
    const response = await api.get('/symbols');
    return response.data;
  }
  sessionAlert();
  return {status:"failed",data:{}, message:"session expired"};
};


const placeOrder = async (token,symbol, price, quantity) => {
  if(token){
    setAuthToken(token);
    const response = await api.post('/order/place_order', {
      symbol,
      price,
      quantity,
    });
    return response.data;
  }
  sessionAlert();
  return {status:"failed",data:{}, message:"session expired"};
};

const apiService = {
  setAuthToken,
  register,
  login,
  getProfile,
  getPortfolioHoldings,
  getHistoricalData,
  placeOrder,
  getSymbols
};

export default apiService;
