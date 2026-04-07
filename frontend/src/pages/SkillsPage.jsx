import { useEffect, useState } from "react";
import { getSkills, createSkill, deleteSkill } from "../services/skillService";
// The SkillsPage component is a React functional component that manages the state and behavior for displaying and managing skills. It uses the useState hook to manage state variables for skills and form data for creating new skills. The useEffect hook is used to load the initial data for skills when the component mounts. The component includes functions for handling form input changes, submitting new skills, and deleting existing skills. The rendered output includes a form for adding new skills and a list of existing skills with their details and a delete button for each skill.
function SkillsPage() {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        category: "Language",
        level: "Beginner",
    });
// The loadSkills function is an asynchronous function that fetches the list of skills from the backend using the getSkills service function. Once the data is fetched, it updates the skills state variable with the retrieved data. This allows the component to have access to the list of skills, which can be displayed on the page or used for other purposes within the component.
    const loadSkills = async () => {
        const data = await getSkills();
        setSkills(data);
    };
// The useEffect hook is used to fetch the list of skills when the component mounts. It calls the loadSkills function, which retrieves the skills from the backend and updates the component state. This ensures that the skills are loaded and displayed on the page when the user navigates to the SkillsPage component.
    useEffect(() => {
        loadSkills();
    }, []);
// The handleChange function is an event handler for managing changes to the form inputs for creating a new skill. It takes the event object as an argument and updates the formData state by creating a new object that spreads the existing formData and then updates the specific field that changed based on the name attribute of the input element. This allows for a single change handler to manage multiple form fields without needing separate handlers for each field.
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
// The handleSubmit function is an event handler for managing the submission of the skill creation form. It prevents the default form submission behavior, checks if the skill name is provided, and if valid, calls the createSkill service function with the current formData to create a new skill in the backend. After creating the skill, it resets the formData state to clear the form fields and calls loadSkills to refresh the list of skills displayed on the page with the newly added skill.
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            alert("Skill name is required");
            return;
        }

        await createSkill(formData);
        setFormData({ name: "", category: "Language", level: "Beginner" });
        loadSkills();
    };
// The handleDelete function is an event handler for managing the deletion of a skill. It takes the skill ID as an argument, calls the deleteSkill service function to delete the skill from the backend, and then calls loadSkills to refresh the list of skills displayed on the page without the deleted skill.
    const handleDelete = async (id) => {
        await deleteSkill(id);
        loadSkills();
    };
// The return statement of the SkillsPage component renders the UI for the skills page. It includes a form for adding new skills, which consists of input fields for the skill name, category, and proficiency level. Below the form, it renders a list of existing skills, displaying their name, category, and level. Each skill also has a delete button that allows the user to remove the skill from the list.
    return (
        <div>
            <h1>Skills</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Skill Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="Language">Language</option>
                    <option value="Framework">Framework</option>
                    <option value="Tool">Tool</option>
                    <option value="Technology">Technology</option>
                    <option value="Certification">Certification</option>
                    <option value="Other Skills">Other Skills</option>
                </select>

                <select name="level" value={formData.level} onChange={handleChange}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>

                <button type="submit">Add Skill</button>
            </form>

            <ul>
                {skills.map((skill) => (
                    <li key={skill._id}>
                        {skill.name} - {skill.category} - {skill.level}
                        <button onClick={() => handleDelete(skill._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SkillsPage;