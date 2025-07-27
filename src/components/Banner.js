import { useState } from 'react';

import Login from './Login';

const Banner = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (

    <div className='col-md-12' style={{ background: 'black', height: '18vh', color: 'white' }}>
      <div className='row ml-2'>
        <div className='col-md-2'>
          <div className='mt-4' style={{ fontWeight: 'bold', fontSize: '20px' }}>
            <span style={{ color: '#AD8736' }}>Book Direct </span>& get
            <br />
            <div style={{ fontSize: '40px' }}>
              <span style={{ color: '#AD8736' }}>10% </span>Off
            </div>
          </div>
        </div>
        <div className='col-md-1 mt-4' style={{ color: '#AD8736', fontSize: '50px' }}>
          +
        </div>

        <div className='col-md-1'>
        </div>

        <div className='col-md-1 mt-2'>
          <img src='https://cjpallazzio.com/wp-content/uploads/2023/05/breakfast.png' height='60px' style={{ marginLeft: '35px' }} /><br />
          <b >Complimentary<br />
            <span className='ml-4'>Breakfast*</span></b>
        </div>

        <div className='col-md-1'>
          <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/divider.png" />
        </div>

        <div className='col-md-1 mt-2'>
          <img src='https://cjpallazzio.com/wp-content/uploads/2023/05/checkouts.png' height='60px' style={{ marginLeft: '8px' }} /><br />
          <b> <span className='ml-3'>24 hrs</span><br />
            Checkout*</b>
        </div>

        <div className='col-md-1'>
          <img src="https://cjpallazzio.com/wp-content/uploads/2023/05/divider.png" />
        </div>

        <div className='col-md-1 mt-2'>
          <img className='ml-3' src='https://cjpallazzio.com/wp-content/uploads/2023/05/cancellation.png' height='60px' /><br />
          <b> <span style={{ marginLeft: '32px' }}>Free</span><br />
            Cancellation*</b>
        </div>

        <div className='col-md-3 mt-3'>
          {!user && (
            <div className='mt-3' style={{ marginRight: '70px', float: "right" }}>
              <h1 style={{ color: 'white', marginLeft: '30px' }}>What more?</h1>
              <button
                type='button'
                onClick={openLoginModal}
                style={{
                  backgroundColor: '#A9822D',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  fontFamily: 'Arial, sans-serif',
                  borderColor: '#A9822D',
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
                <span style={{ marginRight: '5px' }}></span>Make a Reservation
              </button>

            </div>
          )}
        </div>

        {showLoginModal && <Login closeModal={closeLoginModal} />}
      </div>
    </div>
  );
};

export default Banner;