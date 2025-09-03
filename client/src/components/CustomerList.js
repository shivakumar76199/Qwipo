import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <ul>
          {customers.map((c) => (
            <li key={c.id}>
              <Link to={`/customers/${c.id}`}>
                {c.firstName} {c.lastName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomerList;
