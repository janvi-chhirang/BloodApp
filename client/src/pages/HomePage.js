import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/Layout/Modals/Modal";
import API from "../services/API";

const HomePage = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-Inventory");
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?.role !== "donar" && user?.role !== "admin") {
      getBloodRecords();
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container-fluid">
          {(user?.role === "donar" || user?.role === "hospital") ? (
            <div className="container mt-5">
              <div
                className="row justify-content-center align-items-center"
                style={{ minHeight: "55vh" }}
              >
                <div className="col-md-10 col-lg-8">
                  <div
                    className="p-5 text-center"
                    style={{
                      backgroundColor: "#fcfcfc",
                      borderRadius: "4px",
                      border: "2px solid #2d3403",
                    }}
                  >
                    <div className="mb-4">
                      <span
                        className="badge px-3 py-2"
                        style={{
                          backgroundColor: "#2d3403",
                          color: "#fff",
                          fontSize: "0.7rem",
                          borderRadius: "2px",
                        }}
                      >
                        {user?.role === "donar" ? "DONOR DASHBOARD" : "HOSPITAL DASHBOARD"}
                      </span>
                    </div>
                    <h1 className="display-6 mb-3" style={{ color: "#1a1a1a" }}>
                      Welcome back,{" "}
                      <span className="fw-bold" style={{ color: "#2d3403" }}>
                        {user?.role}
                      </span>
                    </h1>
                    <p
                      className="text-muted mx-auto mb-4"
                      style={{ maxWidth: "500px" }}
                    >
                      Your profile is active. Use the sidebar to view
                      organizations or  {user.role==="donar" ? "check your personal donation history." : "manage your consumers."}         
                    </p>
                    <hr
                      className="w-25 mx-auto"
                      style={{ borderTop: "2px solid #2d3403", opacity: "0.2" }}
                    />
                    <div className="mt-3">
                      <small
                        className="text-uppercase fw-bold"
                        style={{
                          color: "#2d3403",
                          letterSpacing: "1px",
                          fontSize: "0.7rem",
                        }}
                      >
                        ● Account Active
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-4 ms-4">
                <h4
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa-solid fa-plus text-success py-4"></i>
                  Add Inventory
                </h4>
              </div>

              <div className="px-4">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Blood Group</th>
                      <th scope="col">Inventory Type</th>
                      <th scope="col">Quantity (ML)</th>
                      <th scope="col">Donor Email</th>
                      <th scope="col">Time & Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((record) => (
                      <tr key={record._id}>
                        <td>{record.bloodGroup}</td>
                        <td>{record.inventoryType}</td>
                        <td>{record.quantity}</td>
                        <td>{record.email}</td>
                        <td>{new Date(record.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal />
            </>
          )}
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
