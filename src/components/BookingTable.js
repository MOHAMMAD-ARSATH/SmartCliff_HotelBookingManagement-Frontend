import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Space, message, Modal, Descriptions } from "antd";
import { DeleteTwoTone, EyeOutlined } from '@ant-design/icons';

import Loader from "./Loader";
import Error from "./Error";

function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [viewBooking, setViewBooking] = useState(null); // Track the booking to be viewed

  const paginationConfig = {
    pageSize: 6,
  };

  async function fetchMyData() {
    setError("");
    setLoading(true);
    try {
      const data = (await axios.post("/api/bookings/getallbookings")).data;
      const newData = data.map((booking, index) => ({ ...booking, sno: index + 1 }));
      setBookings(newData);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMyData();
  }, []);

  const onDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/bookings/${deleteId}`);
      if (response.status === 200) {
        message.success('Booking Room deleted successfully');
        fetchMyData();
      } else {
        console.error('Error deleting booked room:', response.status);
        message.error('Error deleting booked room. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Error deleting booking room. Please try again.');
    } finally {
      setDeleteId(null);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
  };

  const openViewModal = (id) => {
    const selectedBooking = bookings.find((booking) => booking._id === id);
    setViewBooking(selectedBooking);
  };

  const closeViewModal = () => {
    setViewBooking(null);
  };

  const columns = [
    { title: 'S.No', dataIndex: 'sno', key: 'sno' },
    { title: "Booking ID", dataIndex: "_id", key: "_id" },
    { title: "Room ID", dataIndex: "roomid", key: "roomid" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Room Type", dataIndex: "type", key: "type" },
    { title: "From Date", dataIndex: "fromdate", key: "fromdate" },
    { title: "To Date", dataIndex: "todate", key: "todate" },
    { title: "Total Amount", dataIndex: "totalamount", key: "totalamount" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          {status === "booked" ? (
            <Tag color="green">CONFIRMED</Tag>
          ) : (
            <Tag color="red">CANCELLED</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <>
          <EyeOutlined
            className='mr-3'
            onClick={() => openViewModal(record._id)}
            style={{ fontSize: '20px', color: '#1890ff', cursor: 'pointer' }}
          />
          <DeleteTwoTone
            className='ml-3'
            onClick={() => openDeleteModal(record._id)}
            style={{ fontSize: '17px', color: '#ff4d4f', cursor: 'pointer' }}
          />
        </>
      ),
    },
  ];

  return (
    <div className="row">
      {loading ? (
        <Loader />
      ) : error.length > 0 ? (
        <Error msg={error} />
      ) : (
        <div className="col-md-12">
          <Table columns={columns} dataSource={bookings} pagination={paginationConfig} />
          <Modal
            title="Confirm Deletion"
            visible={!!deleteId}
            onOk={onDelete}
            onCancel={closeDeleteModal}
          >
            <p>Are you sure to delete this booking room?</p>
          </Modal>
          <Modal
            title="Booking Details"
            visible={!!viewBooking}
            onCancel={closeViewModal}
            footer={null}
          >
            {viewBooking && (
              <Descriptions column={1} bordered>
                {/* <Descriptions.Item label="Booking ID">{viewBooking._id}</Descriptions.Item>
                <Descriptions.Item label="Room ID">{viewBooking.roomid}</Descriptions.Item> */}
                <Descriptions.Item label="Name">{viewBooking.name}</Descriptions.Item>
                <Descriptions.Item label="Email ID">{viewBooking.email}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">{viewBooking.phoneno}</Descriptions.Item>
                <Descriptions.Item label="Alternate Number">{viewBooking.altphone}</Descriptions.Item>
                <Descriptions.Item label="Room Type">{viewBooking.type}</Descriptions.Item>
                <Descriptions.Item label="From Date">{viewBooking.fromdate}</Descriptions.Item>
                <Descriptions.Item label="To Date">{viewBooking.todate}</Descriptions.Item>
                <Descriptions.Item label="No. of Rooms Booked">{viewBooking.count}</Descriptions.Item>
                <Descriptions.Item label="Total Days">{viewBooking.totaldays}</Descriptions.Item>
                <Descriptions.Item label="Total Amount">Rs. {viewBooking.totalamount}</Descriptions.Item>

              </Descriptions>
            )}
          </Modal>
        </div>
      )}
    </div>
  );
}

export default BookingTable;
