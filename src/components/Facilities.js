import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import {
  CarOutlined,
  CoffeeOutlined,
  ControlOutlined,
  SafetyOutlined,
  MedicineBoxOutlined,
  EnvironmentOutlined,
  WifiOutlined,
  ClockCircleOutlined,
  AppstoreAddOutlined,
  SafetyCertificateFilled,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Facilities = () => {
  const services = [
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/valet-parking.png" alt="Spa" width="40px" height="40px" />, text: 'Valet Parking' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/gym.png" alt="Spa" width="40px" height="40px" />, text: 'Gymnasium' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/wifi.png" alt="Spa" width="40px" height="40px" />, text: 'Wi-Fi' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/bar.png" alt="Spa" width="40px" height="40px" />, text: 'Lounge Bar' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/cake-shop.png" alt="Spa" width="40px" height="40px" />, text: 'Patisserie / cake shop' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/car-transfer.png" alt="Spa" width="40px" height="40px" />, text: 'Airport Transfer' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/coffee.png" alt="Spa" width="40px" height="40px" />, text: 'Coffee Shop' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/laundry.png" alt="Spa" width="40px" height="40px" />, text: 'Laundry' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/doctor-call.png" alt="Spa" width="40px" height="40px" />, text: 'Doctor on Call' },
  ];

  return (
    <div style={{ height: "70vh" }}>
      <h1 className='mt-5' style={{ textAlign: "center", color: "#A8802A" }}>CJ Pallazzio</h1>
      <Title className='mb-5' level={2}>Services & Facilities</Title>
      <Row gutter={[16, 16]} justify="space-around" className='ml-2 mr-5'>
        {services.map((service, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={8}>
            <div className='mt-1' style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: "150px" }}>
                {React.cloneElement(service.icon, { style: { marginBottom: '10px', color: "#A8802A" } })}
                <Paragraph className='ml-3' style={{ fontSize: '17px', margin: '0' }}><h1>{service.text}</h1></Paragraph>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Row justify="center mt-5" style={{ marginTop: '20px' }}>
        <Link to='/facilities'>
          <button
            type='button'
            style={{
              backgroundColor: '#A9822D',
              color: 'white',
              padding: '8px 15px',
              borderRadius: '5px',
              border: '1px solid #3498db',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              borderColor: '#A9822D',
              fontSize: '15px',
              justifyContent: 'center',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#A9822D';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#A9822D';
              e.target.style.color = 'white'; 
            }}
          >
            View All
          </button>
        </Link>
      </Row>
    </div>
  );
};

export default Facilities;