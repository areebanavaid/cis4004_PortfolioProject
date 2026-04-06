import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  fetchPortfolio, updatePortfolio,
  fetchEducation, fetchExperience,
  updateEducation, deleteEducation,
  updateExperience, deleteExperience
} from "../services/api";
import { getSkills, updateSkill, deleteSkill } from "../services/skillService";
import { getProjects, updateProject, deleteProject } from "../services/projectService";
import "./MyPortfolioPage.css";
// The MyPortfolioPage component is the main page for users to view and edit their portfolio. It fetches and displays the user's portfolio information, including their header, experience, education, skills, projects, and certifications. Users can edit each section of their portfolio, and the component handles the logic for saving changes and updating the UI accordingly. The component also includes a loading state while fetching data and provides feedback to the user when changes are saved. The design of the page is modern and visually appealing, with a focus on usability and a clean layout to showcase the user's portfolio effectively.
const levelDots = (level) => {
  const map = { Beginner: 1, Intermediate: 2, Advanced: 3 };
  const filled = map[level] || 1;
  return [1, 2, 3].map((i) => (
    <span key={i} className={`dot ${i <= filled ? "filled" : ""}`} />
  ));
};
// Handle form submission to add a new certification
function SaveBar({ onSave, onCancel, status }) {
  return (
    <div className="save-bar">
      <button className="mp-save-btn" onClick={onSave}>Save</button>
      <button className="mp-cancel-btn" onClick={onCancel}>Cancel</button>
      {status && <span className="mp-saved">{status}</span>}
    </div>
  );
}
// The MyPortfolioPage component is the main page for users to view and edit their portfolio. It fetches and displays the user's portfolio information, including their header, experience, education, skills, projects, and certifications. Users can edit each section of their portfolio, and the component handles the logic for saving changes and updating the UI accordingly. The component also includes a loading state while fetching data and provides feedback to the user when changes are saved. The design of the page is modern and visually appealing, with a focus on usability and a clean layout to showcase the user's portfolio effectively.
export default function MyPortfolioPage() {
  const [portfolio, setPortfolio]   = useState(null);
  const [education, setEducation]   = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills]         = useState([]);
  const [projects, setProjects]     = useState([]);
  const [certs, setCerts]           = useState([]);
  const [loading, setLoading]       = useState(true);
// State variables for managing editing states and form data for each section of the portfolio. This allows the component to track which section is being edited and manage the corresponding form data for that section. The editing states are used to conditionally render the appropriate UI for editing or viewing each section of the portfolio, while the form data state variables hold the current values being edited by the user before they are saved.
  const [editingHeader, setEditingHeader] = useState(false);
  const [headerForm, setHeaderForm]       = useState({});
  const [headerStatus, setHeaderStatus]   = useState("");
  const fileInputRef = useRef(null);

  const [editingEdu,   setEditingEdu]   = useState({});
  const [editingExp,   setEditingExp]   = useState({});
  const [editingSkill, setEditingSkill] = useState({});
  const [editingProj,  setEditingProj]  = useState({});
  const [editingCert,  setEditingCert]  = useState({});
