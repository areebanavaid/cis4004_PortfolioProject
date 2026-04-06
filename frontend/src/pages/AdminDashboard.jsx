import { useNavigate } from "react-router-dom";

// This page is shown immediately after login/registration to welcome the user and prompt them to start building their portfolio.
export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      <div>
        <h1 style={{ marginBottom: "8px" }}>Admin Dashboard</h1>
        <p style={{ color: "#666" }}>
          Manage users and moderate portfolio content.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px"
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
          }}
        >
          <h2 style={{ marginTop: 0 }}>User Management</h2>
          <p>View all users in the system.</p>
          <button
            onClick={() => navigate("/admin/users")}
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              background: "#111",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Go to Users
          </button>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
          }}
        >
          <h2 style={{ marginTop: 0 }}>Portfolio Moderation</h2>
          <p>View all portfolios and moderate content.</p>
          <button
            onClick={() => navigate("/admin/portfolios")}
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              background: "#111",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Go to Portfolios
          </button>
        </div>
      </div>
    </div>
  );
}