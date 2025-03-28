import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import UserInfoPage from "./pages/UserExample";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/user-info" element={<UserInfoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
