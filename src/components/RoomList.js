import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Carousel } from 'antd';
import CurrencyRupeeSharpIcon from '@mui/icons-material/CurrencyRupeeSharp';
import { Link, useNavigate } from 'react-router-dom';

const RoomList = ({ roomDataArray }) => {
  const pageSize = 4; 
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage % Math.ceil(roomDataArray.length / pageSize)) + 1);
    }, 5000); 

    return () => clearInterval(interval);
  }, [roomDataArray.length]);

  const RoomCard = ({ room, index }) => (
    <Col span={6} key={index}>
      <Card
        className='bs-card'
        hoverable
        style={{ width: 300, marginBottom: 16, marginRight: 1, overflow: 'hidden' }}
        cover={<img alt={`Room ${index}`} src={room.imageurls[0]} height='200px' style={{ borderRadius: '10px', border: '2px solid white' }} />}
        onClick={() => navigate(`/room/${room._id}`)}
      >
        <Card.Meta
          title={<span style={{ fontSize: '18px' }}>{room.type}</span>}
          description={<span style={{ fontSize: '16px', fontWeight: "bold" }}><CurrencyRupeeSharpIcon /> Starts from Rs. {room.rentperday}</span>}
        />

        <div className='mt-4'>
           {/* <Link to={`/room/${room._id}`}> */}
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
                fontSize: '16px'
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
          {/* </Link> */}
        </div>
      </Card>
    </Col>
  );

  const totalSlides = Math.ceil(roomDataArray.length / pageSize);

  return (
    <div className="fluid ml-5 mt-5" style={{ overflow: 'hidden' }}>
      <Carousel
        autoplay
        dots={false}
        beforeChange={(from, to) => setCurrentPage(to + 1)}
        afterChange={(current) => setCurrentPage(current + 1)}
        initialSlide={currentPage - 1}
        vertical={false} 
      >
        {[...Array(totalSlides)].map((_, page) => (
          <div key={page}>
            <Row gutter={[16, 16]}>
              {roomDataArray.slice(page * pageSize, (page + 1) * pageSize).map((room, index) => (
                <RoomCard key={index} room={room} index={index} />
              ))}
            </Row>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default RoomList;
