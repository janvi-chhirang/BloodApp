import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "../../services/API";
import { useSelector } from "react-redux";

const Analytics = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);

  const colors = [
    "#880d1e",
    "#dd2d4a",
    "#f26a8d",
    "#f49cbb",
    "#cb997e",
    "#6b705c",
    "#3f4238",
    "#1b1b1b",
  ];

  const getBloodGroupColor = (bloodGroup) => {
    const groupMap = {
      "O+": colors[0],
      "O-": colors[1],
      "A+": colors[2],
      "A-": colors[3],
      "B+": colors[4],
      "B-": colors[5],
      "AB+": colors[6],
      "AB-": colors[7],
    };
    return groupMap[bloodGroup] || "#333";
  };

  const getData = async () => {
    try {
      const response = await API.get("/analytics/bloodGroups-data");
      if (response.data?.success) {
        const updatedData = response.data.data.map((record) => {
          if (user?.role === "hospital") {
            return {
              ...record,
              availableQuantity: record.availableQuantity + 5, // Logic: Initial 5ML for Hospital
            };
          }
          return record;
        });
        setData(updatedData);
      }
    } catch (error) {
      console.log("Frontend Error:", error);
    }
  };

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-Inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
    getBloodRecords();
  }, [user]);

  return (
    <>
      <Header />

      {user?.role !== "donar" && (
        <div className="container-fluid mt-3">
          <div className="d-flex flex-row flex-wrap justify-content-center">
            {data?.map((record, i) => (
              <div
                className="card m-2 p-1 border-0 shadow-sm"
                key={i}
                style={{ width: "18rem", backgroundColor: colors[i] || "#333" }}
              >
                <div className="card-body text-center">
                  <h1 className="card-title bg-light text-dark mb-3 py-2 rounded shadow-sm">
                    {record.bloodGroup}
                  </h1>
                  <p className="card-text text-light">
                    Total In : <b>{record.totalIn}</b> (ML) <br />
                    Total Out : <b>{record.totalOut}</b> (ML)
                  </p>

                  {user?.role === "hospital" && (
                    <div className="mt-2">
                      <span
                        className="badge rounded-pill bg-warning text-dark"
                        style={{ fontSize: "0.7rem" }}
                      >
                        Initial Reserve: 5ML Included
                      </span>
                    </div>
                  )}
                </div>

                <div className="card-footer text-light bg-dark text-center border-0 small">
                  Available : <b>{record.availableQuantity}</b> (ML)
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="container mt-5 mb-5">
        <h1 className="text-center mb-4 display-6 fw-bold">
          {user?.role === "donar"
            ? "My Recent Donations"
            : "Recent Blood Transactions"}
        </h1>
        <div className="table-responsive shadow-lg rounded overflow-hidden">
          <table className="table text-center align-middle m-0">
            <thead className="table-dark">
              <tr>
                <th scope="col" className="py-3">
                  Blood Group
                </th>
                {user?.role !== "donar" && (
                  <th scope="col" className="py-3">
                    Inventory Type
                  </th>
                )}
                <th scope="col" className="py-3">
                  Quantity (ML)
                </th>
                {user?.role !== "donar" && (
                  <th scope="col" className="py-3">
                    Donor Email
                  </th>
                )}
                <th scope="col" className="py-3">
                  Time & Date
                </th>
              </tr>
            </thead>
            <tbody>
              {inventoryData?.map((record) => {
                const rowBgColor = getBloodGroupColor(record.bloodGroup);
                return (
                  <tr
                    key={record._id}
                    style={{ backgroundColor: rowBgColor, color: "#ffffff" }}
                  >
                    <td className="py-3">
                      <span className="badge bg-light text-dark px-3 py-2 fs-6 shadow-sm border">
                        {record.bloodGroup}
                      </span>
                    </td>

                    {user?.role !== "donar" && (
                      <td className="text-uppercase fw-bold">
                        {record.inventoryType === "in" ? (
                          <span className="text-success bg-light px-2 py-1 rounded small border shadow-sm">
                            ● IN
                          </span>
                        ) : (
                          <span className="text-danger bg-light px-2 py-1 rounded small border shadow-sm">
                            ● OUT
                          </span>
                        )}
                      </td>
                    )}

                    <td className="fw-bold fs-5">{record.quantity} ML</td>
                    {user?.role !== "donar" && <td>{record.email}</td>}
                    <td>{new Date(record.createdAt).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Analytics;
