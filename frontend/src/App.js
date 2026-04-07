import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import GetStartedPage from "./pages/GetStartedPage";
import PortfolioPage from "./pages/PortfolioPage";
import EducationPage from "./pages/EducationPage";
import ExperiencePage from "./pages/ExperiencePage";
import MyPortfolioPage from "./pages/MyPortfolioPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import CertificationPage from "./pages/CertificationPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagementPage from "./pages/UserManagementPage";
import PortfolioModerationPage from "./pages/PortfolioModerationPage";
// The ProtectedRoute component is a higher-order component that checks if the user is authenticated by looking for a token in localStorage. If the token exists, it renders the child components; otherwise, it redirects the user to the login page. This component is used to protect routes that require authentication, ensuring that only logged-in users can access certain pages of the application.
// The App component is the main entry point of the React application. It sets up the routing for the application using React Router. It defines various routes for different pages, including protected routes that require authentication. The component uses the BrowserRouter to manage routing and the Routes and Route components to define the paths and their corresponding components. The ProtectedRoute component is used to wrap routes that should only be accessible to authenticated users, ensuring that unauthorized access is prevented.
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}
// The App component is the main entry point of the React application. It sets up the routing for the application using React Router. It defines various routes for different pages, including protected routes that require authentication. The component uses the BrowserRouter to manage routing and the Routes and Route components to define the paths and their corresponding components. The ProtectedRoute component is used to wrap routes that should only be accessible to authenticated users, ensuring that unauthorized access is prevented.

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/get-started"
          element={
            <ProtectedRoute>
              <GetStartedPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PortfolioPage />} />
          <Route path="me" element={<MyPortfolioPage />} />
          <Route path="education" element={<EducationPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="certifications" element={<CertificationPage />} />
        </Route>


        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="portfolios" element={<PortfolioModerationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;