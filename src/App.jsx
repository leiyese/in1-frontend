import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import RegisterUser from "./pages/RegisterUser";
import Subscription from "./pages/Subscription";
import UserInfoPage from "./pages/UserExample";
import About from "./pages/About"; // Import the new About page

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
          <Route path = "/profile-page" element={<ProfilePage />} />        
          <Route path="/about" element={<About />} /> {/* Add the new route */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
