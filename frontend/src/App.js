import "./App.css";
import Login from "./components/login/Login";
import { Route } from "react-router";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./components/homepage/Homepage";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Register from "./components/register/Register";
import { Toaster } from "react-hot-toast";
const App = () => {
  const [user, setUser] = useState(false);
  const [usertype, setUsertype] = useState("Learner");
  useEffect(() => {
    if (Cookies.get("token")) {
      setUser(true);
    }
  }, [user]);
  useEffect(() => {
    if (!Cookies.get("token")) {
      setUser(false);
    }
  }, []);
  const handleUser = (value) => {
    setUser(value);
  };
  const handleUserType = (value) => {
    setUsertype(value);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/login"
            element={
              <Login
                user={user}
                usertype={usertype}
                setuser={handleUser}
                setusertype={handleUserType}
              />
            }
          />
          <Route
            exact
            path="/register"
            element={
              <Register
                user={user}
                usertype={usertype}
                setuser={handleUser}
                setusertype={handleUserType}
              />
            }
          />

          <Route
            exact
            path="/"
            element={
              <HomePage
                user={user}
                usertype={usertype}
                setuser={handleUser}
                setusertype={handleUserType}
              />
            }
          />
        </Routes>
      </div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </Router>
  );
};

export default App;
