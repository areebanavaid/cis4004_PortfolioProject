import { useEffect, useState } from "react";
import { fetchExperience, createExperience, deleteExperience } from "../services/api";
// This page allows users to add, view, and delete their work experience as part of their portfolio.
// It fetches the user's experience entries from the backend, displays them, and provides a form to add new experience.
// The experience entries include company name, job title, start and end dates, and a description of the role.

export default function ExperiencePage() {
  const [experienceList, setExperienceList] = useState([]);
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    startDate: "",
    endDate: "",
    description: ""
  });
// Load experience entries when the component mounts
  useEffect(() => {
    loadExperience();
  }, []);

  const loadExperience = async () => {
    const data = await fetchExperience();
    setExperienceList(data);
  };
// Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
//  Handle form submission to add a new experience entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createExperience(formData);
    setFormData({
      company: "",
      title: "",
      startDate: "",
      endDate: "",
      description: ""
    });
    loadExperience();
  };
// Handle deletion of an experience entry
  const handleDelete = async (id) => {
    await deleteExperience(id);
    loadExperience();
  };

  return (
    <div>
      <h2>Experience</h2>

      <form onSubmit={handleSubmit}>
        <div><input name="company" placeholder="Company" value={formData.company} onChange={handleChange} /></div>
        <div><input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} /></div>
        <div><input name="startDate" placeholder="Start Date" value={formData.startDate} onChange={handleChange} /></div>
        <div><input name="endDate" placeholder="End Date" value={formData.endDate} onChange={handleChange} /></div>
        <div><textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} /></div>
        <button type="submit">Add Experience</button>
      </form>

      <hr />

      {experienceList.map((exp) => (
        <div key={exp._id}>
          <h4>{exp.company}</h4>
          <p>{exp.title}</p>
          <p>{exp.startDate} - {exp.endDate}</p>
          <p>{exp.description}</p>
          <button onClick={() => handleDelete(exp._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}