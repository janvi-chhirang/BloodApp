import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { useSelector } from "react-redux";

const Consumer = () => {
    const {user}=useSelector(state=>state.auth)
      const [data, setData] = useState([]);
    
      const getDonars = async () => {
        try {
          const { data } = await API.post("/inventory/get-inventory-hospital",{
            filters: {
                inventoryType: 'out',
                hospital: user?._id
            }
          });
          if (data?.success) {
            setData(data?.inventory);
            //console.log(data)
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getDonars();
      }, []);

return (
    <Layout>
      <div className="container-fluid py-4 px-5">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Blood Group</th>
            <th scope="col">InventoryType</th>
            <th scope="col">Quantity</th>
            <th scope="col">Email</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.bloodGroup}</td>
              <td>{record.inventoryType}</td>
              <td>{record.quantity}</td>
              <td>{record.email}</td>
              <td>
                {record.createdAt
                  ? moment(record.createdAt).format("DD/MM/YYYY")
                  : "Date Not Set"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </Layout>
  );
}

export default Consumer
