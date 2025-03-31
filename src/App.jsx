import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import UserInfoPage from "./pages/UserExample";
import Subscription from "./pages/Subscription";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/user-info" element={<UserInfoPage />} />
          <Route path="/" element={<Index />} />
          <Route path = "/subscription" element={<Subscription />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
