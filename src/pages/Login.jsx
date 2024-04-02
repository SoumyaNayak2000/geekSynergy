import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.scss"; // Import the SCSS file for styling
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import toast from "react-hot-toast";

const Login = () => {
  const { setIsAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Checking credentials
    const savedUserData = JSON.parse(localStorage.getItem("userData"));
    if (
      savedUserData &&
      savedUserData.name === formData.name &&
      savedUserData.password === formData.password
    ) {
      // Redirect to movie list page
      setIsAuthenticated(true);
      navigate("/movies");
      toast.success("Logged in successfully");
    } else {
      toast.error("Invalid Credentials");
    }
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your username"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

/*This is a React component named `Login`, responsible for rendering a form for user login. Let's break down its key aspects:

1. **State Management**: It uses the `useState` hook to manage form data. The initial state includes fields for `name` (username) and `password`.

2. **Context Usage**: It uses the `useContext` hook to access the `setIsAuthenticated` function from the `UserContext` context, which is used to update the authentication status of the user.

3. **Form Handling Functions**:
   - `handleChange`: This function updates the form data state as the user types in the input fields.
   - `handleSubmit`: This function is triggered when the user submits the form. It prevents the default form submission behavior, retrieves user data from local storage, checks if the entered username and password match with the stored data, sets the authentication status, redirects the user to the movies page upon successful login, and displays appropriate toast notifications.

4. **Form Structure**:
   - The form consists of input fields for `username` and `password`.
   - Each input field is associated with a label for better accessibility.
   - The `onChange` event is used to call the `handleChange` function whenever the value of an input field changes.
   - The submit button triggers the `handleSubmit` function when clicked.

5. **React Router Navigation**:
   - It uses the `useNavigate` hook from React Router to navigate to different routes.
   - Upon successful login, the user is redirected to the movies page.

6. **Toast Notifications**:
   - It utilizes the `react-hot-toast` library to display toast notifications.
   - When the user logs in successfully, a success toast is displayed. If the credentials are invalid, an error toast is displayed.

7. **Link to Signup**:
   - It provides a link to the signup page for users who don't have an account.

Overall, this component enables users to log in by providing their username and password through a form, handles form submission, updates authentication status, and provides visual feedback to the user through toast notifications. */