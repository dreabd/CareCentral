import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleClickDemoUser = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@gmail.com", "password"));
    if (data) {
      return setErrors(data);
    }
  };

  return (
    <div className="loginPage">
      <p className="login-heading">Log In</p>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="login-error">
              {error}
            </li>
          ))}
        </ul>
        <label className="login-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </label>
        <label className="login-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </label>
        <button type="submit" className="login-button">
          Log In
        </button>
        <button onClick={handleClickDemoUser} className="demo-button">
          Demo
        </button>
      </form>
    </div>


  );
}

export default LoginFormPage;
