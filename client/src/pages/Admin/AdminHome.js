import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalHospitals: 0,
    totalOrgs: 0,
  });

const getStatsFromExistingRecords = async () => {
  try {
    const [donarRes, hospitalRes, orgRes] = await Promise.all([
      API.get("/admin/donar-list"),
      API.get("/admin/hospital-list"),
      API.get("/admin/org-list"),
    ]);

    setStats({
     totalDonors: donarRes.data?.total || donarRes.data?.data?.length || 0,
      totalHospitals: hospitalRes.data?.total || hospitalRes.data?.data?.length || 0,
      totalOrgs: orgRes.data?.total || orgRes.data?.data?.length || 0,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
  }
};

  useEffect(() => {
    getStatsFromExistingRecords();
  }, []);

  return (
    <Layout>
      <div className="container-fluid px-4 py-4">
        <div
          className="p-5 mb-4 text-white rounded-3 shadow-sm border-0"
          style={{
            background: "linear-gradient(135deg, #d90429 0%, #ef233c 100%)",
          }}
        >
          <div className="container-fluid py-2">
            <span className="badge bg-light text-danger fw-bold px-3 py-2 mb-3 shadow-sm text-uppercase">
              System Control Panel
            </span>
            <h1 className="display-5 fw-bold mb-2">
              Welcome to Admin Dashboard
            </h1>
            <h3 className="fw-light opacity-75 mb-4">
              Blood Bank Application Management
            </h3>
            <hr className="my-4 opacity-25" />
            <p className="col-md-10 fs-5 mb-0 opacity-90 fw-light">
              Perform secure administrative actions across the network. Monitor
              user registry groups, audit incoming/outgoing inventory
              parameters, and authorize healthcare profiles.
            </p>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-4">
            <div
              className="card h-100 bg-white rounded-3 shadow-sm"
              style={{
                cursor: "default",
                border: "1.5px solid rgba(217, 4, 41, 0.4)",
              }}
            >
              <div className="card-body text-center py-4">
                <h6 className="text-muted text-uppercase fw-semibold tracking-wide mb-2">
                  Total Donors
                </h6>
                <h1
                  className="fw-bold display-6 mb-0 text-danger"
                  style={{ color: "#d90429" }}
                >
                  {stats?.totalDonors || 0}
                </h1>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card h-100 bg-white rounded-3 shadow-sm"
              style={{
                cursor: "default",
                border: "1.5px solid rgba(13, 110, 253, 0.4)",
              }}
            >
              <div className="card-body text-center py-4">
                <h6 className="text-muted text-uppercase fw-semibold tracking-wide mb-2">
                  Hospitals Joined
                </h6>
                <h1 className="fw-bold display-6 mb-0 text-primary">
                  {stats?.totalHospitals || 0}
                </h1>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card h-100 bg-white rounded-3 shadow-sm"
              style={{
                cursor: "default",
                border: "1.5px solid rgba(25, 135, 84, 0.4)",
              }}
            >
              <div className="card-body text-center py-4">
                <h6 className="text-muted text-uppercase fw-semibold tracking-wide mb-2">
                  Partner Organizations
                </h6>
                <h1 className="fw-bold display-6 mb-0 text-success">
                  {stats?.totalOrgs || 0}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
