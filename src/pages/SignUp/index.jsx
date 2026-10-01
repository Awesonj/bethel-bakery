import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUpCustomer } from "../../firebase/auth";
import "./SignUp.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match. Please check and try again.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);

    try {
      await signUpCustomer(email, password, name);
      navigate("/menu");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists. Try logging in instead.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Something went wrong creating your account. Please try again.");
      }
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="signup-form__heading">Create an account</h1>
        <p className="signup-form__intro">
          Track your orders and check out faster next time.
        </p>

        <label className="signup-form__label">
          Full name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="signup-form__label">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="signup-form__label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </label>

        <label className="signup-form__label">
          Confirm password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={6}
            required
          />
        </label>

        {error && <p className="signup-form__error">{error}</p>}

        <button type="submit" className="signup-form__submit" disabled={submitting}>
          {submitting ? "Creating account..." : "Create account"}
        </button>

        <p className="signup-form__login">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}