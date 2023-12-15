import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';

function AdminNav() {
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    // setShowModal(false);
    // Redirect to '/' after logout
    window.location.href = "/";
  }

  return (
    <div style={{ zIndex: "999", width: "100%", position: "sticky", top: "0px" }}>
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand ml-4" href="/">
          <img
            src="https://cjpallazzio.com/wp-content/uploads/2023/06/cj-pallazzio-logo.png"
            height="55px"
            width="110px"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fas fa-bars" style={{ color: "white" }}></i>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-5">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-user mr-2"></i>
                {user.name}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                <a
                  className="dropdown-item"
                  onClick={() => setShowModal(true)}
                >
                  Logout
                </a>

              </div>
            </div>
          </ul>
        </div>

        {/* Logout Confirmation Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header >
            <Modal.Title>Confirm Logout</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to logout?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              No
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </nav>
    </div>
  );
}

export default AdminNav;
