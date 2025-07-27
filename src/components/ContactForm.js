import { Form, Input, Button, message, InputNumber } from 'antd';
import { Card, Space, Typography } from 'antd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';

const { Text, Title } = Typography;

const ContactForm = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${API_URL}/api/contacts`, values);

      if (response.status === 201) {
        console.log('Form values submitted successfully:', values);
        message.success('Form submitted successfully');
        form.resetFields();
      } else {
        console.error('Error submitting form values:', response.status);
        message.error('Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Error submitting form. Please try again.');
    }
  };

  return (
    <div className='row mt-5 mb-5'>
      <div className='col-md-4 mt-3 '>
        <Card
          cover={<img alt="CJ Pallazzio" src="https://cjpallazzio.com/wp-content/uploads/2023/06/contact-image.jpg" />}
          style={{ width: '420px', margin: 'auto', height: '550px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >

          <h3 >Address</h3>

          <p> <LocationOnIcon style={{ color: "#A8802A" }} /> &nbsp;&nbsp;&nbsp;CJ Pallazzio
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;201/6, Junction Main Road,
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Near NH -7, Salem - 636 004
          </p>
          <p>
            <PhoneIcon style={{ color: "#A8802A" }} /> &nbsp;&nbsp;&nbsp;+91 427 255 66 77

          </p>
          <p>
            <PhoneIcon style={{ color: "#A8802A" }} /> &nbsp;&nbsp;&nbsp;+91 70944 63507
          </p>

          <p>
            <EmailIcon style={{ color: "#A8802A" }} /> &nbsp;&nbsp;&nbsp;info@cjpallazzio.com
          </p>

        </Card>
      </div>
      <div className='col-md-4 mt-3'>
        <div className='mb-4' style={{ fontSize: "20px" }}><b>Send Us a Message</b></div>
        <Form form={form} onFinish={onFinish} labelCol={{ span: 50 }} wrapperCol={{ span: 22 }} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, pattern: /^[a-zA-Z\s]{4,}$/, message: 'Only letters are allowed, at least 4 characters.' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email address.' }]}>
            <Input style={{ width: '80%' }} />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number" rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: 'Please enter a valid phone number.' }]}>
            <Input style={{ width: '80%' }} />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[
              { required: true, message: 'Message is required.' },
              { min: 10, message: 'Message must be at least 10 characters.' },
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>
          
          <Form.Item wrapperCol={{ offset: 0, span: 10 }}>
            <Button type="primary" htmlType="submit" className='btn btn-primary' style={{ padding: "4px 12px" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className='col-md-4'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3907.2589988146!2d78.128435!3d11.676048!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf06605bb0f7b%3A0x6cb77a910a563ec7!2sCJ%20Pallazzio!5e0!3m2!1sen!2sus!4v1700057461102!5m2!1sen!2sus" width="450" height="550" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
};

export default ContactForm;