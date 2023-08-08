import axios from "axios";
import qs from "qs";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const errorNotify = (message) => toast.error(message);

const baseURL = "http://localhost:5001/api"; // base url

const baseApiClient = axios.create({
  // for authorized endpoints
  baseURL,
});

const apiClient = axios.create({
  // for un-authorized endpoints
  baseURL, // Replace with your API base URL
});

baseApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if the error is due to JWT token expiration
    if (error.response.status === 401) {
      // Clear the token from local storage or cookies
      Cookies.remove("token");
      errorNotify("session expired");
      // Redirect the user to the login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

baseApiClient.interceptors.request.use(
  (config) => {
    // Get the JWT token from cookies or local storage (you can use whichever storage you are using)
    const token = Cookies.get("token"); // Replace "token" with the actual name of your token key

    if (token) {
      // Attach the token to the request's Authorization header
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // If there's an error with the request, handle it here
    return Promise.reject(error);
  }
);


// User ------------------------------------------

const register = async (userdetails) => {
  const response = await apiClient.post("/user/register", userdetails);
  return response.data;
};

const login = async (userdetails) => {
  const response = await apiClient.post("/user/login", userdetails);
  return response.data;
};

const getUserDetails = async () => {
  const response = await baseApiClient.get("/user/");
  return response.data;
};

const getProfile = async () => {
  const response = await baseApiClient.get("/user/profile");
  return response.data;
};

const updateUserDetails = async (userDetails) => {
  // function to update edited user details
  const response = await baseApiClient.post("/user/update", {
    data: { userDetails },
  });
  return response.data;
};


// POST --------------------------------------

const createNewPost = async (data) => {
  const response = await baseApiClient.post("/post/create", { data });
  return response.data;
};

const updatePost = async (postid, data) => {
  const response = await baseApiClient.post("/post/update", { postid, data });
  return response.data;
};

const deletePost = async (postid) => {
  const response = await baseApiClient.get("/post/delete", {
    params: { postid: postid },
  });
  return response.data;
};

const getPosts = async () => {
  if (Cookies.get("token")) {
    const response = await baseApiClient.get("/post/all");
    return response.data;
  } else {
    const response = await apiClient.get("/post/all");
    return response.data;
  }
};


// COMMENT -----------------------------------------------

const createNewComment = async (data, parentid) => {
  console.log("data ", data, "parentid ", parentid);
  const response = await baseApiClient.post("/comment/create", {
    data,
    parentid,
  });
  return response.data;
};

const updateComment = async (commentid, data) => {
  const response = await baseApiClient.post("/comment/update", {
    commentid,
    data,
  });
  return response.data;
};

const getComments = async (postid) => {
  const response = await apiClient.get("/comment/all", {
    params: { postid: postid },
  });
  return response.data;
};

const deleteComment = async (commentid) => {
  const response = await baseApiClient.get("/comment/delete", {
    params: { commentid: commentid },
  });
  return response.data;
};


// REPLIES ----------------------------------------------------

const createNewReply = async (data, parentid) => {
  const response = await baseApiClient.post("/reply/create", {
    data,
    parentid,
  });
  return response.data;
};

const updateReply = async (replyid, data) => {
  const response = await baseApiClient.post("/reply/update", { replyid, data });
  return response.data;
};

const getReplies = async (commentid) => {
  const response = await apiClient.get("/reply/all", {
    params: { commentid: commentid },
  });
  return response.data;
};

const deleteReply = async (replyid) => {
  const response = await baseApiClient.get("/reply/delete", {
    params: { replyid: replyid },
  });
  return response.data;
};


// CODEFORCES ---------------------------------------------------

const getProblems = async (tags, from, to) => {
  const response = await apiClient.get("/codeforces/problems", {
    params: { tags: tags, from: from, to: to },
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
  console.log(response.data);
  return response.data;
};

const getContests = async (contestType) => {
  const response = await apiClient.get("/codeforces/contests", {
    params: { contestType: contestType },
  });
  console.log(response.data);
  return response.data;
};

const getContestProblems = async (contestId, cf_username) => {
  const response = await apiClient.get("codeforces/contest/problems", {
    params: { contestId: contestId, cf_username: cf_username },
  });
  return response.data;
};

const getUnsolvedProblems = async () => {
  const response = await baseApiClient.get("codeforces/problems/unsolved");
  return response.data;
};


// QUESTIONS ---------------------------------------------------

const getQuestions = async () => {
  const response = await baseApiClient.get("/question/all");
  return response.data;
};

const askNewQuestion = async (data) => {
  const response = await baseApiClient.post("/question/ask", { data });
  return response.data;
};

// REACTIONS ------------------------------------------------------

const submitPostReaction = async (postid, reaction) => {
  const response = await baseApiClient.post("/post/reaction", {
    postid,
    reaction,
  });
  return response.data;
};

const removePostReaction = async (postid) => {
  const response = await baseApiClient.delete("/post/reaction", {
    data: { postid },
  });
  return response.data;
};

const apiService = {
  register,
  login,
  getProfile,
  getUserDetails,
  updateUserDetails,
  
  createNewPost,
  getPosts,
  updatePost,
  deletePost,

  createNewComment,
  getComments,
  updateComment,
  deleteComment,

  createNewReply,
  getReplies,
  updateReply,
  deleteReply,

  getProblems,
  getContests,
  getContestProblems,
  getUnsolvedProblems,

  getQuestions,
  askNewQuestion,

  submitPostReaction,
  removePostReaction,
};

export default apiService;
