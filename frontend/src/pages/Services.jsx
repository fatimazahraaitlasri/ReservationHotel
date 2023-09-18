import React from 'react';

const Service = () => {
  return (
    <div className="container-xxl bg-white p-0">
      {/* <!-- Page Header Start --> */}
      <div
        className="container-fluid page-header mb-5 p-0"
        style={{ backgroundImage: 'url(./assets/img/carousel-1.jpg)' }}
      >
        <div className="container-fluid page-header-inner py-5">
          <div className="container text-center pb-5">
            <h1 className="display-3 text-white mb-3 animated slideInDown">Services</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Pages</a>
                </li>
                <li className="breadcrumb-item text-white active" aria-current="page">
                  Services 
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      {/* <!-- Page Header End --> */}

      {/* <!-- Booking Start --> */}
      <div className="container-fluid booking pb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container">
          <div className="bg-white shadow" style={{ padding: '35px' }}>
            <div className="row g-2">
              <div className="col-md-10">
                <div className="row g-2">
                  <div className="col-md-3">
                    <div className="date" id="date1" data-target-input="nearest">
                      <input
                        type="text"
                        className="form-control datetimepicker-input"
                        placeholder="Check in"
                        data-target="#date1"
                        data-toggle="datetimepicker"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="date" id="date2" data-target-input="nearest">
                      <input
                        type="text"
                        className="form-control datetimepicker-input"
                        placeholder="Check out"
                        data-target="#date2"
                        data-toggle="datetimepicker"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <select className="form-select">
                      <option selected>Adult</option>
                      <option value="1">Adult 1</option>
                      <option value="2">Adult 2</option>
                      <option value="3">Adult 3</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select className="form-select">
                      <option selected>Child</option>
                      <option value="1">Child 1</option>
                      <option value="2">Child 2</option>
                      <option value="3">Child 3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary w-100">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Booking End --> */}

      {/* <!-- Service Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">Our Services</h6>
            <h1 className="mb-5">
              Explore Our <span className="text-primary text-uppercase">Services</span>
            </h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <a className="service-item rounded" href="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-hotel fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Rooms & Appartment</h5>
                <p className="text-body mb-0">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam
                  sed stet lorem.
                </p>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
              <a className="service-item rounded" href="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-utensils fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Food & Restaurant</h5>
                <p className="text-body mb-0">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam
                  sed stet lorem.
                </p>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <a className="service-item rounded" href="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-spa fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Spa & Fitness</h5>
                <p className="text-body mb-0">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam
                  sed stet lorem.
                </p>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
              <a className="service-item rounded" href="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-swimmer fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Sports & Gaming</h5>
                <p className="text-body mb-0">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam
                  sed stet lorem.
                </p>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <a className="service-item rounded" href="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-glass-cheers fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Event & Party</h5>
                <p className="text-body mb-0">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam
                  sed stet lorem.
                </p>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
              <a className="service-item rounded" href="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-dumbbell fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">GYM & Yoga</h5>
                <p className="text-body mb-0">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam
                  sed stet lorem.
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Service End --> */}

      {/* <!-- Testimonial Start --> */}
      <div
        className="container-xxl testimonial mt-5 py-5 bg-dark wow zoomIn"
        data-wow-delay="0.1s"
        style={{ marginBottom: '90px' }}
      >
        <div className="container">
          <div className="owl-carousel testimonial-carousel py-5">
            <div className="testimonial-item position-relative bg-white rounded overflow-hidden">
              <p>
                Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor
                amet diam stet. Est stet ea lorem amet est kasd kasd et erat magna eos
              </p>
              <div className="d-flex align-items-center">
                <img
                  className="img-fluid flex-shrink-0 rounded"
                  alt="testimonial"
                  src="./assets/img/testimonial-1.jpg"
                  style={{ width: '45px', height: '45px' }}
                />
                <div className="ps-3">
                  <h6 className="fw-bold mb-1">Client Name</h6>
                  <small>Profession</small>
                </div>
              </div>
              <i className="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-n1"></i>
            </div>
            <div className="testimonial-item position-relative bg-white rounded overflow-hidden">
              <p>
                Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor
                amet diam stet. Est stet ea lorem amet est kasd kasd et erat magna eos
              </p>
              <div className="d-flex align-items-center">
                <img
                  className="img-fluid flex-shrink-0 rounded"
                  alt="testimonial"
                  src="./assets/img/testimonial-2.jpg"
                  style={{ width: '45px', height: '45px' }}
                />
                <div className="ps-3">
                  <h6 className="fw-bold mb-1">Client Name</h6>
                  <small>Profession</small>
                </div>
              </div>
              <i className="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-n1"></i>
            </div>
            <div className="testimonial-item position-relative bg-white rounded overflow-hidden">
              <p>
                Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor
                amet diam stet. Est stet ea lorem amet est kasd kasd et erat magna eos
              </p>
              <div className="d-flex align-items-center">
                <img
                  className="img-fluid flex-shrink-0 rounded"
                  alt="testimonial"
                  src="./assets/img/testimonial-3.jpg"
                  style={{ width: '45px', height: '45px' }}
                />
                <div className="ps-3">
                  <h6 className="fw-bold mb-1">Client Name</h6>
                  <small>Profession</small>
                </div>
              </div>
              <i className="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-n1"></i>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Testimonial End --> */}

      {/* <!-- Newsletter Start --> */}
      <div className="container newsletter mt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="row justify-content-center">
          <div className="col-lg-10 border rounded p-1">
            <div className="border rounded text-center p-1">
              <div className="bg-white rounded text-center p-5">
                <h4 className="mb-4">
                  Subscribe Our <span className="text-primary text-uppercase">Newsletter</span>
                </h4>
                <div className="position-relative mx-auto" style={{ maxWidth: '400px' }}>
                  <input
                    className="form-control w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="Enter your email"
                  />
                  <button
                    type="button"
                    className="btn btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Newsletter Start --> */}
    </div>
  );
};
export default Service;
