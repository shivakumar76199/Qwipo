import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    addresses: [{ addressLine: "", city: "", state: "", pincode: "" }],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (index, e) => {
    const newAddresses = [...formData.addresses];
    newAddresses[index][e.target.name] = e.target.value;
    setFormData({ ...formData, addresses: newAddresses });
  };

  const addAddress = () => {
    setFormData({
      ...formData,
      addresses: [...formData.addresses, { addressLine: "", city: "", state: "", pincode: "" }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Customer created successfully!");
        navigate("/customers");
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First Name" onChange={handleChange} /><br />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} /><br />
      <input name="phone" placeholder="Phone" onChange={handleChange} /><br />
      <input name="city" placeholder="City" onChange={handleChange} /><br />
      <input name="state" placeholder="State" onChange={handleChange} /><br />
      <input name="pincode" placeholder="Pincode" onChange={handleChange} /><br />

      <h4>Addresses</h4>
      {formData.addresses.map((addr, index) => (
        <div key={index}>
          <input name="addressLine" placeholder="Address Line" onChange={(e) => handleAddressChange(index, e)} /><br />
          <input name="city" placeholder="City" onChange={(e) => handleAddressChange(index, e)} /><br />
          <input name="state" placeholder="State" onChange={(e) => handleAddressChange(index, e)} /><br />
          <input name="pincode" placeholder="Pincode" onChange={(e) => handleAddressChange(index, e)} /><br />
          <br />
        </div>
      ))}

      <button type="button" onClick={addAddress}>+ Add Another Address</button><br /><br />
      <button type="submit">Save Customer</button>
    </form>
  );
}

export default CustomerForm;
