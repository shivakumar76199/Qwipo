import React, { useState } from "react";

function AddressForm({ customerId, onAddressAdded }) {
  const [address, setAddress] = useState({
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...address, customerId }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Address added successfully!");
        if (onAddressAdded) onAddressAdded();
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Address</h3>
      <input
        name="addressLine"
        placeholder="Address Line"
        value={address.addressLine}
        onChange={handleChange}
      /><br />
      <input
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleChange}
      /><br />
      <input
        name="state"
        placeholder="State"
        value={address.state}
        onChange={handleChange}
      /><br />
      <input
        name="pincode"
        placeholder="Pincode"
        value={address.pincode}
        onChange={handleChange}
      /><br /><br />
      <button type="submit">Save Address</button>
    </form>
  );
}

export default AddressForm;
