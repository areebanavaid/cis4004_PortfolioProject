import { useEffect, useState } from "react";
// The UserManagementPage component is a React functional component that provides an interface for administrators to manage user accounts on the Portfolio Builder platform. It fetches the list of users from the backend API and displays them in a table format, showing their username, email, and role. The component also includes functionality to delete user accounts, which sends a DELETE request to the backend API and updates the UI accordingly. The component handles loading states and error messages to enhance user experience during data fetching and manipulation.
// The deleteUser function is an asynchronous function that takes a user ID as an argument and sends a DELETE request to the backend API to remove the user with the specified ID. It includes error handling to alert the user if the deletion fails, and updates the local state to remove the deleted user from the displayed list of users.
// The useEffect hook is used to fetch the list of users from the backend API when the component mounts. It defines an asynchronous function loadUsers that sends a GET request to the API, handles the response, and updates the component state with the retrieved user data. The hook also manages loading and error states to provide feedback to the user during the data fetching process.

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
// The deleteUser function is an asynchronous function that takes a user ID as an argument and sends a DELETE request to the backend API to remove the user with the specified ID. It includes error handling to alert the user if the deletion fails, and updates the local state to remove the deleted user from the displayed list of users.
  const deleteUser = async (id) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };
// The useEffect hook is used to fetch the list of users from the backend API when the component mounts. It defines an asynchronous function loadUsers that sends a GET request to the API, handles the response, and updates the component state with the retrieved user data. The hook also manages loading and error states to provide feedback to the user during the data fetching process.
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch("/api/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const data = await res.json();
// If the response is not OK, throw an error with the message from the response or a default message
        if (!res.ok) {
          throw new Error(data.message || "Failed to load users");
        }

        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
// The return statement of the UserManagementPage component renders the UI for the user management page. It displays a table of users with their username, email, role, and an action button to delete each user. The table is only rendered if there are users to display, and appropriate messages are shown during loading or if there is an error.
  return (
    <div>
      <h1>User Management</h1>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => deleteUser(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}