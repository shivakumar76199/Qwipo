import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CustomerListPage from "./pages/CustomerListPage";
import CustomerFormPage from "./pages/CustomerFormPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";

function App() {
  return (
    <Router>
      <div>
        <h1>Qwipo Assignment</h1>
        <nav>
          <Link to="/customers">Customers</Link> |{" "}
          <Link to="/customers/new">Add Customer</Link>
        </nav>

        <Routes>
          <Route path="/customers" element={<CustomerListPage />} />
          <Route path="/customers/new" element={<CustomerFormPage />} />
          <Route path="/customers/:id" element={<CustomerDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
