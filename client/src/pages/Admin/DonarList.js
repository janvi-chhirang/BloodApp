import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { toast } from "react-toastify";

const DonarList = () => {
  const [data, setData] = useState([]);

  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
      if (data?.success) {
        setData(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this donor?",
      );
      if (!confirmDelete) return;

      const { data } = await API.delete(`/admin/delete-donar/${id}`);

      if (data?.success) {
        toast.success("Donor deleted successfully", { autoClose: 2000 });
        getDonars();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid py-4 px-5">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.name || record.organisationName + "(ORG)"}</td>
                <td>{record.email}</td>
                <td>{record.phoneNo}</td>
                <td>
                  {record.createdAt
                    ? moment(record.createdAt).format("DD/MM/YYYY")
                    : "Date Not Set"}
                </td>
                <td>
                  <div
                    className="btm btn-danger btn-sm"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(record._id)}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default DonarList;
