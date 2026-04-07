import { useEffect, useState } from "react";
import { getProjects, createProject, deleteProject } from "../services/projectService";
import { getSkills } from "../services/skillService";
// The ProjectsPage component is a React functional component that manages the state and behavior for displaying and managing projects. It uses the useState hook to manage state variables for projects, skills, and form data for creating new projects. The useEffect hook is used to load the initial data for projects and skills when the component mounts. The component includes functions for handling form input changes, submitting new projects, and deleting existing projects. The rendered output includes a form for adding new projects and a list of existing projects with their details and a delete button for each project.
function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubLink: "",
    skills: [],
  });
// The loadProjects function is an asynchronous function that fetches the list of projects from the backend using the getProjects service function. Once the data is fetched, it updates the projects state variable with the retrieved data. This allows the component to have access to the list of projects, which can be displayed on the page or used for other purposes within the component.
  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };
// The loadSkills function is an asynchronous function that fetches the list of skills from the backend using the getSkills service function. Once the data is fetched, it updates the skills state variable with the retrieved data. This allows the component to have access to the list of skills, which can be used for displaying skill options in a form or for other purposes within the component.
  const loadSkills = async () => {
    const data = await getSkills();
    setSkills(data);
  };

  useEffect(() => {
    loadProjects();
    loadSkills();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
// The handleSkillChange function is an event handler for managing changes to a multi-select input for skills in the project creation form. It takes the event object as an argument, extracts the selected options from the event target, and updates the formData state with the selected skill IDs. This allows the component to keep track of which skills have been selected for the new project being created.
  const handleSkillChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, skills: selected });
  };
// The handleSubmit function is an event handler for managing the submission of the project creation form. It prevents the default form submission behavior, calls the createProject service function with the current formData to create a new project in the backend, and then resets the formData state to clear the form fields. After creating the project, it calls loadProjects to refresh the list of projects displayed on the page with the newly added project.
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProject(formData);
    setFormData({
      title: "",
      description: "",
      githubLink: "",
      skills: [],
    });
    loadProjects();
  };
// The handleDelete function is an event handler for managing the deletion of a project. It takes the project ID as an argument, calls the deleteProject service function to delete the project from the backend, and then calls loadProjects to refresh the list of projects displayed on the page without the deleted project.
  const handleDelete = async (id) => {
    await deleteProject(id);
    loadProjects();
  };
// The return statement of the ProjectsPage component renders the UI for the projects page. It includes a form for adding new projects, which consists of input fields for the project title, description, GitHub link, and a multi-select for skills. Below the form, it renders a list of existing projects, displaying their title, description, GitHub link, and associated skills. Each project also has a delete button that allows the user to remove the project from the list.
  return (
    <div>
      <h1>Projects</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="githubLink"
          placeholder="GitHub link"
          value={formData.githubLink}
          onChange={handleChange}
        />

        <select multiple value={formData.skills} onChange={handleSkillChange}>
          {skills.map((skill) => (
            <option key={skill._id} value={skill._id}>
              {skill.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Project</button>
      </form>

      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>{project.githubLink}</p>
            <p>
              Skills:{" "}
              {project.skills && project.skills.length > 0
                ? project.skills.map((skill) => skill.name).join(", ")
                : "None"}
            </p>
            <button onClick={() => handleDelete(project._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsPage;