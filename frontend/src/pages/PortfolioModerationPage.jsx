import { useEffect, useState } from "react";

export default function PortfolioModerationPage() {
  const [portfolios, setPortfolios] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Delete function
  const deletePortfolio = async (id) => {
    try {
      const res = await fetch(`/api/admin/portfolios/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setPortfolios(portfolios.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const loadPortfolios = async () => {
      try {
        const res = await fetch("/api/admin/portfolios", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load portfolios");
        }

        setPortfolios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolios();
  }, []);

  if (loading) return <p>Loading portfolios...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Portfolio Moderation</h1>

      <div style={{ display: "grid", gap: "16px" }}>
        {portfolios.map((portfolio) => (
          <div
            key={portfolio._id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
            }}
          >
            <h2 style={{ marginTop: 0 }}>
              {portfolio.displayName ||
                portfolio.user?.username ||
                "Untitled Portfolio"}
            </h2>

            <p>
              <strong>User:</strong> {portfolio.user?.username || "Unknown"}
            </p>

            <p>
              <strong>Email:</strong> {portfolio.user?.email || "Unknown"}
            </p>

            <p>
              <strong>Bio:</strong> {portfolio.bio || "No bio added"}
            </p>

            <p>
              <strong>GitHub:</strong> {portfolio.github || "None"}
            </p>

            <p>
              <strong>LinkedIn:</strong> {portfolio.linkedin || "None"}
            </p>

            <p>
              <strong>Website:</strong> {portfolio.website || "None"}
            </p>

            <button
              onClick={() => deletePortfolio(portfolio._id)}
              style={{
                marginTop: "12px",
                padding: "8px 12px",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
