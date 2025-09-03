import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressList from "./AddressList";

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/customers/${id}`)
      .then((res) => res.json())
      .then((data) => setCustomer(data))
      .catch((err) => console.error("Error:", err));
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  return (
    <div>
      <p>Name: {customer.firstName} {customer.lastName}</p>
      <p>Phone: {customer.phone}</p>
      <p>City: {customer.city}</p>
      <p>State: {customer.state}</p>
      <p>Pincode: {customer.pincode}</p>

      <h3>Addresses</h3>
      <AddressList addresses={customer.addresses} />
    </div>
  );
}

export default CustomerDetails;
