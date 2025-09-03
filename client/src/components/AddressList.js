import React from "react";

function AddressList({ addresses }) {
  if (!addresses || addresses.length === 0) {
    return <p>No addresses available</p>;
  }

  return (
    <ul>
      {addresses.map((a) => (
        <li key={a.id}>
          {a.addressLine}, {a.city}, {a.state} - {a.pincode}
        </li>
      ))}
    </ul>
  );
}

export default AddressList;
