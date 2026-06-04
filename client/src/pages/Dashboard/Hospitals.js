import React from 'react'
import Layout from '../../components/shared/Layout/Layout'
import { useState,useEffect } from 'react';
import API from '../../services/API';
import moment from 'moment';

const Hospitals = () => {
   const [data, setData] = useState([]);
  
    const getDonars = async () => {
      try {
        const { data } = await API.get("/inventory/get-hospitals");
        if (data?.success) {
          setData(data?.hospitals);
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
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.hospitalName}</td>
                <td>{record.email}</td>
                <td>{record.phoneNo}</td>
                 <td>{record.address}</td>
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
};

export default Hospitals
