import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserCreateForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    role: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (value) => {
    setFormData({ ...formData, avatar: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "E-mail is required.";
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.role) newErrors.role = "Role is required.";
    if (!formData.avatar) newErrors.avatar = "Avatar is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    console.log(validationErrors)
          console.log(e)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
      console.log(e)
    }
    
    const response = await fetch("https://api.escuelajs.co/api/v1/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        console.log(response)

    setFormData({
      email: "",
      name: "",
      password: "",
      role: "",
      avatar: "",
      });
      setErrors({});
      navigate("/dashboard/users")
      
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Create User</h2>

      <label style={styles.label}>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.email && <span style={styles.error}>{errors.email}</span>}
      </label>

      <label style={styles.label}>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.name && <span style={styles.error}>{errors.name}</span>}
      </label>

      <label style={styles.label}>
        Password
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.password && (
          <span style={styles.error}>{errors.password}</span>
        )}
      </label>

      <label style={styles.label}>
        Role:
        <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
        {errors.role && (
          <span style={styles.error}>{errors.role}</span>
        )}
      </label>
      
      <div style={styles.label}>
        <span>Avatar:</span>
            <input
              type="text"
              placeholder="Avatar URL"
              value={formData.avatar}
              onChange={(e) => handleImageChange(e.target.value)}
              style={{ ...styles.input, flex: 1 }}
            />
        {errors.avatar && <span style={styles.error}>{errors.avatar}</span>}
      </div>
      <button type="submit" style={styles.submitButton}>
        Create User
      </button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#f9f9f9",
  },
  label: {
    display: "block",
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "8px",
    marginTop: "5px",
  },
  imageRow: {
    display: "flex",
    alignItems: "center",
    marginTop: "5px",
    gap: "5px",
  },
  addButton: {
    marginTop: "8px",
    padding: "6px 10px",
    cursor: "pointer",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
  removeButton: {
    background: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    fontSize: "0.9em",
    display: "block",
    marginTop: "4px",
  },
};

export default UserCreateForm;
