import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { logout } from "./services/authApi";
import RegisterUser from "./pages/RegisterUser";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <button onClick={logout}>Logout</button} />
          <Route path="/register-user" element={<RegisterUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
