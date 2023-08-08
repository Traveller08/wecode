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
import Layout from "./Layout";

const App = () => {
  const [user, setUser] = useState(null);
  const handleLogout = () => {
    setUser(null);
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(userCookie);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={<LoginPage user={user} login={handleLogin} />}
        />
        <Route
          exact
          path="/register"
          element={<RegisterPage user={user} login={handleLogin} />}
        />

        <Route
          index
          element={
            <>
              <NavBar user={user} logout={handleLogout} />
              <Homepage user={user} />{" "}
            </>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <>
              <NavBar user={user} logout={handleLogout} />
              <Profilepage user={user} />{" "}
            </>
          }
        />
        <Route
          exact
          path="/practice/problems"
          element={
            <>
              <NavBar user={user} logout={handleLogout} />
              <Problemspage user={user} />{" "}
            </>
          }
        />
        <Route
          exact
          path="/practice/problems/unsolved"
          element={
            <>
              <NavBar user={user} logout={handleLogout} />
              <UnsolvedProblemsPage user={user} />{" "}
            </>
          }
        />
        <Route
          exact
          path="/practice/problemsheets"
          element={
            <>
              <NavBar user={user} logout={handleLogout} />
              <ProblemSheetPage user={user} />{" "}
            </>
          }
        />
        <Route
          exact
          path="/practice/contests"
          element={
            <>
              <NavBar user={user} logout={handleLogout} />
              <ContestsPage user={user} />{" "}
            </>
          }
        />
        <Route
          exact
          path="/learn/tutorials"
          element={
            <>
              <NavBar user={user} logout={handleLogout} />
              <TutorialsPage user={user} />{" "}
            </>
          }
        />
        <Route
          exact
          path="/learn/blogs"
          element={
            <>
              <NavBar user={user} logout={handleLogout} />
              <BlogPage user={user} />{" "}
            </>
          }
        />
        <Route
          exact
          path="/visualizer"
          element={
            <>
              <NavBar user={user} logout={handleLogout} />
              <VisualizerPage user={user} />{" "}
            </>
          }
        />
        {/* Add other routes for authenticated users */}

        <Route
          index
          element={
            <>
              <NavBar user={user} logout={handleLogout} />
              <Homepage />{" "}
            </>
          }
        />
        <Route
          exact
          path="/learn/blogs"
          element={
            <>
              <NavBar user={user} logout={handleLogout} />
              <BlogPage />{" "}
            </>
          }
        />
        {/* Add other routes for non-authenticated users */}

        <Route
          exact
          path="/about"
          element={
            <>
              <NavBar user={user} logout={handleLogout} />
              <Aboutpage />{" "}
            </>
          }
        />
        <Route
          exact
          path="/bug"
          element={
            <>
              <NavBar user={user} logout={handleLogout} />
              <Bugpage />{" "}
            </>
          }
        />
        <Route
          exact
          path="/discuss"
          element={
            <>
              <NavBar user={user} logout={handleLogout} />
              <Discusspage />{" "}
            </>
          }
        />
        <Route
          exact
          path="/error"
          element={
            <>
              <NavBar user={user} logout={handleLogout} />
              <Errorpage />{" "}
            </>
          }
        />
        <Route
          exact
          path="/report/bug"
          element={
            <>
              <NavBar user={user} logout={handleLogout} />
              <ReportBugpage />{" "}
            </>
          }
        />
        {/* Add other routes for both authenticated and non-authenticated users */}
      </Routes>
      <NotificationToaster />
      {/* <ChatBot /> */}
      <WeCodeFooter />
    </Router>
  );
};

export default App;
