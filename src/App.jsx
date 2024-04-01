import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Header from "./components/Header";

import "./styles/app.scss";
import About from "./pages/About";
import { createContext, useEffect, useState } from "react";
import { ProtectedRoute } from "protected-route-react";
import Profile from "./pages/Profile";
import toast, { Toaster } from "react-hot-toast";

export const UserContext = createContext();

const App = () => {
  const navigate = useNavigate;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const logoutHandler = () => {
    localStorage.removeItem("userData");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
    toast.success("Logged out");
  };

  useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem("userData"));

    if (savedUserData) {
      setUser(savedUserData);
      setIsAuthenticated(true);
    }
  }, [user, isAuthenticated]);

  return (
    <Router>
      <UserContext.Provider
        value={{
          user,
          setUser,
          logoutHandler,
          isAuthenticated,
          setIsAuthenticated,
        }}
      >
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                redirect="/movies"
              >
                <Signup />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                redirect="/movies"
              >
                <Login />
              </ProtectedRoute>
            }
          />

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/movies" element={<Movies />} />
            <Route path="/me" element={<Profile />} />
          </Route>
        </Routes>
        <Toaster />
      </UserContext.Provider>
    </Router>
  );
};

export default App;
