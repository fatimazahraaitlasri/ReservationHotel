import React from 'react';

import { Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <>
      {/* Header Start */}
      <div className="container-xxl bg-white p-0">
        <div className="container-fluid bg-dark px-0">
          <div className="row gx-0">
            <div className="col-lg-3 bg-dark d-none d-lg-block">
              <a
                href="/"
                className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
              >
                <h1 className="m-0 text-primary text-uppercase">HotelHOliday</h1>
              </a>
            </div>
            <div className="col-lg-9">
              <div className="row gx-0 bg-white d-none d-lg-flex">
                <div className="col-lg-7 px-5 text-start">
                  <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                    <i className="fa fa-envelope text-primary me-2"></i>
                    <p className="mb-0">holiday@example.com</p>
                  </div>
                  <div className="h-100 d-inline-flex align-items-center py-2">
                    <i className="fa fa-phone-alt text-primary me-2"></i>
                    <p className="mb-0">+212 345 6789</p>
                  </div>
                </div>
                <div className="col-lg-5 px-5 text-end">
                  <div className="d-inline-flex align-items-center py-2">
                    <a className="me-3" href="">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a className="me-3" href="">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a className="me-3" href="">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a className="me-3" href="">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a className="" href="">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
              <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
                <a href="/" className="navbar-brand d-block d-lg-none">
                  <h1 className="m-0 text-primary text-uppercase">HotelHaven</h1>
                </a>
                <button
                  type="button"
                  className="navbar-toggler"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarCollapse"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="navbar-collapse justify-content-center"
                  id="navbarCollapse"
                >
                  <div className="navbar-nav mr-28 py-0">
                    <a href="/" className="nav-item nav-link active">
                      Home
                    </a>
                    <a href="about" className="nav-item nav-link">
                      About
                    </a>
                    <a href="services" className="nav-item nav-link">
                      Services
                    </a>
                    <a href="rooms" className="nav-item nav-link">
                      Rooms
                    </a>
                    <div className="nav-item dropdown">
                      <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        Pages
                      </a>
                      <div className="dropdown-menu rounded-0 m-0">
                        <a href="booking" className="dropdown-item">
                          Booking
                        </a>
                        <a href="team" className="dropdown-item">
                          Our Team
                        </a>
                        <a href="testimonial" className="dropdown-item">
                          Testimonial
                        </a>
                      </div>
                    </div>
                    <a href="contact" className="nav-item nav-link">
                      Contact
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        {/* Header End */}

        <Outlet />

        {/* <!-- Footer Start --> */}

        {/* <!-- Footer End --> */}
      </div>

      {/* <!-- Back to Top --> */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
    </>
  );
};
export default SharedLayout;
