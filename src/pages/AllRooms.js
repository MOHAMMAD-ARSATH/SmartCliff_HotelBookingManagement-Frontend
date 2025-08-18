import { useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CurrencyRupeeSharpIcon from '@mui/icons-material/CurrencyRupeeSharp';

import Breadcrumbs from '../components/Breadcrumbs';
import Navbar1 from '../components/UserNav';
import FooterPage from '../components/Footer';
import Loader from '../components/Loader';

const breadcrumbsPaths = [
  { label: 'Home', link: '/' },
  { label: 'Rooms' },
];

const AllRooms = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [roomDataArray, setRoomDataArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const data = (await axios.post(`${API_URL}/api/rooms/getallrooms`)).data;
        setRoomDataArray(data);
      } catch (error) {
        console.error('Error fetching room data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchRoomData();
  }, []);

  const RoomCard = ({ room, index }) => (
    <Col span={6} key={index}>
      <Card
        className='bs-card'
        hoverable
        style={{ width: 300, marginBottom: 16, marginRight: 5, overflow: 'hidden' }}
        cover={<img alt={`Room ${index}`} src={room.imageurls[0]} height='200px' style={{ borderRadius: '10px', border: '2px solid white' }} />}
        onClick={() => navigate(`/room/${room._id}`)}
      >
        <Card.Meta
          title={<span style={{ fontSize: '18px' }}>{room.type}</span>}
          description={<span style={{ fontSize: '16px' }}><CurrencyRupeeSharpIcon /> Starts from Rs. {room.rentperday}</span>}
        />
        <div className='mt-3'>
          // <Link to={`/room/${room._id}`}>
            <button
              type='button'
              style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '7px 13px',
                borderRadius: '5px',
                border: '1px solid black',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                borderColor: 'black',
                fontSize: '16px',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = 'black';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'black';
                e.target.style.color = 'white';
              }}
            >
              View Details
            </button>
          // </Link>
        </div>
      </Card>
    </Col>
  );

  return (
    <div>
      <Navbar1 />
      <Breadcrumbs paths={breadcrumbsPaths} style={{ background: 'blue' }} />
      <div className='ml-5 mt-5 mb-5' style={{ overflow: 'hidden' }}>
        <h3 style={{ textAlign: 'left', fontWeight: 'bold' }}>Our Rooms</h3>
        {loading ? (
          <Loader />
        ) : (
          <Row gutter={[16, 16]}>
            {roomDataArray?.map((room, index) => (
              <RoomCard key={index} room={room} index={index} />
            ))}
          </Row>
        )}
      </div>
      <FooterPage />
    </div>
  );
};

export default AllRooms;