// Get token from localStorage for authenticated API requests
  const authHeader = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    setLoading(true);

    // Main data — if any of these fail something is seriously wrong
    try {
      const [p, edu, exp, sk, proj] = await Promise.all([
        fetchPortfolio(),
        fetchEducation(),
        fetchExperience(),
        getSkills(),
        getProjects(),
      ]);
      setPortfolio(p);
      setHeaderForm({
        displayName: p?.displayName || "",
        bio:         p?.bio         || "",
        github:      p?.github      || "",
        linkedin:    p?.linkedin    || "",
        website:     p?.website     || "",
        profilePic:  p?.profilePic  || "",
      });
      setEducation(Array.isArray(edu)  ? edu  : []);
      setExperience(Array.isArray(exp) ? exp  : []);
      setSkills(Array.isArray(sk)      ? sk   : []);
      setProjects(Array.isArray(proj)  ? proj : []);
    } catch (e) {
      console.error("Failed to load portfolio data:", e);
    }

    // Certifications loaded separately so a 404 doesn't break everything else
    try {
      const certsRes = await axios.get("/api/certifications", authHeader);
      setCerts(Array.isArray(certsRes.data) ? certsRes.data : []);
    } catch (e) {
      console.warn("Certifications not available:", e.message);
      setCerts([]);
    }

    setLoading(false);
  };

  // header 
  const saveHeader = async () => {
    const updated = await updatePortfolio(portfolio._id, headerForm);
    setPortfolio(updated);
    setEditingHeader(false);
    setHeaderStatus("Saved ✓");
    setTimeout(() => setHeaderStatus(""), 2000);
  };
  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setHeaderForm(f => ({ ...f, profilePic: reader.result }));
    reader.readAsDataURL(file);
  };

  // education
  const startEditEdu  = (e) => setEditingEdu(p => ({ ...p, [e._id]: { ...e } }));
  const cancelEditEdu = (id) => setEditingEdu(p => { const n = { ...p }; delete n[id]; return n; });
  const saveEdu = async (id) => {
    const updated = await updateEducation(id, editingEdu[id]);
    setEducation(prev => prev.map(e => e._id === id ? updated : e));
    cancelEditEdu(id);
  };
  const removeEdu = async (id) => {
    await deleteEducation(id);
    setEducation(prev => prev.filter(e => e._id !== id));
  };

  // experience
  const startEditExp  = (e) => setEditingExp(p => ({ ...p, [e._id]: { ...e } }));
  const cancelEditExp = (id) => setEditingExp(p => { const n = { ...p }; delete n[id]; return n; });
  const saveExp = async (id) => {
    const updated = await updateExperience(id, editingExp[id]);
    setExperience(prev => prev.map(e => e._id === id ? updated : e));
    cancelEditExp(id);
  };
  const removeExp = async (id) => {
    await deleteExperience(id);
    setExperience(prev => prev.filter(e => e._id !== id));
  };

  // skills
  const startEditSkill  = (s) => setEditingSkill(p => ({ ...p, [s._id]: { ...s } }));
  const cancelEditSkill = (id) => setEditingSkill(p => { const n = { ...p }; delete n[id]; return n; });
  const saveSkill = async (id) => {
    const updated = await updateSkill(id, editingSkill[id]);
    setSkills(prev => prev.map(s => s._id === id ? updated : s));
    cancelEditSkill(id);
  };
  const removeSkill = async (id) => {
    await deleteSkill(id);
    setSkills(prev => prev.filter(s => s._id !== id));
  };

  // projects
  const startEditProj  = (p) => setEditingProj(prev => ({ ...prev, [p._id]: { ...p, skills: p.skills?.map(s => s._id || s) || [] } }));
  const cancelEditProj = (id) => setEditingProj(p => { const n = { ...p }; delete n[id]; return n; });
  const saveProj = async (id) => {
    const updated = await updateProject(id, editingProj[id]);
    setProjects(prev => prev.map(p => p._id === id ? updated : p));
    cancelEditProj(id);
  };
  const removeProj = async (id) => {
    await deleteProject(id);
    setProjects(prev => prev.filter(p => p._id !== id));
  };

  // certifications
  const startEditCert  = (c) => setEditingCert(p => ({ ...p, [c._id]: { ...c } }));
  const cancelEditCert = (id) => setEditingCert(p => { const n = { ...p }; delete n[id]; return n; });
  const saveCert = async (id) => {
    const res = await axios.put(`/api/certifications/${id}`, editingCert[id], authHeader);
    setCerts(prev => prev.map(c => c._id === id ? res.data : c));
    cancelEditCert(id);
  };
  const removeCert = async (id) => {
    await axios.delete(`/api/certifications/${id}`, authHeader);
    setCerts(prev => prev.filter(c => c._id !== id));
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  if (loading) return (
    <div className="mp-loading">
      <div className="mp-pulse" />
      <span>Loading portfolio...</span>
    </div>
  );

  return (
    <div className="mp-root">

      {/* HEADER */}
      <section className="mp-header">
        <div className="mp-header-top">
          <div className="mp-avatar-wrap" onClick={() => editingHeader && fileInputRef.current?.click()}>
            {(headerForm.profilePic || portfolio?.profilePic)
              ? <img src={headerForm.profilePic || portfolio.profilePic} alt="profile" className="mp-avatar-img" />
              : <div className="mp-avatar">{(portfolio?.displayName || "U")[0].toUpperCase()}</div>
            }
            {editingHeader && <div className="mp-avatar-overlay">📷</div>}
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePicChange} />
          </div>
          <div className="mp-header-info">
            {editingHeader ? (
              <input className="mp-input mp-name-input" placeholder="Your display name" value={headerForm.displayName} onChange={e => setHeaderForm(f => ({ ...f, displayName: e.target.value }))} />
            ) : (
              <h1 className="mp-name">{portfolio?.displayName || <span className="mp-empty">Add your name →</span>}</h1>
            )}
            <div className="mp-links">
              {portfolio?.github   && <a href={portfolio.github}   target="_blank" rel="noreferrer" className="mp-link">GitHub</a>}
              {portfolio?.linkedin && <a href={portfolio.linkedin} target="_blank" rel="noreferrer" className="mp-link">LinkedIn</a>}
              {portfolio?.website  && <a href={portfolio.website}  target="_blank" rel="noreferrer" className="mp-link">Website</a>}
            </div>
          </div>
          <button className="mp-edit-btn" onClick={() => { setEditingHeader(!editingHeader); setHeaderStatus(""); }}>
            {editingHeader ? "Cancel" : "Edit profile"}
          </button>
        </div>
        {editingHeader ? (
          <div className="mp-bio-form">
            <textarea className="mp-textarea" placeholder="Write a short bio..." value={headerForm.bio} rows={3} onChange={e => setHeaderForm(f => ({ ...f, bio: e.target.value }))} />
            <div className="mp-bio-inputs">
              <input className="mp-input" placeholder="GitHub URL"   value={headerForm.github}   onChange={e => setHeaderForm(f => ({ ...f, github:   e.target.value }))} />
              <input className="mp-input" placeholder="LinkedIn URL" value={headerForm.linkedin} onChange={e => setHeaderForm(f => ({ ...f, linkedin: e.target.value }))} />
              <input className="mp-input" placeholder="Website URL"  value={headerForm.website}  onChange={e => setHeaderForm(f => ({ ...f, website:  e.target.value }))} />
            </div>
            <SaveBar onSave={saveHeader} onCancel={() => setEditingHeader(false)} status={headerStatus} />
          </div>
        ) : (
          <p className="mp-bio">{portfolio?.bio || <span className="mp-empty">No bio yet — click Edit profile to add one.</span>}</p>
        )}
      </section>

      <div className="mp-grid">

        {/* EXPERIENCE */}
        <section className="mp-card mp-wide">
          <div className="mp-card-header"><span className="mp-card-icon">💼</span><h2>Experience</h2></div>
          {experience.length === 0
            ? <p className="mp-empty">No experience added yet.</p>
            : experience.map((exp) => {
              const editing = editingExp[exp._id];
              return (
                <div key={exp._id} className="mp-entry">
                  {editing ? (
                    <div className="mp-inline-form">
                      <div className="mp-inline-row">
                        <input className="mp-input" placeholder="Job title" value={editing.title}   onChange={e => setEditingExp(p => ({ ...p, [exp._id]: { ...p[exp._id], title:   e.target.value }}))} />
                        <input className="mp-input" placeholder="Company"   value={editing.company} onChange={e => setEditingExp(p => ({ ...p, [exp._id]: { ...p[exp._id], company: e.target.value }}))} />
                      </div>
                      <div className="mp-inline-row">
                        <input className="mp-input" placeholder="Start date" value={editing.startDate} onChange={e => setEditingExp(p => ({ ...p, [exp._id]: { ...p[exp._id], startDate: e.target.value }}))} />
                        <input className="mp-input" placeholder="End date"   value={editing.endDate}   onChange={e => setEditingExp(p => ({ ...p, [exp._id]: { ...p[exp._id], endDate:   e.target.value }}))} />
                      </div>
                      <textarea className="mp-textarea" placeholder="Description" rows={2} value={editing.description} onChange={e => setEditingExp(p => ({ ...p, [exp._id]: { ...p[exp._id], description: e.target.value }}))} />
                      <SaveBar onSave={() => saveExp(exp._id)} onCancel={() => cancelEditExp(exp._id)} />
                    </div>
                  ) : (
                    <>
                      <div className="mp-entry-top">
                        <span className="mp-entry-title">{exp.title}</span>
                        <span className="mp-entry-date">{exp.startDate} — {exp.endDate || "Present"}</span>
                      </div>
                      <span className="mp-entry-sub">{exp.company}</span>
                      {exp.description && <p className="mp-entry-desc">{exp.description}</p>}
                      <div className="mp-item-actions">
                        <button className="mp-action-btn" onClick={() => startEditExp(exp)}>Edit</button>
                        <button className="mp-action-btn danger" onClick={() => removeExp(exp._id)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </section>

        {/* EDUCATION */}
        <section className="mp-card mp-wide">
          <div className="mp-card-header"><span className="mp-card-icon">🎓</span><h2>Education</h2></div>
          {education.length === 0
            ? <p className="mp-empty">No education added yet.</p>
            : education.map((edu) => {
              const editing = editingEdu[edu._id];
              return (
                <div key={edu._id} className="mp-entry">
                  {editing ? (
                    <div className="mp-inline-form">
                      <div className="mp-inline-row">
                        <input className="mp-input" placeholder="School" value={editing.school} onChange={e => setEditingEdu(p => ({ ...p, [edu._id]: { ...p[edu._id], school: e.target.value }}))} />
                        <input className="mp-input" placeholder="Degree" value={editing.degree} onChange={e => setEditingEdu(p => ({ ...p, [edu._id]: { ...p[edu._id], degree: e.target.value }}))} />
                      </div>
                      <div className="mp-inline-row">
                        <input className="mp-input" placeholder="Field of study" value={editing.fieldOfStudy} onChange={e => setEditingEdu(p => ({ ...p, [edu._id]: { ...p[edu._id], fieldOfStudy: e.target.value }}))} />
                        <input className="mp-input" placeholder="Start date"     value={editing.startDate}    onChange={e => setEditingEdu(p => ({ ...p, [edu._id]: { ...p[edu._id], startDate:    e.target.value }}))} />
                        <input className="mp-input" placeholder="End date"       value={editing.endDate}      onChange={e => setEditingEdu(p => ({ ...p, [edu._id]: { ...p[edu._id], endDate:      e.target.value }}))} />
                      </div>
                      <textarea className="mp-textarea" placeholder="Description" rows={2} value={editing.description} onChange={e => setEditingEdu(p => ({ ...p, [edu._id]: { ...p[edu._id], description: e.target.value }}))} />
                      <SaveBar onSave={() => saveEdu(edu._id)} onCancel={() => cancelEditEdu(edu._id)} />
                    </div>
                  ) : (
                    <>
                      <div className="mp-entry-top">
                        <span className="mp-entry-title">{edu.school}</span>
                        <span className="mp-entry-date">{edu.startDate} — {edu.endDate || "Present"}</span>
                      </div>
                      <span className="mp-entry-sub">{edu.degree}{edu.fieldOfStudy ? ` · ${edu.fieldOfStudy}` : ""}</span>
                      {edu.description && <p className="mp-entry-desc">{edu.description}</p>}
                      <div className="mp-item-actions">
                        <button className="mp-action-btn" onClick={() => startEditEdu(edu)}>Edit</button>
                        <button className="mp-action-btn danger" onClick={() => removeEdu(edu._id)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </section>

        {/* SKILLS */}
        <section className="mp-card">
          <div className="mp-card-header"><span className="mp-card-icon">⚡</span><h2>Skills</h2></div>
          {skills.length === 0
            ? <p className="mp-empty">No skills added yet.</p>
            : Object.entries(skillsByCategory).map(([cat, items]) => (
              <div key={cat} className="mp-skill-group">
                <span className="mp-skill-cat">{cat}</span>
                <div className="mp-skill-list">
                  {items.map((skill) => {
                    const editing = editingSkill[skill._id];
                    return (
                      <div key={skill._id} className={`mp-skill-chip ${editing ? "editing" : ""}`}>
                        {editing ? (
                          <div className="mp-skill-edit">
                            <input className="mp-input mp-input-sm" value={editing.name} onChange={e => setEditingSkill(p => ({ ...p, [skill._id]: { ...p[skill._id], name: e.target.value }}))} />
                            <select className="mp-select-sm" value={editing.level} onChange={e => setEditingSkill(p => ({ ...p, [skill._id]: { ...p[skill._id], level: e.target.value }}))}>
                              <option>Beginner</option>
                              <option>Intermediate</option>
                              <option>Advanced</option>
                            </select>
                            <button className="mp-icon-btn" onClick={() => saveSkill(skill._id)}>✓</button>
                            <button className="mp-icon-btn" onClick={() => cancelEditSkill(skill._id)}>✕</button>
                          </div>
                        ) : (
                          <>
                            <span className="mp-skill-name">{skill.name}</span>
                            <div className="mp-skill-right">
                              <span className="mp-skill-dots">{levelDots(skill.level)}</span>
                              <button className="mp-icon-btn" onClick={() => startEditSkill(skill)} title="Edit">✎</button>
                              <button className="mp-icon-btn danger" onClick={() => removeSkill(skill._id)} title="Delete">✕</button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </section>

        {/* PROJECTS */}
        <section className="mp-card">
          <div className="mp-card-header"><span className="mp-card-icon">🚀</span><h2>Projects</h2></div>
          {projects.length === 0
            ? <p className="mp-empty">No projects added yet.</p>
            : projects.map((proj) => {
              const editing = editingProj[proj._id];
              return (
                <div key={proj._id} className="mp-project">
                  {editing ? (
                    <div className="mp-inline-form">
                      <input className="mp-input" placeholder="Title" value={editing.title} onChange={e => setEditingProj(p => ({ ...p, [proj._id]: { ...p[proj._id], title: e.target.value }}))} />
                      <textarea className="mp-textarea" placeholder="Description" rows={2} value={editing.description} onChange={e => setEditingProj(p => ({ ...p, [proj._id]: { ...p[proj._id], description: e.target.value }}))} />
                      <input className="mp-input" placeholder="GitHub link" value={editing.githubLink} onChange={e => setEditingProj(p => ({ ...p, [proj._id]: { ...p[proj._id], githubLink: e.target.value }}))} />
                      <SaveBar onSave={() => saveProj(proj._id)} onCancel={() => cancelEditProj(proj._id)} />
                    </div>
                  ) : (
                    <>
                      <div className="mp-project-top">
                        <span className="mp-project-title">{proj.title}</span>
                        {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" className="mp-proj-link">↗ GitHub</a>}
                      </div>
                      {proj.description && <p className="mp-entry-desc">{proj.description}</p>}
                      {proj.skills?.length > 0 && (
                        <div className="mp-proj-tags">
                          {proj.skills.map((s) => <span key={s._id || s} className="mp-tag">{s.name || s}</span>)}
                        </div>
                      )}
                      <div className="mp-item-actions">
                        <button className="mp-action-btn" onClick={() => startEditProj(proj)}>Edit</button>
                        <button className="mp-action-btn danger" onClick={() => removeProj(proj._id)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </section>

        {/* CERTIFICATIONS */}
        <section className="mp-card mp-wide">
          <div className="mp-card-header"><span className="mp-card-icon">🏅</span><h2>Certifications</h2></div>
          {certs.length === 0
            ? <p className="mp-empty">No certifications added yet.</p>
            : certs.map((cert) => {
              const editing = editingCert[cert._id];
              return (
                <div key={cert._id} className="mp-entry">
                  {editing ? (
                    <div className="mp-inline-form">
                      <div className="mp-inline-row">
                        <input className="mp-input" placeholder="Title"  value={editing.title}  onChange={e => setEditingCert(p => ({ ...p, [cert._id]: { ...p[cert._id], title:  e.target.value }}))} />
                        <input className="mp-input" placeholder="Issuer" value={editing.issuer} onChange={e => setEditingCert(p => ({ ...p, [cert._id]: { ...p[cert._id], issuer: e.target.value }}))} />
                      </div>
                      <input className="mp-input" type="date" value={editing.date?.split("T")[0] || ""} onChange={e => setEditingCert(p => ({ ...p, [cert._id]: { ...p[cert._id], date: e.target.value }}))} />
                      <textarea className="mp-textarea" placeholder="Description" rows={2} value={editing.description} onChange={e => setEditingCert(p => ({ ...p, [cert._id]: { ...p[cert._id], description: e.target.value }}))} />
                      <SaveBar onSave={() => saveCert(cert._id)} onCancel={() => cancelEditCert(cert._id)} />
                    </div>
                  ) : (
                    <>
                      <div className="mp-entry-top">
                        <span className="mp-entry-title">{cert.title}</span>
                        {cert.date && <span className="mp-entry-date">{new Date(cert.date).toLocaleDateString()}</span>}
                      </div>
                      <span className="mp-entry-sub">{cert.issuer}</span>
                      {cert.description && <p className="mp-entry-desc">{cert.description}</p>}
                      <div className="mp-item-actions">
                        <button className="mp-action-btn" onClick={() => startEditCert(cert)}>Edit</button>
                        <button className="mp-action-btn danger" onClick={() => removeCert(cert._id)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </section>

      </div>
    </div>
  );
}