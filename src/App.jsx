import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { logout } from "./services/authApi";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <button onClick={logout}>Logout</button>
        } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
