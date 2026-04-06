import { NavLink, Outlet } from "react-router-dom";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">Portfolio Builder</div>
        <nav>
          <NavLink to="/portfolio/me" className={({ isActive }) => isActive ? "active" : ""}>My Portfolio</NavLink>
          <NavLink to="/portfolio" end>Overview</NavLink>
          <NavLink to="/portfolio/skills">Skills</NavLink>
          <NavLink to="/portfolio/projects">Projects</NavLink>
          <NavLink to="/portfolio/education">Education</NavLink>
          <NavLink to="/portfolio/experience">Experience</NavLink>
          <NavLink to="/admin">Admin Dashboard</NavLink>
          <NavLink to="/admin/users">Manage Users</NavLink>
          <NavLink to="/admin/portfolios">Moderate Portfolios</NavLink>
          <Link to="/portfolio/certifications">Certifications</Link>
        </nav>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Log out
        </button>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
