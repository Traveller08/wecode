import axios from 'axios';

const baseURL = 'http://localhost:5000/api'; // Replace with your backend API URL

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
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
    sessionAlert();
  }
};

// Register a new user
const register = async (userdetails) => {
  const response = await api.post('/user/register',userdetails);
  return response.data;
};
const createNewPost = async(token, data) =>{
  if(token){
    setAuthToken(token);
    const response = await api.post('/post/create',{data});
    return response.data;
  }
  return {status:"failed", data:{},message:"session expired"};
}

const getPosts = async () => {
 
    const response = await api.get('/post/all');
    console.log("response at apiserver ", response);
    return response.data;
 

};
const createNewComment = async(token, data, parentid) =>{
  if(token){
    setAuthToken(token);
    const response = await api.post('/comment/create',{data,parentid});
    return response.data;
  }
  return {status:"failed", data:{},message:"session expired"};
}

const createNewReply = async(token, data, parentid) =>{
  if(token){
    setAuthToken(token);
    const response = await api.post('/reply/create',{data,parentid});
    return response.data;
  }
  return {status:"failed", data:{},message:"session expired"};
}



const getProfile = async (token) => {
  if(token){
    setAuthToken(token);
    const response = await api.get('/user/profile');
    return response.data;
  }
  return {status:"failed", data:{},message:"session expired"};

};

const login = async (userdetails) => {
    const response = await api.post('/user/login', userdetails);
    return response.data;
};


const apiService = {
  setAuthToken,
  register,
  login,
  getProfile,
  createNewPost,
  createNewComment,
  createNewReply,
  getPosts,
};

export default apiService;
