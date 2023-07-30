import "./App.css";
import { Route } from "react-router";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "react-chatbot-kit/build/main.css";
import NotificationToaster from "./components/toast/NotificationToaster";
import ChatBot from "./components/bot/ChatBot";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./components/navbar/NavBar";
import WeCodeFooter from "./components/footer/WeCodeFooter";

import Aboutpage from "./pages/AboutPage";
import Accountpage from "./pages/AccountPage";
import Bugpage from "./pages/BugPage";
import Discusspage from "./pages/DiscussPage";
import Errorpage from "./pages/ErrorPage";
import Homepage from "./pages/HomePage";
import Learnpage from "./pages/LearnPage";
import Visualizerpage from "./pages/VisualizerPage";
import Profilepage from "./pages/ProfilePage";
import ReportBugpage from "./pages/ReportBugPage";
import Problemspage from "./pages/ProblemsPage";
import ContestsPage from "./pages/ContestsPage";
import ProblemSheetPage from "./pages/ProblemSheetPage";
import TutorialsPage from "./pages/TutorialsPage";

const App = () => {
  const [user, setUser] = useState(false); // whether user is logged in or not -> can be learner/educator 
  const [usertype, setUsertype] = useState("Learner"); // Learner/Educator 
  
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
              <LoginPage
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
              <RegisterPage
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
              <>
                <NavBar
                  user={user}
                  usertype={usertype}
                  setuser={setUser}
                  setusertype={setUsertype}
                  url={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                />
                <Homepage user={user} usertype={usertype} />
              </>
            }
          />

          <Route
            exact
            path="/practice/problems"
            element={
              <>
                <NavBar
                  user={user}
                  usertype={usertype}
                  setuser={setUser}
                  setusertype={setUsertype}
                  url={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                />

                <Problemspage user={user} usertype={usertype} />

              </>
            }
          />

        <Route
            exact
            path="/practice/problemsheets"
            element={
              <>
                <NavBar
                  user={user}
                  usertype={usertype}
                  setuser={setUser}
                  setusertype={setUsertype}
                  url={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                />

                <ProblemSheetPage user={user} usertype={usertype} />

              </>
            }
          />

        <Route
            exact
            path="/practice/contests"
            element={
              <>
                <NavBar
                  user={user}
                  usertype={usertype}
                  setuser={setUser}
                  setusertype={setUsertype}
                  url={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                />
                <ContestsPage user={user} usertype={usertype} />
              </>
            }
          />
          <Route
            exact
            path="/learn/tutorials"
            element={
              <>
                <NavBar
                  user={user}
                  usertype={usertype}
                  setuser={setUser}
                  setusertype={setUsertype}
                  url={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                />
                {/* <Homepage user={user} usertype={usertype} /> */}
                <TutorialsPage user={user} usertype={usertype} />
              </>
            }
          />
        </Routes>

        
      </div>


      <NotificationToaster />

      <ChatBot />

      <WeCodeFooter />
      
    </Router>
  );
};

export default App;
