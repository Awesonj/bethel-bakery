import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStaff } from "../../firebase/auth";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await loginStaff(email, password);
      navigate("/redirecting");
    } catch (err) {
      setError("Incorrect email or password. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-form__heading">Log in</h1>

        <label className="login-form__label">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="login-form__label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className="login-form__error">{error}</p>}

        <button
          type="submit"
          className="login-form__submit"
          disabled={submitting}
        >
          {submitting ? "Logging in..." : "Log in"}
        </button>

        <p className="login-form__signup">
          Do not have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
}
