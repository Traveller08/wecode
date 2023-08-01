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
import Bugpage from "./pages/BugPage";
import Discusspage from "./pages/DiscussPage";
import Errorpage from "./pages/ErrorPage";
import Homepage from "./pages/HomePage";
import Learnpage from "./pages/LearnPage";
import Profilepage from "./pages/ProfilePage";
import ReportBugpage from "./pages/ReportBugPage";
import Problemspage from "./pages/ProblemsPage";
import ContestsPage from "./pages/ContestsPage";
import ProblemSheetPage from "./pages/ProblemSheetPage";
import TutorialsPage from "./pages/TutorialsPage";
import VisualizerPage from "./pages/VisualizerPage";
import UnsolvedProblemsPage from "./pages/UnsolvedProblemsPage";
import BlogPage from "./pages/BlogPage";

const App = () => {
  const [user, setUser] = useState(false); // whether user is logged in or not -> can be learner/educator

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

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/login"
            element={<LoginPage user={user} setuser={handleUser} />}
          />

          <Route
            exact
            path="/register"
            element={<RegisterPage user={user} setuser={handleUser} />}
          />

          <Route
            exact
            path="/"
            element={
              <>
                <NavBar
                  user={user}
                  setuser={setUser}
                  url={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                />
                <Homepage user={user} />
              </>
            }
          />

          <Route
            exact
            path="/profile"
            element={
              <>
                <NavBar
                  user={user}
                  setuser={setUser}
                  url={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                />
                <Profilepage user={user} />
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
                  setuser={setUser}
                  url={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                />

                <Problemspage user={user} />
              </>
            }
          />

          <Route
            exact
            path="/practice/problems/unsolved"
            element={
              <>
                <NavBar
                  user={user}
                  setuser={setUser}
                  url={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                />

                <UnsolvedProblemsPage user={user} />
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
                  setuser={setUser}
                  url={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                />

                <ProblemSheetPage user={user} />
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
                  setuser={setUser}
                  url={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                />
                <ContestsPage user={user} />
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
                  setuser={setUser}
                  url={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                />
                {/* <Homepage user={user} /> */}
                <TutorialsPage user={user} />
              </>
            }
          />
          <Route
            exact
            path="/learn/blogs"
            element={
              <>
                <NavBar
                  user={user}
                  setuser={setUser}
                  url={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                />
                {/* <Homepage user={user} /> */}
                <BlogPage user={user} />
              </>
            }
          />


          <Route
            exact
            path="/visualizer"
            element={
              <>
                <NavBar
                  user={user}
                  setuser={setUser}
                  url={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                />
                <VisualizerPage user={user} />
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
