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
