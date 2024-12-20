import "./App.css";
import "aos/dist/aos.css"; // Nhớ import CSS của AOS

import "flowbite";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Intro from "./pages/Intro/Intro";
import Profile from "./pages/profile/Profile";
import HomePage from "./pages/profile/Homepage";
import Base from "./component/Base/Base";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro></Intro>}></Route>
        <Route
          path="/profile"
          element={<Base children={<Profile></Profile>}></Base>}
        ></Route>

        <Route
          path="/home"
          element={<Base children={<HomePage></HomePage>}></Base>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
