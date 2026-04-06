import React, { useEffect, useState } from "react";
import axios from "axios";

const CertificationPage = () => {
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    issuer: "",
    date: "",
    description: ""
  });

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const fetchCerts = async () => {
    try {
      const res = await axios.get("/api/certifications", authHeader);
      setCerts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/certifications", form, authHeader);
      setForm({ title: "", issuer: "", date: "", description: "" });
      fetchCerts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/certifications/${id}`, authHeader);
      fetchCerts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>My Certifications</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={form.title}
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          value={form.issuer}
          placeholder="Issuer"
          onChange={(e) => setForm({ ...form, issuer: e.target.value })}
        />
        <input
          value={form.date}
          type="date"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          value={form.description}
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">Add Certification</button>
      </form>

      <ul>
        {certs.map((c) => (
          <li key={c._id}>
            <strong>{c.title}</strong> — {c.issuer}
            {c.date && <span> ({new Date(c.date).toLocaleDateString()})</span>}
            <p>{c.description}</p>
            <button onClick={() => handleDelete(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CertificationPage;
