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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const logoutHandler = () => {
    localStorage.removeItem("userData");
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out");
  };

  useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem("userData"));

    if (savedUserData) {
      setUser(savedUserData);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

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

/*
This is a React application that utilizes React Router for navigation and protected routes using the `protected-route-react` package. Let's break down the key components and functionalities:

1. **Imports**: The application imports necessary modules and components from React, React Router, and other dependencies.

2. **Context**: `UserContext` is created using `createContext()` to manage user authentication state across the application.

3. **App Component**: The main component of the application where routing and context provider are set up.

4. **State Management**: State variables `isAuthenticated` and `user` are managed using React's `useState` hook. These variables control user authentication status and user data.

5. **Effects**: The `useEffect` hook is used to check for saved user data in local storage when the component mounts. If user data exists, it sets the user and authentication status accordingly.

6. **Routes**: React Router's `Routes` component is used to define application routes. Protected routes are implemented using `ProtectedRoute` from `protected-route-react`, which redirects unauthorized users to the login page.

7. **Navigation**: `useNavigate` hook from React Router is used for programmatic navigation. For example, after logging out, the user is redirected to the login page.

8. **Components**: The application consists of several components such as `Header`, `Signup`, `Login`, `Movies`, `About`, and `Profile`, which are rendered based on the current route.

9. **Toasts**: `react-hot-toast` library is used for displaying toast notifications. For example, when the user logs out, a success toast is shown.

In summary, this React application provides user authentication functionalities, navigation using React Router, protected routes, and toast notifications. It maintains user authentication state using React context and local storage. */
