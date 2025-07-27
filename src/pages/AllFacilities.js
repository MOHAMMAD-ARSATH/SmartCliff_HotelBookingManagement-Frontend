import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Space } from 'antd';

import Breadcrumbs from '../components/Breadcrumbs';
import Navbar1 from '../components/UserNav';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const { Title, Paragraph } = Typography;

const AllFacilities = () => {
  const facilityItems = [
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/spa.png" alt="Spa" width="40px" height="40px" />, text: 'SPA' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/chairs.png" alt="Spa" width="40px" height="40px" />, text: 'Conference & Event venues' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/babysitter.png" alt="Spa" width="40px" height="40px" />, text: 'Baby sitting service' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/valet-parking.png" alt="Spa" width="40px" height="40px" />, text: 'Valet car parking' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/gym.png" alt="Spa" width="40px" height="40px" />, text: 'Gymnasium' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/differently.png" alt="Spa" width="40px" height="40px" />, text: 'Access facility for the differently-able guest' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/ample-parking.png" alt="Spa" width="40px" height="40px" />, text: 'Ample car parking' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/laundry.png" alt="Spa" width="40px" height="40px" />, text: 'Express laundry' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/doctor-call.png" alt="Spa" width="40px" height="40px" />, text: 'Doctor-on-call' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/fb.png" alt="Spa" width="40px" height="40px" />, text: 'Multicusine Restaurant' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/traveldesk.png" alt="Spa" width="40px" height="40px" />, text: 'Full service travel desk' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/walk.png" alt="Spa" width="40px" height="40px" />, text: '1.5Kms walking track adjacent to the Hotel' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/bar.png" alt="Spa" width="40px" height="40px" />, text: 'Bar' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/car-transfer.png" alt="Spa" width="40px" height="40px" />, text: 'Airport & local transfers' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/07/non-smoking.png" alt="Spa" width="40px" height="40px" />, text: 'Non-Smoking rooms' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/cake-shop.png" alt="Spa" width="40px" height="40px" />, text: 'Patisserie / cake shop' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/smoking.png" alt="Spa" width="40px" height="40px" />, text: ' Smoking zone at designated areas' },
    { icon: <img src="" />, text: '' },
  ];

  const roomFacilityItems = [
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/checkouts.png" alt="Spa" width="40px" height="40px" />, text: '24 hrs Check out*' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/ro-water.png" alt="Spa" width="40px" height="40px" />, text: 'Complimentary RO water' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/bath-tub.png" alt="Spa" width="40px" height="40px" />, text: 'Bath tub in Pallazzio Suite' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/wifi.png" alt="Spa" width="40px" height="40px" />, text: 'High Speed Wi-Fi Internet' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/soundproof.png" alt="Spa" width="40px" height="40px" />, text: 'Soundproof Rooms' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/laundry.png" alt="Spa" width="40px" height="40px" />, text: 'In house Laundry facilities' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/breakfast.png" alt="Spa" width="40px" height="40px" />, text: 'Complimentary Breakfast' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/fb.png" alt="Spa" width="40px" height="40px" />, text: '24 hrs In-room dining*' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/iron.png" alt="Spa" width="40px" height="40px" />, text: 'Iron & Ironing board on request' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/07/central-ac.png" alt="Spa" width="40px" height="40px" />, text: 'Centrally air-conditoned' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/housekeeping.png" alt="Spa" width="40px" height="40px" />, text: '24 hrs Housekeeping' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/power-sockets.png" alt="Spa" width="40px" height="40px" />, text: 'Business desk & International power sockets' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/shower.png" alt="Spa" width="40px" height="40px" />, text: '24 hrs hot & cold water' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/secretary.png" alt="Spa" width="40px" height="40px" />, text: 'Secretarial services on request' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/tv.png" alt="Spa" width="40px" height="40px" />, text: '40" flat screen TV' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/bath.png" alt="Spa" width="40px" height="40px" />, text: 'Eco-friendly bath amenities' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/coffee.png" alt="Spa" width="40px" height="40px" />, text: 'Complimentary tea/coffee maker' },
    { icon: <img src="https://cjpallazzio.com/wp-content/uploads/2023/06/safety-box.png" alt="Spa" width="40px" height="40px" />, text: 'Safe deposit box' },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);


  const breadcrumbsPaths = [
    { label: 'Home', link: '/' },
    { label: 'Facilities' },
  ];

  return (
    <div>
      <Navbar1 />
      <Breadcrumbs paths={breadcrumbsPaths} />
      {loading ? (
        <Loader />
      ) : (
        <div className='ml-5 mb-5'>
          <Title className='mt-5 ml-2' level={2} style={{ textAlign: 'left', fontSize: "25px" }}>Common Facilities</Title>
          <Row gutter={[16, 8]} justify="space-around">
            {facilityItems.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={8}>
                <div className='ml-4 mt-2' style={{ fontSize: '18px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  {React.cloneElement(item.icon, { style: { fontSize: '25px', color: "#A8802A" } })}
                  <Paragraph className='ml-3 mt-1' style={{ fontSize: '17px', margin: '0' }}>{item.text}</Paragraph>
                </div>
              </Col>
            ))}
          </Row>

          <Title className='mt-5 ml-2' level={2} style={{ textAlign: 'left', fontSize: "25px" }}>Room Facilities</Title>
          <Row gutter={[16, 8]} justify="space-around">
            {roomFacilityItems.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={8}>
                <div className='ml-4 mt-2' style={{ fontSize: '18px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  {React.cloneElement(item.icon, { style: { fontSize: '25px', color: "#A8802A" } })}
                  <Paragraph className='ml-3 mt-1' style={{ fontSize: '17px', margin: '0' }}>{item.text}</Paragraph>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AllFacilities;