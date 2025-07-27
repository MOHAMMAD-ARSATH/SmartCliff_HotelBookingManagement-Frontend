import { useState, useEffect } from "react";
import { Space, Button, Modal, message, Table, Form, InputNumber, Input, Select, Descriptions } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import axios from "axios";

import Loader from "./Loader";
import Error from "./Error";

const { Option } = Select;

const RoomTable = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editedRoom, setEditedRoom] = useState({});
  const [viewedRoom, setViewedRoom] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "Room ID",
      dataIndex: "_id",
      key: "_id",
    },
    { title: "Room Type", dataIndex: "type", key: "type" },
    { title: "Maximum Count", dataIndex: "maxcount", key: "maxcount" },
    { title: "Rent/Day", dataIndex: "rentperday", key: "rentperday" },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="default"
            shape="circle"
            icon={<EyeOutlined style={{ fontSize: '18px' }} />}
            onClick={() => handleView(record._id)}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined style={{ fontSize: '18px' }} />}
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];

  const paginationConfig = {
    pageSize: 5,
  };

  const handleEdit = (record) => {
    setEditedRoom(record);
    setEditModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleEditModalOk = async () => {
    try {
      const values = await form.validateFields();
      const { facilities, ...restValues } = values;
      const updatedRoom = { ...editedRoom, ...restValues };

      await axios.post(`${API_URL}/api/rooms/editroom`, {
        roomid: editedRoom._id,
        updatedRoom: updatedRoom,
      });

      setEditModalVisible(false);
      message.success('Room updated successfully');
      fetchMyData();
    } catch (error) {
      console.log(error);
      message.error('Failed to update room');
    }
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleView = async (roomId) => {
    try {
      const room = (await axios.post(`${API_URL}/api/rooms/getroombyid`, { roomid: roomId })).data;
      setViewedRoom(room);
      setViewModalVisible(true);
    } catch (error) {
      console.log(error);
      message.error('Failed to fetch room details');
    }
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
    setViewedRoom(null);
  };

  const handleDelete = async (recordId) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this room?',
      onOk: async () => {
        try {
          await axios.post(`${API_URL}/api/rooms/deleteroom`, { roomid: recordId });
          setRooms((prevRooms) => prevRooms.filter((room) => room._id !== recordId));
          message.success('Room deleted successfully');
        } catch (error) {
          console.log(error);
          message.error('Failed to delete the room');
        }
      },
    });
  };

  async function fetchMyData() {
    setError("");
    setLoading(true);
    try {
      const data = (await axios.post(`${API_URL}/api/rooms/getallrooms`)).data;
      const newData = data.map((room, index) => ({ ...room, sno: index + 1 }));
      setRooms(newData);
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
        <>
          <div className="col-md-12">
            <Table columns={columns} dataSource={rooms} pagination={paginationConfig} />
          </div>
        </>
      )}

      <Modal
        title="Edit Room"
        visible={editModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Room Type" name="type">
            <Select placeholder="Select a room type" allowClear>
              <Option value="Classic Room">Classic Room</Option>
              <Option value="Delux Room">Delux Room</Option>
              <Option value="Luxury Room">Luxury Room</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Room Description"
            rules={[
              {
                // required: true,
                // message: 'Room Description is required',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && value.length >= 30) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Room Description must be at least 30 characters'));
                },
              }),
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>

          <Form.Item label="Maximum Count" name="maxcount">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Rent/Day" name="rentperday">
            <InputNumber min={1} />
          </Form.Item>
          {/* <Form.Item label="Facilities" name="facilities">
            <Select mode="tags" placeholder="Add facilities">
             
            </Select>
          </Form.Item> */}
        </Form>
      </Modal>

      <Modal
        title="View Room"
        visible={viewModalVisible}
        onCancel={closeViewModal}
        footer={null}
      >
        {viewedRoom && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Room ID">{viewedRoom._id}</Descriptions.Item>
            <Descriptions.Item label="Room Type">{viewedRoom.type}</Descriptions.Item>
            <Descriptions.Item label="Room Description">{viewedRoom.description}</Descriptions.Item>
            <Descriptions.Item label="Maximum Count">{viewedRoom.maxcount}</Descriptions.Item>
            <Descriptions.Item label="Facilities">
              {viewedRoom.facilities.map((item, index) => (
                <span key={index}>{item.facility}{index < viewedRoom.facilities.length - 1 ? ', ' : ''}</span>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Rent/Day">{viewedRoom.rentperday}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default RoomTable;
