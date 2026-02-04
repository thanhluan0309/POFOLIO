import "./App.css";
import "aos/dist/aos.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import HomePage from "./pages/profile/Homepage";
import Base from "./component/Base/Base";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Base>
              <HomePage />
            </Base>
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route
          path="/profile"
          element={
            <Base>
              <Profile />
            </Base>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
