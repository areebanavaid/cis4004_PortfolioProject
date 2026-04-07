════════════════════════════════════════════════════════════════
  PORTFOLIO BUILDER — README
  CIS 4004 | Spring 2026
════════════════════════════════════════════════════════════════

A full-stack MERN web application where users can create and
manage a professional online portfolio showcasing their projects,
skills, education, work experience, and certifications.

────────────────────────────────────────────────────────────────
  PREREQUISITES
────────────────────────────────────────────────────────────────

Before running the application, make sure you have the following
installed on your machine:

  • Node.js       https://nodejs.org
  • MongoDB       https://www.mongodb.com/try/download/community
  • npm           (bundled with Node.js)

MongoDB must be running locally before starting the backend.

  Windows:   Run "mongod" in a terminal, or start via Services
  macOS:     brew services start mongodb-community

────────────────────────────────────────────────────────────────
  ENVIRONMENT SETUP
────────────────────────────────────────────────────────────────

Create a file called .env inside the /backend folder with the
following contents:

  MONGO_URI=mongodb://localhost:27017/portfolioDB
  JWT_SECRET=your_secret_key_here
  PORT=5000

  ⚠ The database name is case-sensitive. Use "portfolioDB"
    exactly as written above.

────────────────────────────────────────────────────────────────
  A. STARTING THE BACKEND (Web Server)
────────────────────────────────────────────────────────────────

1. Open a terminal and navigate to the backend folder:

     cd backend

2. Install dependencies (first time only):

     npm install

3. Start the server:

     npm start          ← standard
The backend API will be running at:

     http://localhost:5000

────────────────────────────────────────────────────────────────
  B. STARTING THE FRONTEND (React Application)
────────────────────────────────────────────────────────────────

A second server is required for the React frontend.

1. Open a NEW terminal and navigate to the frontend folder:

     cd frontend

2. Install dependencies (first time only):

     npm install

3. Start the React development server:

     npm start

The frontend will be running at:

     http://localhost:3000

────────────────────────────────────────────────────────────────
  C. NAVIGATING THE APPLICATION
────────────────────────────────────────────────────────────────

With both servers running, open a browser and go to:

     http://localhost:3000

APPLICATION FLOW:

  1. Register a new account on the login page
       → Choose role: Standard User or Administrator

  2. After login you will be directed to the dashboard

  3. Standard User pages (sidebar navigation):
       /portfolio/MyPortfolio       ← Full portfolio view (read + edit, you can only edit exist entries on this page)
       /portfolio          ← Portfolio overview / bio editor
       /portfolio/skills       ← Manage skills
       /portfolio/projects     ← Manage projects
       /portfolio/education    ← Manage education
       /portfolio/experience   ← Manage experience
       /portfolio/certifications ← Manage certifications

  4. Administrator pages:
       /admin              ← Admin dashboard
       /admin/users        ← Manage all users, delete users
       /admin/portfolios   ← View all portfolios, delete portfolios

TEST ACCOUNTS (create these via the Register page):

  Standard User:
    Username: testuser
    Password: test1234

  Administrator:
    Username: admin
    Password: admin1234
    (set role to "admin" directly in MongoDB if needed)

────────────────────────────────────────────────────────────────
  D. MONGODB COLLECTIONS
────────────────────────────────────────────────────────────────

The application uses the following collections in the
"portfolioDB" database. These are created automatically when
data is first inserted — no manual setup is needed.

  COLLECTION       DESCRIPTION
  ─────────────    ──────────────────────────────────────────
  users            Registered user accounts and roles
  portfolios       Portfolio bio, links, profile picture
  projects         User projects with GitHub links + skills
  skills           Skills with category and proficiency level
  education        Education history per user
  experience       Work experience per user
  certifications   Professional certifications per user

Many-to-Many relationship: Projects ↔ Skills
  A project can have many skills; a skill can belong to many
  projects. This is stored as an array of ObjectId references
  on the Project document.

────────────────────────────────────────────────────────────────
  PROJECT STRUCTURE
────────────────────────────────────────────────────────────────

  portfolio-builder/
  ├── backend/
  │   ├── middleware/       authMiddleware.js
  │   ├── models/           User, Portfolio, Project, Skill,
  │   │                     Education, Experience, Certification
  │   ├── routes/           auth, portfolio, project, skill,
  │   │                     education, experience, certification, admin
  │   ├── .env              ← you create this
  │   └── server.js
  │
  └── frontend/
      └── src/
          ├── components/   DashboardLayout.jsx, DashboardLayout.css
          ├── pages/        AdminDashboard, CertificationPage, EducationPage,
                            ExperiencePage, GetStartedPage, HomePage, LoginPage,
                            MyPortfolioPage, PortfolioModerationpage, PortfolioPage,
                            ProjectsPage, RegisterPage, SkillsPage, UserManagementPage
          └── services/     api.js, skillService.js,
                            projectService.js, auth.js
          └── App.css
          └── App.js

════════════════════════════════════════════════════════════════