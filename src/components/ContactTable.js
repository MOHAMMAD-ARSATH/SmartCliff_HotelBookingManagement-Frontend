import { useEffect, useState } from 'react';
import { Table, Button, Modal, message } from 'antd';
import axios from 'axios';
import { DeleteTwoTone } from '@ant-design/icons';

const ContactTable = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/contacts`);

      if (response.status === 200) {
        const newData = response.data.map((contact, index) => ({ ...contact, sno: index + 1 }));
        setData(newData);
      } else {
        console.error('Error fetching contacts:', response.status);
        message.error('Error fetching contacts. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Error fetching contacts. Please try again.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/api/contacts/${deleteId}`);

      if (response.status === 200) {
        message.success('Contact Message deleted successfully');
        fetchData();
      } else {
        console.error('Error deleting contact:', response.status);
        message.error('Error deleting contact message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Error deleting contact message. Please try again.');
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

  const columns = [
    { title: 'S.No', dataIndex: 'sno', key: 'sno' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (message) => {
        const formattedMessage = message !== undefined && message !== null && message.trim() !== '' ? message : 'No message provided by the user';
        return (
          <span>
            {formattedMessage}
          </span>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (

        <DeleteTwoTone className='ml-3' onClick={() => openDeleteModal(record._id)} style={{ fontSize: '20px' }} />

      ),
    },
  ];

  const paginationConfig = {
    pageSize: 6,
  };

  return (
    <>
      <Table dataSource={data} columns={columns} pagination={paginationConfig} />
      <Modal
        title="Confirm Deletion"
        visible={!!deleteId}
        onOk={onDelete}
        onCancel={closeDeleteModal}
      >
        <p>Are you sure to delete this contact message?</p>
      </Modal>
    </>
  );
};

export default ContactTable;