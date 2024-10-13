import React, { useState } from "react";
import "./index.css"; // Importing CSS file

const UserForm = () => {
  const [name, setName] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("socialHandle", socialHandle);
    formData.append("image", image);

    try {
      const response = await fetch("https://socialmediabackend-1-uxen.onrender.com/user", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        setName("");
        setSocialHandle("");
        setImage(null);
        console.log("Submission successful");
      } else {
        setError("Failed to submit form");
      }
    } catch (error) {
      setError("Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="submission-container">
      <div className="form-box">
        <h2>User Submission Form</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="text"
            placeholder="Social Media Handle"
            value={socialHandle}
            onChange={(e) => setSocialHandle(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="input-field"
            required
          />
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Form submitted successfully!</p>}
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
