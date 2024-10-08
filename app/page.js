"use client";
import React, { useState } from "react";
import masterdata from "@/staticJSON/masterdata.json";
import { formConfig } from "@/config/formConfig";
import "./home.scss";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    gender: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    pin: "",
  });
  const [expandedRow, setExpandedRow] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, state: value, city: "" }));
  };

  const validateForm = () => {
    const { name, email, linkedin, gender, addressLine1, state, city, pin } =
      formData;

    if (
      !name ||
      name.length < formConfig.validations.name.minLength ||
      name.length > formConfig.validations.name.maxLength
    ) {
      alert(
        `Name must be between ${formConfig.validations.name.minLength} and ${formConfig.validations.name.maxLength} characters.`
      );
      return false;
    }
    if (!email || !formConfig.validations.email.pattern.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!linkedin || !formConfig.validations.linkedin.pattern.test(linkedin)) {
      alert("Please enter a valid LinkedIn URL.");
      return false;
    }
    if (!gender) {
      alert("Gender is mandatory.");
      return false;
    }
    if (!addressLine1) {
      alert("Address Line 1 is mandatory.");
      return false;
    }
    if (!state || !city) {
      alert("State and City are mandatory.");
      return false;
    }
    if (!pin || !formConfig.validations.pin.pattern.test(pin)) {
      alert("PIN should be a 6-digit number.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (selectedUser) {
        setUsers((prev) =>
          prev.map((user) =>
            user.email === selectedUser.email ? formData : user
          )
        );
      } else {
        setUsers((prev) => [...prev, formData]);
      }
      resetForm();
    }
  };

  const handleDeleteUser = (userToDelete) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) =>
        prev.filter((user) => user.email !== userToDelete.email)
      );
      resetForm();
    }
  };

  const resetForm = () => {
    setSelectedUser(null);
    setFormData({
      name: "",
      email: "",
      linkedin: "",
      gender: "",
      addressLine1: "",
      addressLine2: "",
      state: "",
      city: "",
      pin: "",
    });
  };

  const toggleExpand = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="home-wrapper">
      <div className="form">
        <h1>CRUD Task</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>
              Name <span className="important">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-field">
            <label>
              Email <span className="important">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-field">
            <label>
              LinkedIn URL <span className="important">*</span>
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-field">
            <label>
              Gender <span className="important">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-field">
            <label>Address Line 1</label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Address Line 2</label>
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <label>State </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              required
            >
              <option value="">Select</option>
              {masterdata.states.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label>City </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              {masterdata.states
                .find((s) => s.name === formData.state)
                ?.cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-field">
            <label>
              PIN <span className="important">*</span>
            </label>
            <input
              type="number"
              name="pin"
              value={formData.pin}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            {" "}
            <button type="submit" className="adduser_btn">
              {selectedUser ? "Edit User" : "Add User"}
            </button>
          </div>
        </form>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>LinkedIn</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <React.Fragment key={user.email}>
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.linkedin}</td>
                  <td>{user.gender}</td>
                  <td>
                    <div className="table_btn">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setFormData(user);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="table_btn">
                      <button onClick={() => handleDeleteUser(user)}>
                        Delete
                      </button>
                    </div>
                    <div className="table_btn">
                      <button onClick={() => toggleExpand(index)}>
                        {expandedRow === index ? "Hide" : "Show"} Address
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr>
                    <td colSpan="5">
                      {user.addressLine1}
                      <br />
                      {user.addressLine2 && (
                        <span>
                          {user.addressLine2}
                          <br />
                        </span>
                      )}
                      {user.city}, {user.state} - {user.pin}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
