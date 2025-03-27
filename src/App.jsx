import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RegisterUser from "./pages/RegisterUser";

function App() {

  return (
    <>
      <Router>
        <Routes>
        <Route path="/register-user" element={<RegisterUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
