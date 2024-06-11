import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import SecondryClasses from "./pages/SecondryClasses";
import AddData from "./components/SecondryClasses/AddData";
import UserData from "./components/SecondryClasses/UserData";
import EditData from "./components/SecondryClasses/EditData";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div>
        <Toaster />
      </div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<SecondryClasses />} />
          <Route path="/addData" element={<AddData />} />
          <Route path="/secondryClsses/userData/:id" element={<UserData />} />
          <Route path="/secondryClsses/updateData/:id" element={<EditData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
