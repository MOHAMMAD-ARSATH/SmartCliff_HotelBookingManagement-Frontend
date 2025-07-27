import { Layout, Row, Col } from 'antd';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';

// const { Footer } = Layout;

const Footer = () => {
  const linkStyle = {
    textDecoration: 'none',
    display: 'block',
    color: 'white',
    margin: '8px 0',
  };

  return (
    <div className='col-md-12' style={{ backgroundColor: 'black', color: 'white', padding: '40px 0', height: "67vh" }}>

      <Row gutter={[16, 16]} className='mt-5 ml-4'>
        <Col xs={24} sm={12} md={6}>
          <div className='ml-5'>
            <h3 >Address</h3>

            <p> <LocationOnIcon /> &nbsp;&nbsp;&nbsp;CJ Pallazzio
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;201/6, Junction Main Road,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Near NH -7, Salem - 636 004
            </p>
            <p>
              <PhoneIcon /> &nbsp;&nbsp;&nbsp;
              <a href="tel:+914272256333" style={{ textDecoration: "none", color: "inherit" }}>
                +91 427 225 6333
              </a>
            </p>
            <p>
              <PhoneIcon /> &nbsp;&nbsp;&nbsp;
              <a href="tel:+919488542885" style={{ textDecoration: "none", color: "inherit" }}>
                +91 94885 42885
              </a>
            </p>
            <p>
              <EmailIcon /> &nbsp;&nbsp;&nbsp;
              <a href="mailto:info@cjpallazzio.com" style={{ textDecoration: "none", color: "inherit" }}>
                info@cjpallazzio.com
              </a>
            </p>
          </div>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <h3>Quick Links</h3>
          <p> <Link to="/" style={linkStyle}>
            <KeyboardArrowRightIcon /> Home
          </Link></p>
          <p><Link to="/about" style={linkStyle}>
            <KeyboardArrowRightIcon /> About
          </Link></p>
          <p> <Link to="/allrooms" style={linkStyle}>
            <KeyboardArrowRightIcon /> Rooms
          </Link></p>
          <p> <Link to="/gallery" style={linkStyle}>
            <KeyboardArrowRightIcon /> Gallery
          </Link></p>
          {/* <p> <Link to="/facilities" style={linkStyle}>
            <KeyboardArrowRightIcon /> Facilities
          </Link></p>
          <p> <Link to="/contact" style={linkStyle}>
            <KeyboardArrowRightIcon /> Contact
          </Link></p> */}
        </Col>
        <Col xs={24} sm={12} md={4}>
          <h3>Rooms</h3>
          <p>Classic Room</p>
          <p>Delux Room</p>
          <p>Luxury Room</p>
        </Col>

        <Col xs={24} sm={12} md={4}>
          <h3>Ask us How</h3>

          <p><Link to="/facilities" style={linkStyle}>
            <KeyboardArrowRightIcon /> Facilities
          </Link></p>
          <p> <Link to="/contact" style={linkStyle}>
            <KeyboardArrowRightIcon /> Contact
          </Link></p>
        </Col>

        <Col xs={24} sm={12} md={4}>
          <h3>Our Associate</h3>

          <p> <LocationOnIcon /> &nbsp;&nbsp;&nbsp;Coimbatore Jewellers
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;339, 5, Omalur Main Rd,
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Near New Bus Stand,
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Salem - 636 009
          </p>
          <p>
            <a href="tel:+914272256333" style={{ textDecoration: "none", color: "inherit" }}>
              <PhoneIcon /> &nbsp;&nbsp;&nbsp;+91 427 225 6333
            </a>
          </p>
          <p>
            <a href="tel:+919488542885" style={{ textDecoration: "none", color: "inherit" }}>
              <PhoneIcon /> &nbsp;&nbsp;&nbsp;+91 94885 42885
            </a>
          </p>

          <a href="https://maps.app.goo.gl/VXxTfmQt4MDeL3BE6" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            <p>
              <LocationOnIcon /> &nbsp;&nbsp;&nbsp;Branch
            </p>
          </a>

        </Col>
      </Row>
      <hr style={{ color: 'white', border: "1px solid white" }} />

      <Col xs={24} md={24}>
        <div style={{ textAlign: 'center' }}>
          <p>CJ Pallazzio Copyright © 2023. All Rights Reserved.</p>
          <p>Designed by Mohammad Arsath</p>
        </div>
      </Col>

    </div>
  );
};

export default Footer;