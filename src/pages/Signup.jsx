import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.scss";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    profession: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // For simplicity, storing in localStorage here
      localStorage.setItem("userData", JSON.stringify(formData));
      // Redirect to login page
      navigate("/login");
      toast.success("User registered Please Login");
    } catch (error) {
      toast.error("Signup error");
    }
  };
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
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
        <div className="form-group">
          <label htmlFor="phone">Phone number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profession">Profession</label>
          <select
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
          >
            <option value="select">Select</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

/*
This is a React component named `Signup`, responsible for rendering a form for user signup. Let's break down its key aspects:

1. **State Management**: It uses the `useState` hook to manage form data. The initial state includes fields like `name`, `email`, `password`, `phone`, and `profession`.

2. **Form Handling Functions**:
   - `handleChange`: This function updates the form data state as the user types in the input fields.
   - `handleSubmit`: This function is triggered when the user submits the form. It prevents the default form submission behavior, stores the form data in local storage (for demonstration purposes), redirects the user to the login page, and displays a success toast notification.

3. **Form Structure**:
   - The form consists of input fields for `name`, `email`, `password`, `phone`, and a dropdown for selecting `profession`.
   - Each input field is associated with a label for better accessibility.
   - The `onChange` event is used to call the `handleChange` function whenever the value of an input field changes.
   - The submit button triggers the `handleSubmit` function when clicked.

4. **React Router Navigation**:
   - It uses the `useNavigate` hook from React Router to navigate to different routes.
   - Upon successful form submission, the user is redirected to the login page.

5. **Toast Notifications**:
   - It utilizes the `react-hot-toast` library to display toast notifications.
   - When the user successfully signs up, a success toast is displayed.

6. **Link to Login**:
   - It provides a link to the login page for users who already have an account.

Overall, this component enables users to sign up by providing their information through a form, handles form submission, and provides visual feedback to the user through toast notifications.
 */
