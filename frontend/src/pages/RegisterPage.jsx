import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await registerUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/get-started");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.leftPanel}>
          <Link to="/" style={styles.backLink}>
            ← Back to Home
          </Link>

          <div style={styles.brandBadge}>Portfolio Builder</div>

          <h1 style={styles.heroTitle}>
            Create Your Account
          </h1>

          <p style={styles.heroText}>
            Start building a professional portfolio that showcases your projects,
            education, skills, experience, and achievements in one clean platform.
          </p>

          <div style={styles.infoBox}>
            <div style={styles.infoItem}>
              <span style={styles.infoIcon}>✨</span>
              <span>Create a polished digital presence</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoIcon}>🧠</span>
              <span>Organize your skills and accomplishments</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoIcon}>📈</span>
              <span>Present your growth in a more professional way</span>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Create Account</h2>
          <p style={styles.cardSubtitle}>Make your account to get started</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="username" style={styles.label}>
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {})
              }}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p style={styles.footerText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.footerLink}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2563eb 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "32px"
  },
  overlay: {
    width: "100%",
    maxWidth: "1200px",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "24px",
    overflow: "hidden",
    backdropFilter: "blur(14px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.25)"
  },
  leftPanel: {
    padding: "56px",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  backLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    marginBottom: "24px",
    fontWeight: "500",
    fontSize: "15px"
  },
  brandBadge: {
    display: "inline-block",
    width: "fit-content",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.14)",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "24px"
  },
  heroTitle: {
    fontSize: "52px",
    lineHeight: "1.1",
    margin: "0 0 18px 0",
    fontWeight: "800"
  },
  heroText: {
    fontSize: "18px",
    lineHeight: "1.8",
    color: "#dbeafe",
    maxWidth: "540px",
    marginBottom: "32px"
  },
  infoBox: {
    display: "grid",
    gap: "16px",
    marginTop: "8px"
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontSize: "16px",
    color: "#e2e8f0",
    background: "rgba(255,255,255,0.06)",
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.08)"
  },
  infoIcon: {
    fontSize: "20px"
  },
  card: {
    background: "#ffffff",
    padding: "48px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  cardTitle: {
    margin: "0 0 8px 0",
    fontSize: "34px",
    fontWeight: "800",
    color: "#0f172a"
  },
  cardSubtitle: {
    margin: "0 0 28px 0",
    color: "#64748b",
    fontSize: "16px"
  },
  form: {
    display: "grid",
    gap: "18px"
  },
  inputGroup: {
    display: "grid",
    gap: "8px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#334155"
  },
  input: {
    padding: "14px 14px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s ease",
    background: "#f8fafc"
  },
  error: {
    margin: 0,
    padding: "12px 14px",
    borderRadius: "10px",
    background: "#fef2f2",
    color: "#b91c1c",
    border: "1px solid #fecaca",
    fontSize: "14px"
  },
  button: {
    marginTop: "6px",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #111827, #1e293b)",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
    boxShadow: "0 10px 22px rgba(15, 23, 42, 0.18)"
  },
  buttonDisabled: {
    opacity: 0.75,
    cursor: "not-allowed"
  },
  footerText: {
    marginTop: "22px",
    color: "#475569",
    fontSize: "15px"
  },
  footerLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600"
  }
};

export default RegisterPage;
