import React from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/API';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from "moment";

const Organisation = () => {
    const {user}=useSelector(state=>state.auth)
    const [data, setData] = useState([]);
    
      const getOrg = async () => {
        try {
          if(user?.role==="donar"){
          const { data } = await API.get("/inventory/get-organisation");
          if (data?.success) {
            setData(data?.organisations);
          }
        }
        if(user?.role==="hospital"){
          const { data } = await API.get("/inventory/get-organisation-for-hospitals");
          if (data?.success) {
            setData(data?.organisations);
          }
        }

        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getOrg();
      }, [user]);
  return (
    <div>
<Layout>
      <div className="container-fluid py-4 px-5">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
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
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </Layout>
    </div>
  )
}

export default Organisation
