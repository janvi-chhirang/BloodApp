//import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./components/Router/Protected";
import Public from "./components/Router/Public";
import Donar from "./pages/Dashboard/Donar";
import Hospitals from "./pages/Dashboard/Hospitals";
import Organisation from "./pages/Dashboard/Organisation";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Donation";
import Analytics from "./pages/Dashboard/Analytics";
import DonarList from "./pages/Admin/DonarList";
import HospitalList from "./pages/Admin/HospitalList";
import OrganisationList from "./pages/Admin/OrgList";
import AdminHome from "./pages/Admin/AdminHome";

function App() {
  return (
    <div>
      <ToastContainer preventDuplicates={true} />
      <Routes>
        <Route
          path="/hospital"
          element={
            <Protected>
              <Hospitals />
            </Protected>
          }
        />
                <Route
          path="/admin"
          element={
            <Protected>
              <AdminHome />
            </Protected>
          }
        />
                <Route
          path="/donar-list"
          element={
            <Protected>
              <DonarList />
            </Protected>
          }
        />
                <Route
          path="/hospital-list"
          element={
            <Protected>
              <HospitalList />
            </Protected>
          }
        />
                <Route
          path="/org-list"
          element={
            <Protected>
              <OrganisationList />
            </Protected>
          }
        />
        <Route
          path="/consumer"
          element={
            <Protected>
              <Consumer />
            </Protected>
          }
        />
                <Route
          path="/analytics"
          element={
            <Protected>
              <Analytics />
            </Protected>
          }
        />
                <Route
          path="/donation"
          element={
            <Protected>
              <Donation />
            </Protected>
          }
        />
        <Route
          path="/organisation"
          element={
            <Protected>
              <Organisation />
            </Protected>
          }
        />
        <Route
          path="/donar"
          element={
            <Protected>
              <Donar />
            </Protected>
          }
        />
        <Route
          path="/"
          element={
            <Protected>
              <HomePage />
            </Protected>
          }
        />

        <Route
          path="/login"
          element={
            <Public>
              <Login />
            </Public>
          }
        />

        <Route
          path="/register"
          element={
            <Public>
              <Register />
            </Public>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
