import React, { useState } from "react";
import '../styles/ComplainCreation.css';

const ComplainForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    description: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
        console.log("File read successfully:", reader.result);
      };
    }
    console.log(file);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
    const response = await fetch("http://localhost:5000/api/complain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    console.log(response);
    if (response.ok) {
      console.log("Complain submitted successfully");
      setFormData({
        name: "",
        phone: "",
        address: "",
        description: "",
        photo: null,
      });
    } else {
      console.error("Failed to submit complain");
    }
  } catch (error) {
    console.error("Error submitting complain:", error);
  }

  };

  return (
    <div>
      <div className="complain">
        <div className="complain_area">
          <form className="complain_box" onSubmit={handleSubmit}>
            <div className="complain_photo">
              <h2>Photo</h2>
              <input
                type="file"
                accept="image/*"
                id="photoInput"
                onChange={handleFileChange}
              />
            </div>

            <div className="complain_own_detail">
              <div className="complain_name">
                <h2>Name:</h2>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="complain_phone">
                <h2>Phone Number:</h2>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="Enter your Contact Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="complain_address">
              <h2>Address:</h2>
              <input
                type="text"
                placeholder="Enter your address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="complain_description">
              <h2>Description:</h2>
              <textarea
                placeholder="Enter your problem description"
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="complain_sendbutton">
              <button type="submit">Send</button>
            </div>
          </form>
        </div>

        <div className="complain_content">
          <div className="complain_rightup">
            <div className="complain_pic"></div>
          </div>

          <div className="complain_rightdown">
            <div className="complain_benfits">
              <h1>FixMate Promise</h1>
              <ul>
                <li>Verified Professionals</li>
                <li>Separate Charges Apply for Each Service Component</li>
                <li>No Hidden Costs – Clear Pricing for Every Service</li>
                <li>Commitment to Quality and Customer Satisfaction</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplainForm;
