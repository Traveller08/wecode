import axios from 'axios';
import qs from "qs";
const baseURL = 'http://localhost:5001/api'; // Replace with your backend API URL

const api = axios.create({
  baseURL,
});
const sessionAlert = () =>{
  alert("session expired login again to continue...");
  window.location.href='/';
}
// Set the token for authenticated requests
const setAuthToken = (token) => {
  console.log("token in set auth  -> ", token);
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
    // sessionAlert();
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
    return response.data;
};
const getQuestions = async (token) => {
  if(token){
      setAuthToken(token);
      const response = await api.get('/question/all');
      return response.data;
  }
  return {status:"failed", data:{},message:"session expired"};
};

const askNewQuestion = async(token, data) =>{
  if(token){
    setAuthToken(token);
    const response = await api.post('/question/ask',{data});
    return response.data;
  }
  return {status:"failed", data:{},message:"session expired"};
}


const getComments = async (postid) => {
  setAuthToken(postid);
  const response = await api.get('/comment/all',{params:{postid:postid}});
  console.log("post id ",postid , "comments in api service ",response.data);
  return response.data;
};
const getReplies = async (commentid) => {
  const response = await api.get('/reply/all',{params:{commentid:commentid}});
  return response.data;
};


const getPostUser = async(postid) =>{
  const response = await api.get('/post/user', {params:{postid:postid}});
  return response.data;
}


const getUserDetails = async(userid) =>{
  const response = await api.get('/user/',{params:{userid:userid}});
  return response.data;
}

const createNewComment = async(token, data, parentid) =>{
  if(token){
    setAuthToken(token);
    console.log("data ", data, "parentid ", parentid);
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

const getProblems = async(tags,from, to) =>{
  const response = await api.get('/codeforces/problems', {
    params:{tags:tags,from:from,to:to},
    paramsSerializer: function(params) {
      return qs.stringify(params, {arrayFormat: 'repeat'})
   },
});
 console.log(response.data)
return response.data;
}
const getContests = async(contestType) =>{
  const response = await api.get('/codeforces/contests', {
    params:{contestType:contestType}
});
console.log(response.data)
return response.data;
}
const getContestProblems = async(contestId,cf_username) =>{
  const response = await api.get('codeforces/contest/problems',{
    params:{contestId:contestId,cf_username:cf_username}
  });
  return response.data;
}
const apiService = {
  setAuthToken,
  register,
  login,
  getProfile,
  createNewPost,
  createNewComment,
  createNewReply,
  getPosts,
  getComments,
  getPostUser,
  getUserDetails,
  getReplies,
  getProblems,
  getContests,
  getContestProblems,
  getQuestions,
  askNewQuestion
};

export default apiService;
