import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space } from "antd";

import Loader from "./Loader";
import Error from "./Error";

function UserTable() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columns = [
    { title: 'S.No', dataIndex: 'sno', key: 'sno' },
    { title: "User ID", dataIndex: "_id", key: "_id" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    { title: "Email ID", dataIndex: "email", key: "email" },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const paginationConfig = {
    pageSize: 6,
  };

  async function fetchMyData() {
    setError("");
    setLoading(true);
    try {
      const data = (await axios.post(`${API_URL}/api/users/getallusers`)).data;
      const newData = data.map((user, index) => ({ ...user, sno: index + 1 }));
      setUsers(newData);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <div className="row">
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="col-md-12">
          <Table columns={columns} dataSource={users} pagination={paginationConfig} />
        </div>
      )}
    </div>
  );
}

export default UserTable;