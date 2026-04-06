import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <div style={styles.logo}>Portfolio Builder</div>
        <div style={styles.navButtons}>
          <Link to="/login" style={styles.navLink}>
            Login
          </Link>
          <Link to="/register" style={styles.navButton}>
            Get Started
          </Link>
        </div>
      </nav>

      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>CIS 4004 Portfolio Project</div>

          <h1 style={styles.heroTitle}>
            Build a Portfolio
            <br />
            That Actually Stands Out
          </h1>

          <p style={styles.heroSubtitle}>
            Create, organize, and showcase your skills, education, projects,
            work experience, and certifications in one professional platform.
            Give employers, professors, and peers a single place to view your
            work and your story.
          </p>

          <div style={styles.heroButtons}>
            <Link to="/register" style={styles.primaryButton}>
              Create Your Portfolio
            </Link>
            <Link to="/login" style={styles.secondaryButton}>
              Sign In
            </Link>
          </div>
        </div>

        <div style={styles.previewCard}>
          <h2 style={styles.previewTitle}>Why Use Portfolio Builder?</h2>

          <div style={styles.previewItem}>
            <span style={styles.previewIcon}>💼</span>
            <div>
              <h3 style={styles.previewItemTitle}>Professional Presentation</h3>
              <p style={styles.previewText}>
                Organize all of your accomplishments into one polished and
                easy-to-view profile.
              </p>
            </div>
          </div>

          <div style={styles.previewItem}>
            <span style={styles.previewIcon}>🛠️</span>
            <div>
              <h3 style={styles.previewItemTitle}>Showcase Your Work</h3>
              <p style={styles.previewText}>
                Highlight projects, technical skills, certifications, and
                academic achievements with structure and clarity.
              </p>
            </div>
          </div>

          <div style={styles.previewItem}>
            <span style={styles.previewIcon}>🚀</span>
            <div>
              <h3 style={styles.previewItemTitle}>Build Your Brand</h3>
              <p style={styles.previewText}>
                Present yourself as more than a resume by creating a portfolio
                that reflects your growth and potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Everything You Need in One Place</h2>
        <p style={styles.sectionSubtitle}>
          Portfolio Builder helps users create a complete digital professional
          profile with tools designed for students and emerging professionals.
        </p>

        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📁</div>
            <h3 style={styles.featureTitle}>Projects</h3>
            <p style={styles.featureText}>
              Add your best technical, academic, and personal projects with
              descriptions, tools used, and outcomes.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🎓</div>
            <h3 style={styles.featureTitle}>Education</h3>
            <p style={styles.featureText}>
              Display schools attended, degrees earned, coursework, and
              educational milestones in one clean section.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🧠</div>
            <h3 style={styles.featureTitle}>Skills</h3>
            <p style={styles.featureText}>
              Highlight technical and professional skills so visitors can
              quickly understand your strengths.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🏅</div>
            <h3 style={styles.featureTitle}>Certifications</h3>
            <p style={styles.featureText}>
              Showcase certifications and achievements that add credibility to
              your experience and qualifications.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📈</div>
            <h3 style={styles.featureTitle}>Experience</h3>
            <p style={styles.featureText}>
              Present internships, leadership roles, work experience, and other
              meaningful contributions.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🌐</div>
            <h3 style={styles.featureTitle}>Centralized Profile</h3>
            <p style={styles.featureText}>
              Keep all your professional information in one location instead of
              scattering it across documents and platforms.
            </p>
          </div>
        </div>
      </section>

      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Start Building Your Professional Presence</h2>
        <p style={styles.ctaText}>
          Whether you are applying for internships, jobs, graduate school, or
          simply documenting your growth, Portfolio Builder gives you a better
          way to present yourself.
        </p>
        <Link to="/register" style={styles.ctaButton}>
          Get Started Today
        </Link>
      </section>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Portfolio Builder © 2026 | Designed for students, creators, and future professionals
        </p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(180deg, #0f172a 0%, #111827 35%, #1e293b 100%)",
    color: "#ffffff"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 60px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    position: "sticky",
    top: 0,
    backdropFilter: "blur(12px)",
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    zIndex: 10
  },

  logo: {
    fontSize: "24px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    color: "#ffffff"
  },

  navButtons: {
    display: "flex",
    gap: "16px",
    alignItems: "center"
  },

  navLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "16px"
  },

  navButton: {
    textDecoration: "none",
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    color: "#ffffff",
    padding: "10px 18px",
    borderRadius: "10px",
    fontWeight: "600",
    boxShadow: "0 8px 20px rgba(37, 99, 235, 0.35)"
  },

  heroSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "50px",
    padding: "80px 60px 70px 60px",
    flexWrap: "wrap"
  },

  heroContent: {
    flex: "1 1 550px",
    maxWidth: "700px"
  },

  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    color: "#93c5fd",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "24px",
    border: "1px solid rgba(147, 197, 253, 0.25)"
  },

  heroTitle: {
    fontSize: "64px",
    lineHeight: "1.05",
    margin: "0 0 24px 0",
    fontWeight: "800",
    color: "#ffffff"
  },

  heroSubtitle: {
    fontSize: "20px",
    lineHeight: "1.8",
    color: "#cbd5e1",
    maxWidth: "640px",
    marginBottom: "32px"
  },

  heroButtons: {
    display: "flex",
    gap: "18px",
    flexWrap: "wrap"
  },

  primaryButton: {
    textDecoration: "none",
    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    color: "#ffffff",
    padding: "16px 28px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "16px",
    boxShadow: "0 10px 24px rgba(37, 99, 235, 0.35)"
  },

  secondaryButton: {
    textDecoration: "none",
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "#ffffff",
    padding: "16px 28px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "16px",
    border: "1px solid rgba(255,255,255,0.12)"
  },

  previewCard: {
    flex: "1 1 380px",
    maxWidth: "450px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
    backdropFilter: "blur(16px)"
  },

  previewTitle: {
    fontSize: "28px",
    marginBottom: "26px",
    fontWeight: "700",
    color: "#ffffff"
  },

  previewItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "24px"
  },

  previewIcon: {
    fontSize: "28px",
    lineHeight: 1
  },

  previewItemTitle: {
    margin: "0 0 6px 0",
    fontSize: "18px",
    color: "#ffffff"
  },

  previewText: {
    margin: 0,
    color: "#cbd5e1",
    lineHeight: "1.6",
    fontSize: "15px"
  },

  featuresSection: {
    padding: "40px 60px 80px 60px"
  },

  sectionTitle: {
    textAlign: "center",
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "14px"
  },

  sectionSubtitle: {
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto 50px auto",
    color: "#cbd5e1",
    fontSize: "18px",
    lineHeight: "1.7"
  },

  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "24px"
  },

  featureCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
    transition: "transform 0.2s ease"
  },

  featureIcon: {
    fontSize: "32px",
    marginBottom: "18px"
  },

  featureTitle: {
    fontSize: "22px",
    marginBottom: "12px",
    color: "#ffffff"
  },

  featureText: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#cbd5e1"
  },

  ctaSection: {
    margin: "0 60px 60px 60px",
    padding: "50px 30px",
    borderRadius: "24px",
    textAlign: "center",
    background: "linear-gradient(135deg, rgba(37,99,235,0.22), rgba(59,130,246,0.12))",
    border: "1px solid rgba(147,197,253,0.18)"
  },

  ctaTitle: {
    fontSize: "36px",
    fontWeight: "800",
    marginBottom: "16px"
  },

  ctaText: {
    fontSize: "18px",
    color: "#dbeafe",
    maxWidth: "760px",
    margin: "0 auto 28px auto",
    lineHeight: "1.7"
  },

  ctaButton: {
    display: "inline-block",
    textDecoration: "none",
    backgroundColor: "#ffffff",
    color: "#1d4ed8",
    padding: "15px 28px",
    borderRadius: "12px",
    fontWeight: "800",
    fontSize: "16px"
  },

  footer: {
    textAlign: "center",
    padding: "24px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    color: "#94a3b8"
  },

  footerText: {
    margin: 0,
    fontSize: "14px"
  }
};

export default HomePage;
